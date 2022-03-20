const { Router } = require('express');
const Coffee = require('../models/Coffee');
module.exports = Router()
  .post('/', async (req, res) => {
    const coffee = await Coffee.insert(req.body);
    res.send(coffee);
  })

  .get('/', async (req, res) => {
    const coffees = await Coffee.findAll();
    res.send(coffees);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const coffee = await Coffee.findById(req.params.id);
      res.send(coffee);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const coffees = await Coffee.update(req.params.id, req.body);
    res.send(coffees);
  });
