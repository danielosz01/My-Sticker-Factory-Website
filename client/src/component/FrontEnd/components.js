import React, { useEffect } from "react";
import { Grid, Box, Container, Button } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getCategory,
  getProduct,
} from "../../actions/productAction";
import { Router, Route, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { RightArrowIcon } from "../Icons";
function CategoriesWidget() {
  const alert = useAlert();

  const { loading, error, categories } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCategory());
  }, [dispatch, error, alert]);

  return (
    <Grid className="custom-container category-section" container>
      <h2 className="homeHeading">Categories Of Stickers</h2>
      <p className="color-gray text-center mb-10">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos
        iusto voluptatibus quia magnam rerum maiores nihil iste! Quibusdam,
        earum! Quo facere tempora non ullam quia similique maiores culpa,
        ducimus porro
      </p>

      <Grid container className="categoryWidget">
        {categories &&
          categories.map((cat) => (
            <Grid item xs={6} key={cat._id}>
              <Link to={`/category/${cat._id}`}>
                {cat.images.length > 0 && (
                  <img
                    alt="categories"
                    src={cat.images[0].url}
                    className="mb-2 gray-bg px-10 py-5 d-block pb-5 m-auto"
                  />
                )}
                <p className="text-center">{cat.name}</p>
                <p className="category_description mb-10">{cat.description}</p>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

function ProductsWidget({ catId, currentPage }) {
  const alert = useAlert();

  const { loading, error, products, categoryName } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  let keyword = "";

  let price = [0, 25000];
  let category = catId === undefined ? "" : catId;

  let ratings = 0;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, alert]);

  return (
    <div>
      <Container
        maxWidth="lg"
        className="d-flex flex-column align-center space-between mt-5 mb-5 products-page"
      >
        <Grid container className="productWidget">
          {products &&
            products
              // .filter((product) =>
              //   catId === undefined ? true : catId === product.category
              // )
              .map((product) => (
                <>
                  {categoryName === undefined ? (
                    <div
                      className="mt_top"
                      style={{
                        flexBasis: "25%",
                      }}
                    >
                      <Link className="see-more" to={`/product/${product._id}`}>
                        <img
                          alt=""
                          className={
                            product.images && product.images.length === 0
                              ? "empty_image"
                              : product.images &&
                                product.images.length > 0 &&
                                product.images[0].url === ""
                              ? "empty_image"
                              : null
                          }
                          src={
                            product.images && product.images.length === 0
                              ? "assets/images/no_image.png"
                              : product.images &&
                                product.images.length > 0 &&
                                product.images[0].url === ""
                              ? "assets/images/no_image.png"
                              : product.images &&
                                product.images.length > 0 &&
                                product.images[0].url
                          }
                        />
                        <p className="product_title ft_titles text-center">
                          {product.name}
                        </p>
                      </Link>
                    </div>
                  ) : categoryName === "Custom Stickers" ||
                    categoryName === "Sticker for Cars" ? (
                    <div
                      className="mt_top"
                      style={{
                        flexBasis: "25%",
                      }}
                    >
                      <Link className="see-more" to={`/product/${product._id}`}>
                        <img
                          alt=""
                          className={
                            product.images && product.images.length === 0
                              ? "empty_image"
                              : product.images &&
                                product.images.length > 0 &&
                                product.images[0].url === ""
                              ? "empty_image"
                              : null
                          }
                          src={
                            product.images && product.images.length === 0
                              ? "assets/images/no_image.png"
                              : product.images &&
                                product.images.length > 0 &&
                                product.images[0].url === ""
                              ? "assets/images/no_image.png"
                              : product.images &&
                                product.images.length > 0 &&
                                product.images[0].url
                          }
                        />
                        <p className="product_title ft_titles text-center">
                          {product.name}
                        </p>
                      </Link>
                    </div>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      key={product._id}
                      container
                      className="product_wrap"
                    >
                      <Grid item xs={6} className="bg_white">
                        <p className="product_title">{product.name}</p>
                        <p className="product_description mb-1">
                          {product.description}
                        </p>
                        <Link
                          className="see-more"
                          to={`/product/${product._id}`}
                        >
                          <span className="arrow_icon">
                            <RightArrowIcon />
                          </span>{" "}
                          Get quote
                        </Link>
                      </Grid>

                      <Grid item xs={6} className="p-relative">
                        <div className="image_banner">
                          <img
                            alt=""
                            className={
                              product.images &&
                              product.images.length > 0 &&
                              product.images[0].url === ""
                                ? "empty_image"
                                : null
                            }
                            src={
                              product.images && product.images.length === 0
                                ? "assets/images/no_image.png"
                                : product.images &&
                                  product.images.length > 0 &&
                                  product.images[0].url === ""
                                ? "assets/images/no_image.png"
                                : product.images &&
                                  product.images.length > 0 &&
                                  product.images[0].url
                            }
                          />
                        </div>
                      </Grid>
                    </Grid>
                  )}
                </>
              ))}
          {products &&
            !products.some((product) =>
              catId === undefined ? true : catId === product.category
            ) && <h1>No product found.</h1>}
        </Grid>
      </Container>
    </div>
  );
}

const Benefits = () => {
  return (
    <div className="pink-bg color-white benefits">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={4}>
            <img
              alt="categories"
              src="/assets/images/time-date.png"
              className="mb-2 px-10 py-5 d-block pb-5 m-auto"
            />
            <h3 className="text-center">Free shipping In 4 Days</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              repudiandae!
            </p>
          </Grid>
          <Grid item xs={4}>
            <img
              alt="categories"
              src="/assets/images/online-store.png"
              className="mb-2 px-10 py-5 d-block pb-5 m-auto"
            />
            <h3 className="text-center">Get an Online Proof</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              repudiandae!
            </p>
          </Grid>
          <Grid item xs={4}>
            <img
              alt="categories"
              src="/assets/images/weather.png"
              className="mb-2 px-10 py-5 d-block pb-5 m-auto"
            />
            <h3>Weatherproof</h3>
            <p className="text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              repudiandae!
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const PaymentSuccess = () => {
  return (
    <>
      <MetaData title="Order Successfull" />
      <Header />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} className="pt-aside text-center">
            <CheckCircleOutlineIcon className="check-circle" />
            <h3 className="ft-22">Order Successfully Placed</h3>
            <br />
            <p className="ft-15">
              Your Order Number is <span className="clr-pink">23234456</span>
            </p>
            <br />
            <p>
              You'll receive an email confirmation shortly to{" "}
              <span className="clr-pink">sticker@gmail.com</span>
            </p>
            <br />
            <p className="text-total">
              Order Total <span className="ft-800">$125.00</span>
            </p>
            <br />
            <Link to="" className="btn-continue-shopping btn-order-success">
              Continue Shopping
            </Link>
            <Link
              to=""
              className="btn-continue-shopping btn-checkout btn-order-success"
            >
              My Orders
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export { CategoriesWidget, ProductsWidget, Benefits, PaymentSuccess };
