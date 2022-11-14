const { Router } = require('express');
const { Instrument } = require('../models/Instrument');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const instruments = await Instrument.getAll();
      res.json(instruments);
    } catch (e) {
      next(e);
    }
  });
