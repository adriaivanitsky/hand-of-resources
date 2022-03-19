const { Router } = require('express');
const Journal = require('../models/Journal');
module.exports = Router()
  .post('/', async (req, res) => {
    const journal = await Journal.insert(req.body);
    res.send(journal);
  })

  .get('/', async (req, res) => {
    const journals = await Journal.findAll();
    res.send(journals);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const journal = await Journal.findById(req.params.id);
      res.send(journal);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const journal = await Journal.update(req.params.id, req.body);
    res.send(journal);
  })

  .delete('/:id', async (req, res) => {
    const journal = await Journal.deleteById(req.params.id);
    res.send(journal);
  });
