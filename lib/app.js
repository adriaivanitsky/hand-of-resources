const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes

app.use('/api/v1/rocks', require('./controllers/rocks'));
app.use('api/v1/guitars', require('./controllers/guitars'));
pp.use('api/v1/journals', require('./controllers/journals'));
pp.use('api/v1/coffee', require('./controllers/coffee'));
pp.use('api/v1/games', require('./controllers/games'));


// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
