import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import AdminLayout from "./AdminLayout";
import MUIDataTable from "mui-datatables";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  clearErrors,
  deleteSubProduct,
  getAdminSubProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const options = {
  print: false,
  download: false,
  filter: false,
  viewColumns: false,
  selectableRowsHideCheckboxes: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 50, 100],
};

const SubProductList = ({ history, match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const prID = match.params.id;

  const { error, subProducts } = useSelector((state) => state.subProducts);

  const store = useSelector((state) => state);

  console.log(store, "aslkdbfhagsv");

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteSubProduct(id));
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
      alert.success("Product Deleted Successfully");
      history.push("/admin/sub_product/" + prID);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminSubProduct(prID));
  }, [dispatch, alert, error, prID, deleteError, history, isDeleted]);

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#fff",
          },
        },
      },
    });

  const columns = [
    {
      name: "index",

      label: "Sr. No",

      options: { sort: false, searchable: false },
    },
    "Name",

    "Description",

    {
      name: "Action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Fragment>
              <div className="d-flex">
                <Link to={`/admin/edit/sub_product/${value}`}>
                  <img
                    src="/assets/images/edit.png"
                    alt="edit"
                    className="mt-1"
                  />
                </Link>

                <Button onClick={() => deleteProductHandler(value)}>
                  <img src="/assets/images/Action-delete.svg" alt="delete" />
                </Button>
              </div>
            </Fragment>
          );
        },
        sort: false,
      },
    },
  ];

  const rows =
    subProducts &&
    subProducts.subProducts &&
    subProducts.subProducts.map((e, i) => {
      return [`${i < 9 ? "0" : ""}${i + 1}`, e.name, e.description, e._id];
    });

  console.log(subProducts && subProducts, "subProducts123");

  return (
    <AdminLayout
      metaTitle="Sub Products - Admin"
      pageTitle="Sub Products"
      titleBar={
        <Link
          className="orangeBtn addButton"
          to={"/admin/new/sub_product/" + prID}
        >
          + Add Sub Product
        </Link>
      }
      childHtml={
        <MuiThemeProvider theme={getMuiTheme}>
          <MUIDataTable
            className="material-table"
            title={subProducts && subProducts.productName}
            data={rows}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      }
    />
  );
};

export default SubProductList;
