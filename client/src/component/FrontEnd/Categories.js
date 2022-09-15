import React from "react";
import { Benefits, CategoriesWidget } from "./components";
import MetaData from "../layout/MetaData";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Category() {
  return (
    <>
      <MetaData title="Stickers - All Categories" />
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
      <CategoriesWidget />
      <Benefits />
      <Footer />
    </>
  );
}
