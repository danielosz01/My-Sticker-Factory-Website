import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProduct,
  createSubProduct,
  getAdminCategory,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import AdminLayout from "./AdminLayout";

const NewSubProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const prID = match.params.id;

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [imagesPreview, setImagesPreview] = useState([]);
  const [upload, setUpload] = useState(null);
  useEffect(() => {
    dispatch(getProductDetails(prID));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/sub_product/" + prID);
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, prID, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const file = upload && upload;
    const fileData = file === null ? null : file[0];
    var myForm = new FormData();

    myForm.append("name", name);
    myForm.append("productId", prID);
    myForm.append("description", description);

    myForm.append("images", fileData && fileData);

    dispatch(createSubProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setUpload(e.target.files);

    setImagesPreview([]);

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
      metaTitle="Create Sub Product"
      pageTitle={`Create Sub Product of ${product && product.name}`}
      childHtml={
        <div className="newProductContainer roundInputForm">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div className="pa-5">
              <div className=" pb-5">
                <div>
                  <label>Name</label>
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
                <label>Description</label>
                <textarea
                  placeholder="Sub Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="pa-5">
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="max-w-100"
                    alt="Product Preview"
                  />
                ))}
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                />
              </div>
            </div>
            <div className="pa-5">
              <button
                type="submit"
                className="orangeBtn"
                disabled={loading ? true : false}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default NewSubProduct;
