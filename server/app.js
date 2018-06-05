const express = require('express');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
require('./databases/mongodb');
const router = require('./config/storage').router;
const logger = require('morgan');
const methodOverride = require('method-override');
const index = require('./routes/index');
const users = require('./routes/users');
const sharedContent = require('./routes/sharedContent');
const chat = require('./routes/chat');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(fileUpload());
//app.use(methodOverride('_method'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.use('/', index);
app.use('/api/users', users);
app.use('/api/users', router);
app.use('/api/public', sharedContent);
app.use('/api/chat', chat);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
