import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/FrontEnd/Home";
import Categories from "./component/FrontEnd/Categories";
import Products from "./component/FrontEnd/Products";
import SingleProduct from "./component/FrontEnd/SingleProduct";
import Cart from "./component/FrontEnd/Cart";
import { PaymentSuccess } from "./component/FrontEnd/components";

import ProductDetails from "./component/Product/ProductDetails";
// import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import Editor from "./component/FrontEnd/editor";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";

import axios from "axios";
import Payment from "./component/FrontEnd/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import CategoryList from "./component/Admin/CategoryList.js";
import NewProduct from "./component/Admin/NewProduct";
import NewCategory from "./component/Admin/NewCategory";
import UpdateProduct from "./component/Admin/UpdateProduct";
import UpdateCategory from "./component/Admin/UpdateCategory";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";
import SubProductList from "./component/Admin/SubProductList";
import NewSubProduct from "./component/Admin/NewSubProduct";
import UpdateSubProduct from "./component/Admin/UpdateSubProduct";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const loader = useSelector(
    (state) =>
      state.allOrders.loading ||
      state.allUsers.loading ||
      state.categories.loading ||
      state.products.loading ||
      state.newProduct.loading ||
      state.newCategory.loading ||
      state.user.loading
  );

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <div
      className={`App ${loader === true ? "overflow-hidden height-100vh" : ""}`}
    >
      {loader === true && (
        <div className="site-loader">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <Router>
        {/* {isAuthenticated && <UserOptions user={user} />} */}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/Editor" component={Editor} />
          <Route exact path="/category/:catId" component={Products} />
          <Route exact path="/products" component={Products} />

          <Route exact path="/product/:id" component={SingleProduct} />

          <Route
            exact
            path="/login"
            render={(props) => <LoginSignUp {...props} adminLogin={true} />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <LoginSignUp {...props} />}
          />

          <Route exact path="/cart" component={Cart} />

          <ProtectedRoute exact path="/success" component={PaymentSuccess} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            path="/admin/products"
            isAdmin={true}
            component={ProductList}
          />
          <ProtectedRoute
            exact
            path="/admin/categories"
            isAdmin={true}
            component={CategoryList}
          />
          <ProtectedRoute
            exact
            path="/admin/product"
            isAdmin={true}
            component={NewProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/category"
            isAdmin={true}
            component={NewCategory}
          />

          <ProtectedRoute
            exact
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/sub_product/:id"
            isAdmin={true}
            component={SubProductList}
          />
          <ProtectedRoute
            exact
            path="/admin/new/sub_product/:id"
            isAdmin={true}
            component={NewSubProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/edit/sub_product/:id"
            isAdmin={true}
            component={UpdateSubProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/category/:id"
            isAdmin={true}
            component={UpdateCategory}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
          />

          <ProtectedRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />
          {/* <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        

        

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        /> */}

          {/*
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" admin="false" component={LoginSignUp} /> */}
          {/* <ProtectedRoute exact path="/orders" component={MyOrders} /> */}
          {/* <ProtectedRoute exact path="/order/:id" component={OrderDetails} /> */}

          <Route
            component={
              window.location.pathname === "/process/payment" ? null : NotFound
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
