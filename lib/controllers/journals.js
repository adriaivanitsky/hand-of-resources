const { Router } = require('express');
const Journal = require('../models/Journal');
module.exports = Router().post('/', async (req, res) => {
  const journal = await Journal.insert(req.body);
  res.send(journal);
});
