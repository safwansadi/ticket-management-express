const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const { BusRoute } = require("../models/busRoute");
const { Booking, validate } = require("../models/booking");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const busRoute = await BusRoute.findById(req.body.busRouteId);
    if (!busRoute) return res.status(400).send("Invalid Bus Router id.");

    if (busRoute.seatAvailable < req.body.quantity)
      return res.status(400).send("no seat available");

    const booking = new Booking({
      customerId: req.user._id,
      busRouteInfo: {
        _id: busRoute._id,
        route: busRoute.route,
        busInfo: busRoute.busInfo,
        date: busRoute.date,
        ticketPrice: busRoute.ticketPrice,
        seatAvailable: busRoute.seatAvailable,
      },
      quantity: req.body.quantity,
    });

    await booking.save();

    res.send(booking);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("internal server error");
  }
});

router.get("/all-bookings-history", [auth, admin], async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("internal server error");
  }
});

router.get("/user-booking-history", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user._id });
    res.send(bookings);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("internal server error");
  }
});

router.put("/approve-booking/:id", [auth, admin], async (req, res) => {
  const bookinInfo = await Booking.findOne({ _id: req.params.id });

  const busRouteId = bookinInfo.busRouteInfo._id;

  await BusRoute.findByIdAndUpdate(busRouteId, {
    $inc: { seatAvailable: -bookinInfo.quantity },
  });

  const booking = await Booking.findByIdAndUpdate(req.params.id, {
    paymentStatus: req.body.paymentStatus,
    bookingStatus: req.body.bookingStatus,
  });

  if (!booking)
    return res
      .status(404)
      .send("The booking info with the given ID was not found.");

  res.send(booking);
});

module.exports = router;
