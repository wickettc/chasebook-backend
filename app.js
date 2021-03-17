const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

require('./passport/passport');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const likeRouter = require('./routes/like');

const app = express();

const mongoDBUrl = `mongodb+srv://admin:${process.env.MONGOPW}@cluster0.ekyc8.mongodb.net/chasebook?retryWrites=true&w=majority`;
mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/post', passport.authenticate('jwt', { session: false }), postRouter);
app.use(
    '/comment',
    passport.authenticate('jwt', { session: false }),
    commentRouter
);
app.use('/like', passport.authenticate('jwt', { session: false }), likeRouter);

// error handler
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).json(message);
});

module.exports = app;
