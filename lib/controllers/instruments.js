const { Router } = require('express');
const { Instrument } = require('../models/Instrument');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const instrument = await Instrument.getById(req.params.id);
      if (!instrument) next();
      res.json(instrument);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const instruments = await Instrument.getAll();
      res.json(instruments);
    } catch (e) {
      next(e);
    }
  });
