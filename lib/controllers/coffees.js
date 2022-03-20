const { Router } = require('express');
const Coffee = require('../models/Coffee');
module.exports = Router().post('/', async (req, res) => {
  const coffee = await Coffee.insert(req.body);
  res.send(coffee);
});