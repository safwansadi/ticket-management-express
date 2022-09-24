const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { busRouteSchema } = require("./busRoute");

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    busRouteInfo: {
      type: busRouteSchema,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

function validateBooking(bookingInfo) {
  const schema = Joi.object({
    busRouteId: Joi.objectId().required(),
    bookingStatus: Joi.string().valid("approved", "pending"),
    paymentStatus: Joi.string().valid("paid", "pending"),
    quantity: Joi.number().positive().required(),
  });

  return schema.validate(bookingInfo);
}

const Booking = mongoose.model("Booking", bookingSchema);

exports.Booking = Booking;
exports.validate = validateBooking;
