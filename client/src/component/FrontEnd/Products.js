import React from "react";
import { Benefits, ProductsWidget } from "./components";
import MetaData from "../layout/MetaData";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { Button, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAllProduct,
  getProduct,
} from "../../actions/productAction";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export default function Products({ match }) {
  const { error, products, productsCount, categoryName } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  const [currentPagination, setCurrentPagination] = React.useState(1);
  const [productStatus, setProductStatus] = React.useState(false);

  let keyword = "";

  let price = [0, 25000];
  let category = match.params.catId === undefined ? "" : match.params.catId;
  let ratings = 0;
  let currentPage = currentPagination;

  const paginationProduct = () => {
    currentPage = currentPage + 1;
    setCurrentPagination(currentPage);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  };

  const paginationProductLess = () => {
    currentPage = currentPage - 1;
    setCurrentPagination(currentPage);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  };

  console.log(
    categoryName,
    "categoryName",
    products,
    "productStatus",
    productsCount
  );
  return (
    <>
      <MetaData title="Stickers " />
      <Header />
      <Grid
        className="banner"
        style={{ height: "250px", textAlign: "center" }}
        container
      >
        <Grid item xs={12} className="d-flex">
          <div className="m-auto pb-5">
            <Typography style={{ fontSize: "35px", fontWeight: 700 }}>
              Categories of stickers
            </Typography>
            <Typography style={{ width: "700px", maxWidth: "100%" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quos
              quibusdam sit quam omnis eius facere praesentium maxime magnam
              ipsa? Praesentium officiis cumque quos vero temporibus commodi
              labore eos tempore!
            </Typography>
          </div>
        </Grid>
      </Grid>
      <ProductsWidget
        catId={match.params.catId}
        currentPage={currentPage}
        setProductStatus={setProductStatus}
      />
      <div className="see_more_projects">
        {products && products.length === 8 ? (
          currentPagination == 1 ? (
            <Button
              className="see_more_btn"
              onClick={() => {
                paginationProduct();
              }}
            >
              <ArrowForwardIosIcon />
            </Button>
          ) : (
            <>
              <Button
                className="see_more_btn"
                onClick={() => {
                  paginationProductLess();
                }}
              >
                <ArrowBackIosNewIcon />
              </Button>

              <Button
                className="see_more_btn"
                onClick={() => {
                  paginationProduct();
                }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </>
          )
        ) : products && products.length != 8 && currentPagination != 1 ? (
          <Button
            className="see_more_btn"
            onClick={() => {
              paginationProductLess();
            }}
          >
            <ArrowBackIosNewIcon />
          </Button>
        ) : null}
      </div>

      <Benefits />
      <Footer />
    </>
  );
}
