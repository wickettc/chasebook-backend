require('dotenv').config();
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.login_post = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json(info);
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
    body('email')
        .isEmail()
        .normalizeEmail()
        .custom((value) =>
            User.findOne({ email: value })
                .exec()
                .then((user) => {
                    if (user) {
                        return Promise.reject(
                            new Error('Email is already in use')
                        );
                    }
                })
        ),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
    body('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() });
            return;
        }

        bcrypt.hash(req.body.password, 10, (error, hashedPW) => {
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPW,
            });
            newUser.save((err) => {
                if (err) return next(err);
                res.json({ msg: 'Signup Successful', newUser });
            });
        });
    },
];
