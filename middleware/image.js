const multer = require("multer");
const path = require("path");
// functions for uploading a user's single picture/file
const Storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, callback) => {
    if (file) {
      return callback(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    }
  },
  limits: {
    fileSize: 100000000,
  },

  fileFilter(req, file, callback, next) {
    if (!file.originalname.match(/\.(jpeg|png|jpg|JPEG|PNG|JPG)$/))
      return callback(new Error("File format is not supported"));
    callback(undefined, true);
  },
});

// exporting the function to the route
module.exports.upload = multer({
  storage: Storage,
}).single("images");
