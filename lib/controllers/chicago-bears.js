const { Router } = require('express');
const { ChicagoBear } = require('../models/ChicagoBear');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const chicagoBears = await ChicagoBear.getAll();
      res.json(chicagoBears);
    } catch (e) {
      next(e);
    }
  });
