import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import AdminLayout from "./AdminLayout";
import MUIDataTable from "mui-datatables";

import {
  clearErrors,
  getAdminCategory,
  deleteCategory,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const options = {
  print: false,
  download: false,
  filter: false,
  viewColumns: false,
  selectableRowsHideCheckboxes: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 50, 100],
};

const CategoryList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, categories } = useSelector((state) => state.categories);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.category
  );

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Category Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }

    dispatch(getAdminCategory());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    {
      name: "index",
      label: "Sr. No",
      options: { sort: false, searchable: false },
    },
    "Name",
    {
      name: "Action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Fragment>
              <Link to={`/admin/category/${value}`}>
                <img
                  src="/assets/images/edit.png"
                  alt="edit"
                  className="mt-1"
                />
              </Link>

              <Button onClick={() => deleteCategoryHandler(value)}>
                <img src="/assets/images/Action-delete.svg" />
              </Button>
            </Fragment>
          );
        },
        sort: false,
      },
    },
  ];

  const rows = categories.map((e, i) => {
    return [`${i < 9 ? "0" : ""}${i + 1}`, e.name, e._id];
  });

  return (
    <AdminLayout
      metaTitle="All Categories - Admin"
      pageTitle="All Categories"
      titleBar={
        <Link className="orangeBtn addButton" to="/admin/category">
          + Add Category
        </Link>
      }
      childHtml={
        <MUIDataTable
          className="material-table"
          title={`All Categories`}
          data={rows}
          columns={columns}
          options={options}
        />
      }
    />
  );
};

export default CategoryList;
