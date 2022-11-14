const { Router } = require('express');
const { Car } = require('../models/Car');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const car = await Car.getById(req.params.id);
      if (!car) next();
      res.json(car);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cars = await Car.getAll();
      res.json(cars);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const car = await Car.insert(req.body);
      res.json(car);
    } catch (e) {
      next(e);
    }
  });
