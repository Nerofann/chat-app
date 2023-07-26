var createError = require('http-errors');
var express     = require('express');
var path        = require('path');
var cookieParser= require('cookie-parser');
var logger      = require('morgan');
var session     = require('express-session');
var flash       = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app         = express();
var db          = require('./mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneMinute = 1000 * 60 * 60;
app.use(session({
  secret: 'thisismysecretkeyfaniannur',
  cookie: {maxAge: oneMinute},
  saveUninitialized: true,
  resave: false
}));

app.use(flash());

//Route
app.use(function(req, res, next) {
  res.locals.db = db;
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // res.render('404');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;