import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  createCategory,
  getAdminCategory,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import AdminLayout from "./AdminLayout";

const NewCategory = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newCategory);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [upload, setUpload] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { categories } = useSelector((state) => state.categories);
  console.log(
    "XD ~ file: NewCategory.js ~ line 26 ~ NewCategory ~ categories",
    categories
  );

  useEffect(() => {
    dispatch(getAdminCategory());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Category Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: "NEW_CATEGORY_RESET" });
    }
  }, [dispatch, alert, error, history, success]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();
    const file = upload;
    const fileData = file === null ? null : file[0];
    var myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    if (category) {
      myForm.set("category", category);
    }

    myForm.append("images", fileData);
    dispatch(createCategory(myForm));
  };

  const createCategoryImagesChange = (e) => {
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
      metaTitle="Create Category"
      pageTitle="Create Category"
      childHtml={
        <div className="newProductContainer roundInputForm">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createCategorySubmitHandler}
          >
            <div className="pa-5">
              <div className="grid-1-1 pb-5">
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label>Parent Category</label>
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((cate) => (
                        <option key={cate._id} value={cate._id}>
                          {cate.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <label>Category Description</label>
                  <textarea
                    placeholder="Category Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pa-5">
              <div id="createCategoryFormImage">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="max-w-100"
                    alt="Category Preview"
                  />
                ))}
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createCategoryImagesChange}
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

export default NewCategory;
