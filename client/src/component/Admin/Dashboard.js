import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import AdminLayout from "./AdminLayout";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct, getAdminCategory } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminCategory());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  return (
    <AdminLayout
      metaTitle="Dashboard - Admin Panel"
      pageTitle="Dashboard"
      childHtml={
        <div className="dashboardSummary">
          <Link to="/admin/products">
            <p className="count">{products && products.length}</p>
            <p>Total Product</p>
          </Link>
          <Link to="/admin/orders">
            <p className="count">{orders && orders.length}</p>
            <p>Total Orders</p>
          </Link>
          <Link to="/admin/users">
            <p className="count">{users && users.length}</p>
            <p>Total Users</p>
          </Link>
          <Link to="/admin/categories">
            <p className="count">{categories && categories.length}</p>
            <p>Total Categories</p>
          </Link>
        </div>
      }
    />
  );
};

export default Dashboard;
