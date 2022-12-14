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
  })
  .post('/', async (req, res, next) => {
    try {
      const chicagoBear = await ChicagoBear.insert(req.body);
      res.json(chicagoBear);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const chicagoBear = await ChicagoBear.updateById(req.params.id, req.body);
      if (!chicagoBear) next();
      res.json(chicagoBear);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await ChicagoBear.delete(req.params.id);
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
