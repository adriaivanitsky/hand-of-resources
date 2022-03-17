const { Router } = require('express');
const Rock = require('../models/Rock');
module.exports = Router()

.post('/', async (req, res) => {
    const rock = await Rock.insert(req.body);
    res.send(rock);
  })