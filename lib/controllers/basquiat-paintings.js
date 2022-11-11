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
  });
