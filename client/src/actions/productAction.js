import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  ADMIN_SUB_PRODUCT_REQUEST,
  ADMIN_SUB_PRODUCT_SUCCESS,
  ADMIN_SUB_PRODUCT_FAIL,
} from "../constants/productConstants";

// Get All  Products
export const getProduct =
  (keyword, currentPage, price, category, ratings) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      if (data) {
        if (category) {
          const res = await axios.get(`/api/v1/category/${category}`, {
            headers: { Authorization: localStorage.getItem("token") },
          });

          const categoryName =
            res.data.category && res.data.category && res.data.category.name;
          data.categoryName = categoryName;

          console.log(data, "Ca");
          dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        headers: { "Content-Type": "multipart/form-data" },
        Authorization: localStorage.getItem("token"),
      },
    };

    console.log(productData, "productData");

    const { data } = await axios({
      method: "post",
      url: `/api/v1/admin/product/new`,
      data: productData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: {},
    });

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Sub Product List

export const getAdminSubProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SUB_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/all/sub_product/" + id, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    dispatch({
      type: ADMIN_SUB_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_SUB_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Sub Product
export const createSubProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    console.log(productData, "productData");

    const { data } = await axios({
      method: "post",
      url: `/api/v1/admin/product/sub_product`,
      data: productData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get sub product details
export const getSubProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `/api/v1/admin/product/sub_product/${id}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    console.log(data, "subData");

    if (data.returnedB64) {
      data.product["baseImg"] = data.returnedB64;
    }

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.subProduct,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Sub Product
export const updateSubProducts = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/sub_product/${id}`,
      productData,
      config
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: {},
    });

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    if (data.returnedB64) {
      data.product["baseImg"] = data.returnedB64;
    }

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Sub Product
export const deleteSubProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/admin/product/sub_product/${id}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      Authorization: localStorage.getItem("token"),
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//////////////Categories//////////////////

export const getCategory =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_CATEGORY_REQUEST" });

      // let link = `/api/v1/categories?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      const { data } = await axios.get("/api/v1/categories");

      dispatch({
        type: "ALL_CATEGORY_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALL_CATEGORY_FAIL",
        payload: error.response.data.message,
      });
    }
  };

// Get All CATEGORY For Admin
export const getAdminCategory = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_CATEGORY_REQUEST" });

    const { data } = await axios.get("/api/v1/admin/categories", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    dispatch({
      type: "ADMIN_CATEGORY_SUCCESS",
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: "ADMIN_CATEGORY_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Create Categories
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_CATEGORY_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    const { data } = await axios.post(
      `/api/v1/admin/category/new`,
      categoryData,
      config
    );

    dispatch({
      type: "NEW_CATEGORY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "NEW_CATEGORY_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Update Category
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_CATEGORY_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/category/${id}`,
      categoryData,
      config
    );

    dispatch({
      type: "UPDATE_CATEGORY_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_CATEGORY_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_CATEGORY_REQUEST" });

    const { data } = await axios.delete(`/api/v1/admin/category/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    dispatch({
      type: "DELETE_CATEGORY_SUCCESS",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_CATEGORY_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Get Categories Details
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/v1/category/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    console.log(data, "datad of sd");

    dispatch({
      type: "CATEGORY_DETAILS_SUCCESS",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "CATEGORY_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
