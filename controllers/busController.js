const { Bus, validate } = require("../models/bus");
const { PORT } = require("../utils/env");

exports.createBus = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, capacity } = req.body;

  let busImages = [];

  if (req.files.length > 0) {
    busImages = req.files.map((file) => {
      return { img: `http://localhost:${PORT}/${file.filename}` };
    });
  }

  const bus = new Bus({
    name,
    busImages,
    capacity,
  });

  await bus.save((error, bus) => {
    if (error) return res.status(400).json({ error });
    if (bus) {
      res.status(201).json({ bus });
    }
  });
};
