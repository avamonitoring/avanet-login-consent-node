var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var setCookieParser = require('set-cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');

var routes = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var consent = require('./routes/consent');
var kratos = require('./routes/kratos');
var error = require('./routes/errors');
var recover = require('./routes/recover');
var password = require('./routes/password');

var app = express();
app.use(cors({
    credentials: true,
}));

// Make some process env variables available to all templates
app.use((req, res, next) => {
  res.locals.selfURL = process.env.SELF_URL;
  //var host = new URL(req.header('referer')).hostname;
  //res.locals.host = host.substring(0, host.indexOf('.'));
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'public');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use('/consent', consent);
app.use('/kratos', kratos);
app.use('/errors', error);
app.use('/recover', recover);
app.use('/password', password);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
