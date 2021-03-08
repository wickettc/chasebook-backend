require('dotenv').config();
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.login_post = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ msg: 'something did not work' });
        }
        req.login(user, { session: false }, (error) => {
            if (error) res.send(error);
            const token = jwt.sign({ user }, process.env.SECRET, {
                expiresIn: '1d',
            });
            return res.json({ user, token });
        });
    })(req, res);
};

exports.signup_post = [
    body('firstname')
        .isLength({ min: 1 })
        .withMessage('First name is required'),
    body('lastname').isLength({ min: 1 }).withMessage('Last name is required'),
    body('username').custom((value) =>
        User.findOne({ username: value })
            .exec()
            .then((user) => {
                if (user) {
                    return Promise.reject(
                        new Error('Username is already in use')
                    );
                }
            })
    ),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
    body('passwordconfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //////// return errors here
            // res.render('sign_up', { errors: errors.array() });
            // return;
        }

        bcrypt.hash(req.body.password, 10, (error, hashedPW) => {
            new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPW,
            }).save((err) => {
                if (err) return next(err);
                ////////////// do something here when successful
                // res.redirect('/');
            });
        });
    },
];
