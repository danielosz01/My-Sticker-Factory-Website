import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  getSubProductDetails,
  updateSubProducts,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import AdminLayout from "./AdminLayout";

const UpdateSubProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productId, setProductId] = useState(null);

  const subProductId = match.params.id;

  useEffect(() => {
    if (product && product._id !== subProductId) {
      dispatch(getSubProductDetails(subProductId));
    } else {
      if (product) {
        setName(product.name);
        setDescription(product.description);

        setOldImages(product.images);
        setProductId(product.productId);
      }
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/sub_product/" + productId);
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    subProductId,
    product,
    productId,
    updateError,
  ]);

  const [upload, setUpload] = useState(null);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    const file = upload;
    const fileData = file === null ? null : file[0];

    const myForm = new FormData();

    myForm.set("name", name);

    myForm.set("description", description);

    myForm.append("images", fileData);

    dispatch(updateSubProducts(subProductId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setUpload(e.target.files);

    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <AdminLayout
      metaTitle="Update Sub Product"
      pageTitle="Update Sub Product"
      childHtml={
        <div className="newProductContainer roundInputForm">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <div className="pa-5">
              <div className=" pb-5">
                <div>
                  <input
                    type="text"
                    placeholder="Sub Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Sub Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            </div>

            <div className="pa-5">
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    className="max-w-100"
                  />
                ))}
              </div>

              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                      className="max-w-100"
                    />
                  ))}
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                />
              </div>
            </div>
            <div className="pa-5">
              <button
                className="orangeBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default UpdateSubProduct;
