import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { Link } from "react-router-dom";
import { Benefits } from "./components";
import { Grid, Box, Container } from "@material-ui/core";

let baseValues = {
  version: "3.6.3",
  objects: [
    {
      type: "image",
      version: "3.6.3",
      originX: "left",
      originY: "top",
      left: 50,
      top: 50,
      // width: 312,
      // height: 312,
      fill: "rgb(0,0,0)",
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeMiterLimit: 4,
      // scaleX: 1.42,
      // scaleY: 1.42,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      clipTo: null,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      transformMatrix: null,
      skewX: 0,
      skewY: 0,
      crossOrigin: "",
      cropX: 0,
      cropY: 0,
      filters: [],
    },
  ],
};

const SingleProduct = ({ match, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <Header />
          <Grid className="banner" style={{ minHeight: "350px" }} container>
            <Grid item xs={6} className="d-flex">
              <div className="m-auto pb-5 max-w-450 ">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="cartWrapper">
                  <div className="grid-1-1">
                    <div>
                      <p>Quantity</p>
                      <select onChange={(e) => setQuantity(e.target.value)}>
                        <option value="20">20 Pcs</option>
                        <option value="40">40 Pcs</option>
                        <option value="60">60 Pcs</option>
                      </select>
                    </div>
                    <div>
                      <p>Size</p>
                      <select>
                        <option value="2”X2”">2”X2”</option>
                        <option value="4”X4”">4”X4”</option>
                        <option value="6”X6”">6”X6”</option>
                      </select>
                    </div>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className="cartBlueBtn"
                  >
                    Add to Cart
                  </button>
                  {product.baseImg && (
                    <button
                      className="cartBlueBtn"
                      onClick={() => {
                        baseValues["objects"][0]["src"] =
                          "data:image/png;base64," + product.baseImg;
                        // localStorage.setItem("base64", baseValues);
                        localStorage.setItem(
                          "canvasEditor",
                          JSON.stringify(baseValues)
                        );
                        localStorage.setItem(
                          "customProductId",
                          match.params.id
                        );
                        history.push("/editor");
                      }}
                    >
                      Customize your Design
                    </button>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={6} className="d-flex">
              <img src="/assets/images/headerImg.png" />
            </Grid>
          </Grid>
          {/* <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
          </div> */}
          <Benefits />
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={6} className="img-size">
                <img src="/assets/images/square-stickers.png" />
              </Grid>

              <Grid item xs={6} className="square-sec padding-right-h">
                <h3>Square custom stickers</h3>
                <p>
                  Boost your brand identity with square stickers customized with
                  your very own design. Our custom printed stickers are produced
                  on the strongest vinyl and with scratch resistant inks of
                  anywhere color making them remarkably tough and long lasting.
                  the squares stickers are very populars and represents the
                  minimalism of our new trend on design. at the same time the
                  square shape represents. strength and security.
                  <br />
                  <br />
                  And if you transform that square sticker into a rectangular
                  sticker, it will represent stability and resistance.
                </p>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={6} className="square-sec padding-left-h">
                <h3>Square stickers on a roll</h3>
                <p>
                  Looking for a simple and easy way to create a consistent,
                  professional look across many products or packaging? Our
                  custom roll labels are very easy to use on bags, boxes, jars,
                  bottles and more. Pretty much anything you want to put your
                  brand on.
                  <br />
                  <br />
                  Identifying with taped papers or writing the information
                  manually on the product cannot be considered a correct process
                  within the company, let alone if all this turns on a sheet of
                  paper with the details.
                  <br />
                  <br />
                  Self-adhesive labels on a roll will improve the identification
                  of your product or service, its storage, its traceability and
                  correct use.
                  <br />
                  <br />
                  Avoiding human and process errors that translate into
                  unexpected and unnecessary costs.
                </p>
              </Grid>
              <Grid item xs={6} className="img-size">
                <img src="/assets/images/roll.png" />
              </Grid>
            </Grid>
          </Container>
          <div className=" pink-bg color-white benefits square-sec">
            <Container maxWidth="lg">
              <Grid container>
                <Grid item xs={7}>
                  <h3 align="left">Square Business Stickers</h3>
                  <p align="left">
                    Good packaging is a first-rate marketing tool. Two out of
                    every three consumers decide to buy a new product when the
                    packaging catches their attention, and several studies have
                    shown that it takes our brains no more than six seconds to
                    decide to add this product to the shopping cart.
                    <br />
                    <br />
                    For this reason, a good sticker design for the product of
                    your business is key for it to enter the homes of consumers,
                    being able to generate a return on investment 2.5 times
                    higher than that invested in marketing actions of another
                    type.
                    <br />
                    <br />
                    The truth is that the packaging is the only marketing
                    element that enters the consumer’s home and is kept until
                    the product is exhausted or thrown away. No advertisement
                    has such a high or long-lasting presence!
                    <br />
                    <br />
                    It is for all this that we are going to talk about the
                    advantages of investing in good packaging and labels for
                    your product:
                  </p>
                </Grid>
                <Grid item xs={5}>
                  <img src="/assets/images/business.png" />
                </Grid>
                <Grid item xs={12} className="square-sticker-list">
                  <ul>
                    <li>
                      Generate demand: A good design manages to attract the
                      attention of the public, increasing the interest in
                      obtaining it. Creativity plays a very important role at
                      this point, and it is that any product can have an
                      innovative packaging in some way. Wouldn’t you like to
                      have these pasta packages in your kitchen? ****
                    </li>

                    <li>
                      Improves identification: The differentiation makes it
                      easier for the consumer to identify it at a glance and
                      makes the act of choosing it for purchase easier. Who
                      could mistake these juice containers for the traditional
                      containers on the supermarket shelf? ***
                    </li>

                    <li>
                      If your products are seasonal, you can take advantage of
                      key weeks or months to introduce exclusive designs,
                      connecting with customers. The design, accompanied by a
                      promotion, increases the attractiveness of the product
                    </li>

                    <li>
                      Increase in product value: If a product enters our eyes
                      and we identify it with positive values, we are usually
                      willing to pay a higher price.
                    </li>

                    <li>
                      Customer loyalty: The client is not only loyal to the
                      product, but also to its way of presentation and its brand
                      values.
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Container>
          </div>
          <Container maxWidth="lg">
            <Grid container className=" square-sec">
              <Grid item xs={6} className="img-size">
                <img src="/assets/images/candal.png" />
              </Grid>
              <Grid item xs={6} className="pxy">
                <h3 align="left">Square candle stickers</h3>
                <p align="left">
                  Get noticed with personalized candle labels that will entice
                  customers to pick up their candles, open the lids and absorb
                  their scents. Custom candle labels show your brand and the
                  magic of the candles you create.
                  <br />
                  <br />
                  Your customers’ journey begins when they see a label hinting
                  at the experience inside the candle jar or tin. Let us help
                  you create a candle label that is as unique as the specialty
                  candles you are labeling. Without a minimum order quantity,
                  you can experiment with new scents and limited runs without
                  making a big commitment. The high-quality, heat-resistant
                  materials adhere to almost any type of candle holder. Your
                  candle label printing possibilities are endless with our
                  selection of materials, finishes and inks. All of our candle
                  label materials are durable and made to stay in place in a
                  variety of containers, including votives or straight-sided
                  jars and cans, apothecary bottles, and mason jars. Our custom
                  printed labels are available in a wide variety of shapes and
                  sizes. We also have the ability to cut and print custom shapes
                  and sizes.
                </p>
              </Grid>
            </Grid>
          </Container>
          <div className="pink-bg square-sec color-white">
            <Grid container>
              <Grid item xs={6} className="space-container ">
                <Container maxWidth="lg">
                  <h3 align="left" className="pt-top">
                    Square christmas stickers
                  </h3>
                  <p align="left">
                    There are stickers of all kinds. Stickers of memes, movies,
                    celebrities … but also Christmas stickers! With these, you
                    have the possibility of being a little more original and
                    congratulating the holidays in a fun and funny way without
                    resorting to the typical gifts that everyone uses.
                  </p>
                </Container>
              </Grid>
              <Grid item xs={6} className="img-full-width">
                <img src="/assets/images/christmas.png" />
              </Grid>
            </Grid>
          </div>
          <Container maxWidth="lg">
            <Grid container className="square-sec">
              <Grid item xs={6} className="img-size" align="center">
                <img src="/assets/images/box-container.png" />
              </Grid>
              <Grid item xs={6} className="space-container ">
                <h3 align="left" className="pt-top">
                  Square box stickers
                </h3>
                <p align="left">
                  You can personalize your boxes with adhesive vinyl, they are
                  acquired by spreadsheet, thus obtaining a full color design
                  with the possibility of creating gradients and all kinds of
                  colors
                  <br />
                  <br />
                  We could say that it is your design multiplied in a template
                  to which we can give it the shape you want by means of a
                  vector cut and incorporate it into any design or type of box.
                </p>
              </Grid>
            </Grid>

            <Grid container className="square-sec">
              <Grid item xs={6} className="space-container ">
                <h3 align="left" className="pt-top">
                  Square stickers in books
                </h3>
                <p align="left">
                  It is time to prepare for the kids’ return to school and the
                  school supplies must be impeccable. To help you simplify the
                  work and, in addition, make everything look nice, the square
                  stickers are perfect to stick on books and notebooks.
                </p>
              </Grid>
              <Grid item xs={6} className="img-size img-small" align="center">
                <img src="/assets/images/book.png" />
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default SingleProduct;
