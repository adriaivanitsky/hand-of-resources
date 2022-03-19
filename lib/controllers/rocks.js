const { Router } = require('express');
const Rock = require('../models/Rock');
module.exports = Router()
  .post('/', async (req, res) => {
    const rock = await Rock.insert(req.body);
    res.send(rock);
  })

  .get('/', async (req, res) => {
    const rocks = await Rock.findAll();
    res.send(rocks);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const rock = await Rock.findById(req.params.id);
      res.send(rock);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  .patch('/:id', async (req, res) => {
    const rock = await Rock.update(req.params.id, req.body);
    res.send(rock);
  });
