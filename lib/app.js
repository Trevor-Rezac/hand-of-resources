const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/cars', require('./controllers/car'));
app.use('/api/v1/movies', require('./controllers/movie'));
app.use('/api/v1/books', require('./controllers/book'));
app.use('/api/v1/shows', require('./controllers/show'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
