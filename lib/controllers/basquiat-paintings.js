const { Router } = require('express');
const { BasquiatPainting } = require('../models/BasquiatPainting');

module.exports = Router()
  .get('/', async (req, res) => {
    const basquiatPaintings = await BasquiatPainting.getAll();
    res.json(basquiatPaintings);
  });
