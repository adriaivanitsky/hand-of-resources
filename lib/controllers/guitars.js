const { Router } = require('express');
const Guitar = require('../models/Guitar');
module.exports = Router().post('/', async (req, res) => {
  const guitar = await Guitar.insert(req.body);
  res.send(guitar);
});
