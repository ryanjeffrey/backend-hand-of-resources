const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/basquiat-paintings', require('./controllers/basquiat-paintings'));
app.use('/albums', require('./controllers/albums'));
app.use('/chicago-bears', require('./controllers/chicago-bears'));
app.use('/instruments', require('./controllers/instruments'));
app.use('/cars', require('./controllers/cars'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
