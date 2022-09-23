const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  busImages: [{ img: { type: String } }],
});

const Bus = mongoose.model("Bus", busSchema);

exports.Bus = Bus;
