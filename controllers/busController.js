const { Bus } = require("../models/bus");
const { PORT } = require("../utils/env");

exports.createBus = async (req, res) => {
  const { name } = req.body;

  let busImages = [];

  if (req.files.length > 0) {
    busImages = req.files.map((file) => {
      return { img: `http://localhost:${PORT}/${file.filename}` };
    });
  }

  const bus = new Bus({
    name,
    busImages,
  });

  await bus.save((error, bus) => {
    if (error) return res.status(400).json({ error });
    if (bus) {
      res.status(201).json({ bus });
    }
  });
};
