import React, { Fragment, useEffect } from "react";
import "./frontend.css";
// import ProductCard from "./ProductCard";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import MetaData from "../layout/MetaData";
import { clearErrors, getCategory } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Grid, Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { CategoriesWidget, Benefits } from "./components";

const Home = () => {
  return (
    <Fragment>
      <MetaData title="Stickers" />
      <Header />
      <Grid className="banner" style={{ height: "350px" }} container>
        <Grid item xs={6} className="d-flex">
          <div className="m-auto pb-5">
            <h1>
              Custom Stickers
              <br />
              That Rock
            </h1>
            <p>
              Easy online ordering, 4 day turnaround and free online proofs.
              <br />
              Free shipping
            </p>
            <Link to="/" className="blue-btn">
              Start Designing
            </Link>
          </div>
        </Grid>
        <Grid item xs={6} className="d-flex">
          <img src="/assets/images/headerImg.png" />
        </Grid>
      </Grid>

      <CategoriesWidget />

      <Benefits />

      <Container maxWidth="lg" className="features">
        <Grid container>
          <Grid item xs={6} className="first">
            <h1 className="mb-2">
              Free shipping, free online proofs, fast turnaround.
            </h1>
            <p className="color-gray">
              My Sticker Factory of Miami is the fastest and easiest way to buy
              custom-printed products. Order in 60 seconds and we’ll turn your
              designs and illustrations into custom stickers, magnets, buttons,
              labels, and packaging in days. We offer free online proofs, free
              worldwide shipping, and super fast turnaround.
            </p>
          </Grid>
          <Grid item xs={6}>
            <img src="/assets/images/free-shiping.png" alt="shipping" />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Home;
