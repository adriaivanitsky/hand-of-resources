const { Router } = require('express');
const Guitar = require('../models/Guitar');
module.exports = Router()
  .post('/', async (req, res) => {
    const guitar = await Guitar.insert(req.body);
    res.send(guitar);
  })

  .get('/', async (req, res) => {
    const guitars = await Guitar.findAll();
    res.send(guitars);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const guitar = await Guitar.findById(req.params.id);
      res.send(guitar);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const guitar = await Guitar.update(req.params.id, req.body);
    res.send(guitar);
  });
