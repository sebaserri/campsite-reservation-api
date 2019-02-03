require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

/**
 * Mongoose connection
 */
const dbURI = process.env.MONGO_URI;
const mongoose = require('mongoose');
mongoose.connect(`${dbURI}`, {useNewUrlParser: true})
  .then(() => {
    console.info('Database connected successfully');
  })
  .catch(err => {
    console.error('Connection FAILED');
  });

/**
 * Express Configuration
 */
const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Express Routing
 */
const reservationRouter = require('../routes/reservation');

app.use('/api/book', reservationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'develop' ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;