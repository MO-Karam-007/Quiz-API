var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var authRouter = require('./routes/auth/auth.route');
var quizRouter = require('./routes/quizes/quiz.route');
var questionRouter = require('./routes/Questions/questions.route');
var answerRouter = require('./routes/answers/answers.Route');
var scoreRouter = require('./routes/score/score.routes');
var dashboardRouter = require('./routes/dashboard/dashboard.routes');
var archiveRouter = require('./routes/archive/archive.routes');
var qrRouter = require('./routes/qr/qr.Route');
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// For parsing application/json
app.use(express.json());
app.use(cors());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/v1', authRouter);
app.use('/v1', archiveRouter);
app.use('/v1', quizRouter);
app.use('/v1', questionRouter);
app.use('/v1', answerRouter);
app.use('/v1', scoreRouter);
app.use('/v1', dashboardRouter);
app.use('/v1', qrRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
