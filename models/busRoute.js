const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { busSchema } = require("./bus");

const busRouteSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
  },
  busInfo: {
    type: busSchema,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  seatAvailable: {
    type: Number,
    required: true,
  },
});

function validateBusRoute(bus) {
  const schema = Joi.object({
    route: Joi.string().min(10).max(255).required(),
    busId: Joi.objectId().required(),
    date: Joi.string(),
    ticketPrice: Joi.number().positive().required(),
    seatAvailable: Joi.number().positive().required(),
  });

  return schema.validate(bus);
}

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

exports.busRouteSchema = busRouteSchema;
exports.BusRoute = BusRoute;
exports.validate = validateBusRoute;
