const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const { Bus } = require("../models/bus");
const { BusRoute, validate } = require("../models/busRoute");

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const bus = await Bus.findById(req.body.busId);
  if (!bus) return res.status(400).send("Invalid bus id.");

  const busRoute = new BusRoute({
    route: req.body.route,
    busInfo: {
      _id: bus._id,
      name: bus.name,
      capacity: bus.capacity,
      busImages: bus.busImages,
    },
    date: req.body.date,
    ticketPrice: req.body.ticketPrice,
    seatAvailable: req.body.seatAvailable,
  });
  await busRoute.save();

  res.send(busRoute);
});

router.get("/", auth, async (req, res) => {
  try {
    const busRoutes = await BusRoute.find();
    res.send(busRoutes);
  } catch (ex) {
    res.status(500).send("internal server error");
  }
});

module.exports = router;
