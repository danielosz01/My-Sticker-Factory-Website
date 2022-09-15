import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import AdminLayout from "./AdminLayout";
import MUIDataTable from "mui-datatables";

const options = {
  print: false,
  download: false,
  filter: false,
  viewColumns: false,
  selectableRowsHideCheckboxes: true,
  rowsPerPage: 50,
  rowsPerPageOptions: [5, 10, 50, 100],
};

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    {
      name: "index",
      label: "Sr. No",
      options: { sort: false, searchable: false },
    },
    "Items Qty",
    "Amount",
    {
      name: "Status",
      label: "Status",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value === "Delivered" ? "greenColor" : "redColor";
        },
        sort: false,
      },
    },
    {
      name: "Action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Fragment>
              <Link to={`/admin/order/${value}`}>
                <EditIcon />
              </Link>

              <Button onClick={() => deleteOrderHandler(value)}>
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
        sort: false,
      },
    },
  ];

  const rows =
    orders && orders.length > 0
      ? orders.map((e, i) => {
          return [
            `${i < 9 ? "0" : ""}${i + 1}`,
            e.orderItems.length,
            e.totalPrice,
            e.orderStatus,
            e._id,
          ];
        })
      : [];

  return (
    <AdminLayout
      metaTitle="All Orders - Admin"
      pageTitle="ALL Orders"
      childHtml={
        <div className="productListContainer">
          <MUIDataTable
            className="material-table"
            title={`All Orders`}
            data={rows}
            columns={columns}
            options={options}
          />
        </div>
      }
    />
  );
};

export default OrderList;
