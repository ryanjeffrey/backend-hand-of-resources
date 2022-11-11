const { Router } = require('express');
const { Album } = require('../models/Album');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const album = await Album.getById(req.params.id);
      if (!album) next();
      res.json(album);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const albums = await Album.getAll();
      res.json(albums);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const album = await Album.insert(req.body);
      res.json(album);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const album = await Album.updateById(
        req.params.id,
        req.body
      );
      if (!album) next();
      res.json(album);
    } catch (e) {
      next(e);
    }
  });
