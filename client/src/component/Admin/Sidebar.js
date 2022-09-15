import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import { useAlert } from "react-alert";

const Sidebar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <img
          src="/assets/images/sticker-logo.svg"
          className="logo"
          alt="Stickers"
        />
      </Link>
      <a href="/admin/dashboard">
        <p>
          <img
            src="/assets/images/Dashboard.svg"
            className="icons"
            alt="Sidebar Icons"
          />
          Dashboard
        </p>
      </a>
      <Link to="/admin/users">
        <p>
          <img
            src="/assets/images/user.svg"
            className="icons"
            alt="Sidebar Icons"
          />
          Users
        </p>
      </Link>
      <a href="/admin/products">
        <p>
          <img
            src="/assets/images/Products.svg"
            className="icons"
            alt="Sidebar Icons"
          />
          Products
        </p>
      </a>

      <Link to="/admin/categories">
        <p>
          <img
            src="/assets/images/Category.svg"
            className="icons"
            alt="Sidebar Icons"
          />
          Categories
        </p>
      </Link>

      <Link to="/admin/orders">
        <p>
          <img
            src="/assets/images/Order.svg"
            className="icons"
            alt="Sidebar Icons"
          />
          Orders
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <img
            src="/assets/images/transaction.svg"
            className="icons"
            alt="Sidebar Icons"
          />
          Transactions
        </p>
      </Link>

      <Box className="logout-admin" onClick={logoutUser}>
        <p>
          <img
            src="/assets/images/ic_round-logout.svg"
            className="icons"
            alt="Sidebar Icons"
          />
          Logout
        </p>
      </Box>

      {/* <a to="/admin/reviews">Reviews</a> */}
    </div>
  );
};

export default Sidebar;
