import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createProduct,
  getAdminCategory,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import AdminLayout from "./AdminLayout";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { categories } = useSelector((state) => state.categories);
  const [upload, setUpload] = useState(null);
  useEffect(() => {
    dispatch(getAdminCategory());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const file = upload;
    const fileData = file === null ? null : file[0];
    var myForm = new FormData();

    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("Stock", Stock);

    myForm.append("images", fileData);

    // console.log(upload, "images");

    // var bodyFormData = new FormData();
    // bodyFormData.append("images", fileData);

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setUpload(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <AdminLayout
      metaTitle="Create Product"
      pageTitle="Create Product"
      childHtml={
        <div className="newProductContainer roundInputForm">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div className="pa-5">
              <div className="grid-1-1 pb-5">
                <div>
                  <label>Product</label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories.length > 0 &&
                      categories.map((cate) => (
                        <option key={cate._id} value={cate._id}>
                          {cate.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label>Description</label>
                <textarea
                  placeholder="Product Description"
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

export default NewProduct;
