const express = require("express");
const multer = require("multer");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
  getAllCategories,
  createSubProduct,
  getAllSubProducts,
  updateSubProduct,
  deleteSubProduct,
  getSingleSubProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const uploadImage = require("../middleware/image");

const router = express.Router();
router.use("/public", express.static("./uploads/"));

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    uploadImage.upload,
    createProduct
  );

router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    uploadImage.upload,
    updateProduct
  )
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

//  Sub Categories

router
  .route("/admin/product/sub_product")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    uploadImage.upload,
    createSubProduct
  );

router.route("/all/sub_product/:id").get(getAllSubProducts);

router
  .route("/admin/product/sub_product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    uploadImage.upload,
    updateSubProduct
  )
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleSubProduct)

  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSubProduct);

// Categories

router.route("/categories").get(getAllCategories);

router
  .route("/admin/categories")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCategories);

router.route("/admin/category/new").post(
  isAuthenticatedUser,
  authorizeRoles("admin"),

  uploadImage.upload,

  createCategory
);

router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

router.route("/category/:id").get(getCategoryDetails);

module.exports = router;
