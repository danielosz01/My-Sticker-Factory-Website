import React, { useEffect } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const Editor = ({ history }) => {
  let callRefInput = React.createRef();
  const dispatch = useDispatch();
  const alert = useAlert();

  var whiteTheme = {
    "common.backgroundColor": "#fff",
    "common.border": "1px solid #c1c1c1",

    // load button
    "loadButton.backgroundColor": "#fff",
    "loadButton.border": "1px solid #ddd",
    "loadButton.color": "#222",
    "loadButton.fontSize": "12px",

    // download button
    "downloadButton.backgroundColor": "#fdba3b",
    "downloadButton.border": "1px solid #fdba3b",
    "downloadButton.color": "#fff",
    "downloadButton.fontFamily": "'Noto Sans', sans-serif",
    "downloadButton.fontSize": "12px",

    // submenu icons

    // submenu primary color
    "submenu.backgroundColor": "transparent",
    "submenu.partition.color": "#222",

    // submenu labels
    "submenu.normalLabel.color": "#222",
    "submenu.normalLabel.fontWeight": "normal",
    "submenu.activeLabel.color": "#222",
    "submenu.activeLabel.fontWeight": "normal",

    // checkbox style
    "checkbox.border": "1px solid #22",
    "checkbox.backgroundColor": "#fff",

    // rango style
    "range.pointer.color": "#222",
    "range.bar.color": "#222",
    "range.subbar.color": "#222",

    "range.disabledPointer.color": "#d3d3d3",
    "range.disabledBar.color": "rgba(85,85,85,0.06)",
    "range.disabledSubbar.color": "rgba(51,51,51,0.2)",

    "range.value.color": "#000",
    "range.value.fontWeight": "normal",
    "range.value.fontSize": "11px",
    "range.value.border": "0",
    "range.value.backgroundColor": "#000",
    "range.title.color": "#000",
    "range.title.fontWeight": "lighter",

    // colorpicker style
    "colorpicker.button.border": "0px",
    "colorpicker.title.color": "#000",
  };

  useEffect(() => {
    if (!localStorage.getItem("base64")) {
      history.push("/");
    }
  }, []);

  const handleClickButton = () => {
    const imageEditor = callRefInput.current.getInstance();
    console.log(imageEditor);
    dispatch(
      addItemsToCart(
        localStorage.getItem("customProductId"),
        20,
        imageEditor.toDataURL()
      )
    );
    alert.success("Item Added To Cart");
  };

  return (
    <>
      <MetaData title="Stickers " />
      <Header />

      <div className="p-relative">
        <ImageEditor
          ref={callRefInput}
          includeUI={{
            loadImage: {
              path: "data:image/png;base64," + localStorage.getItem("base64"),
              name: "SampleImage",
            },
            // theme: whiteTheme,
            // menu: ["shape", "filter"],
            initMenu: "text",
            uiSize: {
              height: "650px",
            },
            menuBarPosition: "left",
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
        />
        <div className="tui-buttons">
          <button onClick={handleClickButton} className="theme-btn">
            Add to cart
          </button>
          <button
            className="theme-btn"
            onClick={() => {
              const imageEditor = callRefInput.current.getInstance();
              console.log(imageEditor.toDataURL());
              var newWindow = window.open();
              newWindow.document.write(
                `<img src="${imageEditor.toDataURL()}">`
              );
            }}
          >
            Preview
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Editor;
