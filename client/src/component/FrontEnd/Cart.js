import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { Grid, Box, Container } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import CancelIcon from "@material-ui/icons/Cancel";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=process/payment");
  };

  return (
    <>
      <MetaData title="Stickers " />
      <Header />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12}>
                <div className="cartPage square-sec">
                  <h3 className="ft-800 ft-22">Cart</h3>
                  <table>
                    <thead>
                      <tr className="row-1">
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems &&
                        cartItems.map((item) => (
                          <tr key={item.product}>
                            <td className="CartItemCard">
                              <div className="flex-box">
                                <img src={item.image} alt="ssa" />
                                <div>
                                  <Link
                                    to={`/product/${item.product}`}
                                    className=""
                                  >
                                    {item.name}
                                  </Link>
                                  <br />
                                  <span>{`Price: $ ${item.price}`}</span>
                                </div>
                              </div>
                            </td>
                            <td className="cartInput">
                              <p>25</p>
                              {/* <button
                          onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }
                        >
                          -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                        >
                          +
                        </button> */}
                            </td>
                            <td className="cartSubtotal">{`₹${
                              item.price * item.quantity
                            }`}</td>
                            <td>
                              <CancelIcon
                                onClick={() => deleteCartItems(item.product)}
                                className="clr-custom"
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox flex-box space-end">
                      <h3 className="ft-800 ft-22">SubTotal:</h3>
                      <p>{`$ ${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                      <Link to="/categories" className="btn-continue-shopping">
                        Continue Shopping
                      </Link>
                      <button
                        onClick={checkoutHandler}
                        className="btn-checkout btn-continue-shopping"
                      >
                        Check Out
                      </button>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      )}
      <Footer />
    </>
  );
};

export default Cart;
