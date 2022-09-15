import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import AdminLayout from "./AdminLayout";
import MUIDataTable from "mui-datatables";

import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
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

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    {
      name: "index",
      label: "Sr. No",
      options: { sort: false, searchable: false },
    },
    {
      name: "Des",
      label: "Name",

      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <Fragment>
              <Link
                to={`/admin/sub_product/${
                  tableMeta &&
                  tableMeta.rowData &&
                  tableMeta.rowData[4] &&
                  tableMeta.rowData[4]
                }`}
              >
                {value}
              </Link>
            </Fragment>
          );
        },
      },
    },

    "Stock",
    "Price",
    {
      name: "Action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Fragment>
              <Link to={`/admin/product/${value}`}>
                <img
                  src="/assets/images/edit.png"
                  alt="edit"
                  className="mt-1"
                />
              </Link>

              <Button onClick={() => deleteProductHandler(value)}>
                <img src="/assets/images/Action-delete.svg" alt="delete" />
              </Button>
            </Fragment>
          );
        },
        sort: false,
      },
    },
  ];

  const rows =
    products &&
    products.map((e, i) => {
      return [`${i < 9 ? "0" : ""}${i + 1}`, e.name, e.Stock, e.price, e._id];
    });

  return (
    <AdminLayout
      metaTitle="All Products - Admin"
      pageTitle="All Products"
      titleBar={
        <Link className="orangeBtn addButton" to="/admin/product">
          + Add Product
        </Link>
      }
      childHtml={
        <MUIDataTable
          className="material-table"
          title={`All Products`}
          data={rows}
          columns={columns}
          options={options}
        />
      }
    />
  );
};

export default ProductList;
