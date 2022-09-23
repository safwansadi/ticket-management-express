const express = require("express");
const path = require("path");
const multer = require("multer");
const { createBus } = require("../controllers/busController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const { Bus } = require("../models/bus");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  [auth, admin],
  upload.array("busImage"), // for storing single image : upload.single('productPicture')
  createBus
);

router.get("/", async (req, res) => {
  const bus = await Bus.find();
  res.send(bus);
});

module.exports = router;
