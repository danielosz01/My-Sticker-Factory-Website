const Product = require("../models/productModel");
const SubProducts = require("../models/subProductModel");
const Category = require("../models/categoriesModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { uploadFile } = require("./s3");
const axios = require("axios");
require("dotenv").config({ path: "config/config.env" });

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const imagesLinks = [];
  // console.log(req.file, "fileData");
  imagesLinks.push({
    url: "https://sticker.appsmaventech.com/api/v1/public/" + req.file.filename,
  });
  req.body.images = imagesLinks;

  console.log(req.user, "user");

  req.body.user = req.user.id;

  // console.log(req.body, "body");
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product: product,
  });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  let returnedB64 = "";

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  if (product.images.length > 0 && product.images[0].url) {
    let text = product.images[0].url;
    let result = text.includes("vividcustsom");

    if (result) {
      let image = await axios.get(product.images[0].url, {
        responseType: "arraybuffer",
      });
      returnedB64 = Buffer.from(image.data).toString("base64");
    }
  }

  res.status(200).json({
    success: true,
    product,
    returnedB64,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let productImageURI = product.images[0] && product.images[0].url;

  const imagesLinks = [];
  if (req.file === undefined) {
    imagesLinks.push({ url: productImageURI && productImageURI });
  } else {
    imagesLinks.push({
      url:
        "https://sticker.appsmaventech.com/api/v1/public/" + req.file.filename,
    });
  }

  req.body.images = imagesLinks;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    // await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//////Categories///////////////

// Get All Product
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const categoriesCount = await Category.countDocuments();

  const apiFeature = new ApiFeatures(Category.find(), req.query);
  // .search()
  // .filter();

  let categories = await apiFeature.query;

  let filteredCategoriesCount = categories.length;

  apiFeature.pagination(resultPerPage);

  categories = await apiFeature.query;

  res.status(200).json({
    success: true,
    categories,
    categoriesCount,
    resultPerPage,
    filteredCategoriesCount,
  });
});

exports.getAdminCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    categories,
  });
});

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const imagesLinks = [];
  // console.log(req.file, "fileData");
  imagesLinks.push({
    url: "/" + req.file.filename,
  });
  req.body.images = imagesLinks;

  req.body.user = req.user.id;

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  // Images Start Here
  let images = [];

  if (req.body.images !== undefined) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      // Deleting Images From Cloudinary
      // for (let i = 0; i < category.images.length; i++) {
      //   await cloudinary.v2.uploader.destroy(category.images[i].public_id);
      // }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await uploadFile(images[i]);

        imagesLinks.push({
          url: result,
        });
      }

      req.body.images = imagesLinks;
    }
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < category.images.length; i++) {
    //await cloudinary.v2.uploader.destroy(category.images[i].public_id);
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category Delete Successfully",
  });
});

exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

//******************** */ Create/Update/Delete/Get Sub Products -- Admin*******************

exports.createSubProduct = catchAsyncErrors(async (req, res, next) => {
  const imagesLinks = [];
  if (req.file) {
    imagesLinks.push({
      url:
        "https://sticker.appsmaventech.com/api/v1/public/" + req.file.filename,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await SubProducts.create(req.body);

  res.status(201).json({
    success: true,
    product: product,
  });
});

// Get All Sub Product
exports.getAllSubProducts = catchAsyncErrors(async (req, res, next) => {
  let products = await Product.findById(req.params.id);
  let subProducts = await SubProducts.find({ productId: req.params.id });
  if (!subProducts && !products) {
    return next(new ErrorHander("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    subProducts,
    productName: products.name,
  });
});

exports.updateSubProduct = catchAsyncErrors(async (req, res, next) => {
  let subProduct = await SubProducts.findById(req.params.id);

  if (!subProduct) {
    return next(new ErrorHander("Product not found", 404));
  }

  let productImageURI = subProduct.images[0].url;
  console.log(req.file, "File");
  const imagesLinks = [];
  if (req.file === undefined) {
    imagesLinks.push({ url: productImageURI });
  } else {
    imagesLinks.push({
      url:
        "https://sticker.appsmaventech.com/api/v1/public/" + req.file.filename,
    });
  }

  req.body.images = imagesLinks;

  subProduct = await SubProducts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    subProduct,
  });
});

exports.getSingleSubProduct = catchAsyncErrors(async (req, res, next) => {
  const subProduct = await SubProducts.findById(req.params.id);

  if (!subProduct) {
    return next(new ErrorHander("Sub Product not found", 404));
  }

  res.status(200).json({
    success: true,
    subProduct: subProduct,
  });
});

exports.deleteSubProduct = catchAsyncErrors(async (req, res, next) => {
  const subProduct = await SubProducts.findById(req.params.id);

  if (!subProduct) {
    return next(new ErrorHander("Sub Product not found", 404));
  }

  await subProduct.remove();

  res.status(200).json({
    success: true,
    message: "Sub Product Delete Successfully",
  });
});
