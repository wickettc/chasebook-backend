const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/user');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        (username, password, done) => {
            User.findOne({ email: username }, (err, user) => {
                if (err) return done(err);
                // email does not exist
                if (!user) return done(null, false, { msg: 'Incorrect Email' });
                // need to check if password is correct here
                bcrypt.compare(password, user.password, (error, res) => {
                    if (res) {
                        // passwords match
                        return done(null, user);
                    }
                    // passwords do not match
                    return done(null, false, { msg: 'Incorrect Password' });
                });
            });
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        },

        async (token, done) => {
            try {
                return done(null, token);
            } catch (err) {
                done(err);
            }
        }
    )
);
