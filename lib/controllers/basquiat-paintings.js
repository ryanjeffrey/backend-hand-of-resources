const { Router } = require('express');
const { BasquiatPainting } = require('../models/BasquiatPainting');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const basquiatPainting = await BasquiatPainting.getById(req.params.id);
    res.json(basquiatPainting);
  })
  .get('/', async (req, res) => {
    const basquiatPaintings = await BasquiatPainting.getAll();
    res.json(basquiatPaintings);
  })
  .post('/', async (req, res, next) => {
    try {
      const basquiatPainting = await BasquiatPainting.insert(req.body);
      res.json(basquiatPainting);
    } catch (e) {
      next(e);
    }
  });
