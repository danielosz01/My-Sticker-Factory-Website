import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateCategory,
  getCategoryDetails,
  getAdminCategory,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import AdminLayout from "./AdminLayout";

const UpdateCategory = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, category } = useSelector((state) => state.categoryDetails);
  const { categories } = useSelector((state) => state.categories);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categoryId = match.params.id;

  useEffect(() => {
    dispatch(getAdminCategory());

    if (category && category._id !== categoryId) {
      dispatch(getCategoryDetails(categoryId));
    } else {
      setName(category.name);
      setDescription(category.description);
      setOldImages(category.images);
      setParentCategory(category.category);
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
      alert.success("Category Updated Successfully");
      history.push("/admin/categories");
      dispatch({ type: "UPDATE_CATEGORY_RESET" });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    categoryId,
    category,
    updateError,
  ]);

  const updateCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    // myForm.set("category", parentCategory);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateCategory(categoryId, myForm));
  };

  const updateCategoryImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      metaTitle="Update Category"
      pageTitle="Update Category"
      childHtml={
        <div className="newCategoryContainer roundInputForm">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateCategorySubmitHandler}
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

                {/* <div>
                  <label>Parent Category</label>
                  <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((cate) => (
                        <option key={cate._id} value={cate._id}>
                          {cate.name}
                        </option>
                      ))}
                  </select>
                </div> */}
              </div>
              <div>
                <textarea
                  placeholder="Category Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="pa-5">
              <div id="createCategoryFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      className="max-w-100 "
                      alt="Old Category Preview"
                    />
                  ))}
              </div>

              <div id="createCategoryFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Category Preview" />
                ))}
              </div>
              <div id="createCategoryFormFile">
                <input
                  type="file"
                  className="max-w-100"
                  name="avatar"
                  accept="image/*"
                  onChange={updateCategoryImagesChange}
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

export default UpdateCategory;
