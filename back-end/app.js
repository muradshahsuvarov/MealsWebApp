var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const { join } = require('path');
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT || 5000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // E.g. res.render('somepage') will be looked up in the www folder 
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '/public')))// Sets up a path for the static files
app.use(cors());

app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
});


module.exports = app;