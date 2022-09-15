import React from "react";
import Helmet from "react-helmet";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { useParams, useLocation } from "react-router-dom";

export default function Editor() {
  const search = useLocation().search;
  const shape = new URLSearchParams(search).get("shape");
  console.log(shape); //101

  return (
    <>
      <Helmet>
        <title>Image Editor</title>
        <link rel="stylesheet" href="/fabricjs/lib/style.css" />
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.3/fabric.min.js"></script> */}
        {/* <script src="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.js"></script> */}
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.css"
        /> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/fabricjs/cdn/spectrum.min.css"
        />

        <link rel="stylesheet" href="/fabricjs/vendor/grapick.min.css" />
        <script src="/fabricjs/script.js"></script>
      </Helmet>
      <Header />
      <div id="image-editor-container" className={`shape-${shape}`}></div>
      <div id="outputtt"></div>
      <Footer />
    </>
  );
}
