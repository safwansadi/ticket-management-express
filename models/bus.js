const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  busImages: [{ img: { type: String, required: true } }],
  capacity: {
    type: Number,
    required: true,
  },
});

function validateBus(bus) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    busImages: Joi.any().allow(null),
    capacity: Joi.number().positive().required(),
  });

  return schema.validate(bus);
}

const Bus = mongoose.model("Bus", busSchema);

exports.busSchema = busSchema;
exports.Bus = Bus;
exports.validate = validateBus;
