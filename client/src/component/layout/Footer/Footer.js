import React from "react";
import { Container, Grid } from "@material-ui/core";
import logo from "../../../images/sticker-logo.png";
import fb from "../../../images/facebook.png";
import insta from "../../../images/instagram.png";
import linkedin from "../../../images/linkedin.png";
import youtube from "../../../images/youtube.png";
import twitter from "../../../images/twitter.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <Container
        maxWidth="lg"
        className="d-flex flex-column align-center space-between pa-5"
      >
        <Grid container>
          <Grid item xs={6}>
            <Link to="/admin/products">
              <img src={logo} alt="logo" className="mb-2" />
            </Link>
            <p className="color-gray">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Dignissimos iusto voluptatibus quia magnam rerum maiores nihil
              iste! Quibusdam, earum! Quo facere
            </p>
          </Grid>
          <Grid item xs={6} container>
            <Grid item xs={6}>
              <div className="footer-list">
                <Link to="/">
                  <h3>Quick Links</h3>
                </Link>
                <Link to="/">Home</Link>
                <Link to="/">Categories</Link>
                <Link to="/">Products</Link>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="footer-list">
                <Link to="/">
                  <h3>Useful Links</h3>
                </Link>
                <Link to="/">About Us</Link>
                <Link to="/">Help</Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className="footer-black">
        <Container
          maxWidth="lg"
          className="d-flex flex-column align-center space-between"
        >
          <Grid container>
            <Grid item xs={6}>
              @2021. All rights reserved.
            </Grid>
            <Grid item xs={6} className="social-box">
              <Link to="/admin/products">
                <img src={fb} alt="social" className="mb-2" />
              </Link>
              <Link to="/admin/products">
                <img src={insta} alt="social" className="mb-2" />
              </Link>
              <Link to="/admin/products">
                <img src={linkedin} alt="social" className="mb-2" />
              </Link>
              <Link to="/admin/products">
                <img src={youtube} alt="social" className="mb-2" />
              </Link>
              <Link to="/admin/products">
                <img src={twitter} alt="social" className="mb-2" />
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
