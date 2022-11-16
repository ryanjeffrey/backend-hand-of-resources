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
  })
  .post('/', async (req, res, next) => {
    try {
      const instrument = await Instrument.insert(req.body);
      res.json(instrument);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const instrument = await Instrument.updateById(req.params.id, req.body);
      if (!instrument) next();
      res.json(instrument);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await Instrument.delete(req.params.id);
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
