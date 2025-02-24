const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/files");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now());
  },
});

exports.upload = multer({ storage: storageConfig });

exports.uploadFile = (req, res, next) => {
  const uploadedFile = req.file;
  const fileUrl =
    req.protocol + "://" + req.get("host") + "/files/" + uploadedFile.filename;

  res.status(201).json({
    file: {
      url: fileUrl,
    },
  });
};
