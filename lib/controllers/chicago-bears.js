const { Router } = require('express');
const { ChicagoBear } = require('../models/ChicagoBear');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const chicagoBear = await ChicagoBear.getById(req.params.id);
      if (!chicagoBear) next();
      res.json(chicagoBear);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const chicagoBears = await ChicagoBear.getAll();
      res.json(chicagoBears);
    } catch (e) {
      next(e);
    }
  });
