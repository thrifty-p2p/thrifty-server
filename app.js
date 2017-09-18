const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();

const AuthMiddleware = require('./auth/middleware')
const auth = require('./auth');
const account = require('./api/account');
const product = require('./api/product');
const signS3 = require('./api/s3bucket');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(AuthMiddleware.checkTokenSetUser);
app.use('/api/auth', auth);
app.use('/api/account', account);
app.use('/api/product', product);
app.use('/api/sign-s3', signS3);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
