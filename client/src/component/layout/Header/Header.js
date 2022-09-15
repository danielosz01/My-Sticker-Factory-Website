import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/sticker-logo.png";
import cart from "../../../images/cart.png";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <header>
      <Container
        maxWidth="lg"
        className="d-flex flex-column align-center space-between"
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="d-flex header-list">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">Products</Link>
          {isAuthenticated === true && user.role === "admin" && (
            <Link to="/admin/dashboard">Admin Panel</Link>
          )}
          {isAuthenticated === true ? (
            <Link to="/" onClick={logoutUser}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Account</Link>
          )}
          <Link className="theme-btn cart" to="/cart">
            <img src={cart} alt="cart" />
            Cart
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
