const { Router } = require('express');
const { Car } = require('../models/Car');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const cars = await Car.getAll();
      res.json(cars);
    } catch (e) {
      next(e);
    }
  });
