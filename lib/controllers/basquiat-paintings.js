const { Router } = require('express');
const { BasquiatPainting } = require('../models/BasquiatPainting');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const basquiatPainting = await BasquiatPainting.getById(req.params.id);
      if (!basquiatPainting) next();
      res.json(basquiatPainting);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const basquiatPaintings = await BasquiatPainting.getAll();
      res.json(basquiatPaintings);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const basquiatPainting = await BasquiatPainting.insert(req.body);
      res.json(basquiatPainting);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const basquiatPainting = await BasquiatPainting.updateById(
        req.params.id,
        req.body
      );
      if (!basquiatPainting) next();
      res.json(basquiatPainting);
    } catch (e) {
      next(e);
    }
  });
