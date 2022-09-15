import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { Grid, Box, Container } from "@material-ui/core";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { saveShippingInfo } from "../../actions/cartAction";

import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const orderInfo = {
    totalPrice,
  };

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!address || !city || !state || !country || !pinCode || !phoneNo) {
      alert.error("Fill All Address fields");
      return;
    }

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: address,
              city: city,
              state: state,
              postal_code: pinCode,
              country: country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          alert.error("Some error occurred while payment");

          // history.push("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <Header />
      <Container maxWidth="lg">
        <Grid container>
          <Grid container item xs={8} className="pt-aside">
            <h2 className="shippingHeading">Contact Info</h2>
            <div className="full-input">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="shippingBox">
              <h2 className="shippingHeading">Shipping Address</h2>

              <form className="shippingForm" encType="multipart/form-data">
                <div className="full-input">
                  <label>Country</label>
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="full-input">
                  <label>Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>

                <div className="full-input">
                  <label>Company</label>
                  <input type="text" placeholder="123455" required />
                </div>

                <div className="full-input">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="full-input">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="full-input">
                  <label>Pin Code</label>
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>

                <div className="full-input">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    size="10"
                  />
                </div>

                {country && (
                  <div className="full-input">
                    <label>State</label>
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* <input
            type="submit"
            value="Continue"
            className="shippingBtn"
            disabled={state ? false : true}
          /> */}
              </form>
            </div>
            <div className="paymentContainer">
              <h2 className="shippingHeading">Billing Info</h2>
              <p className="text-p">
                You will not be charged until proof approval.
              </p>
              <div className="radio-box">
                <div className="radio-item">
                  <input type="radio" id="ritema" name="ritem" value="ropt1" />
                  <label for="ritema">PayPal</label>
                </div>

                <div className="radio-item pb-20">
                  <input type="radio" id="ritemb" name="ritem" value="ropt2" />
                  <label for="ritemb">Credit Card</label>
                </div>
              </div>
              <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                <div className="full-input">
                  <label>Card Number</label>
                  <CardNumberElement className="paymentInput" />
                </div>
                <div className="div-divide">
                  <div className="full-input w-36">
                    <label>Expires</label>

                    <CardExpiryElement className="paymentInput" />
                  </div>
                  <div className="full-input w-36">
                    <label>CVC</label>

                    <CardCvcElement className="paymentInput" />
                  </div>
                </div>
                <input
                  type="submit"
                  value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                  ref={payBtn}
                  className="paymentFormBtn btn-checkout btn-continue-shopping mtop-7"
                />
              </form>
            </div>
          </Grid>
          <Grid container item xs={4}>
            <div>
              <h2 className="shippingHeading">Order Summary</h2>
              <br />
              <div className="card-box">
                <h5>Circle Stickers</h5>
                <div>
                  <div className="flex-box space-between">
                    <h6 className="fw-400">Qty:3</h6>
                    <p>$100.00</p>
                  </div>
                  <div className="flex-box space-between">
                    <h6 className="fw-400">Shipping</h6>
                    <p>$25.00</p>
                  </div>
                  <hr></hr>
                  <div className="flex-box space-between">
                    <h6>Total</h6>
                    <p className="fw-700">$125.00</p>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Payment;
