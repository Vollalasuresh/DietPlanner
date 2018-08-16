const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);

})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true,

}, (req, name, password, done) => {
    User.findOne({ name: name }, (err, user) => {
        if (err) {
            return done(err);

        }
        if (user) {
            req.flash('userExist', 'User Already Registered');
            return done(null, false);
        }
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            if (err) {
                return done(err);
            }
            return done(null, newUser)
        })
    })
}))

passport.use('local.login', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, name, password, done) => {
        User.findOne({ name: name }, (err, usr) => {
            if (err) {
                return done(err)
            }
            if (!usr) {
                req.flash('loginError', "User is not found")
                return done(null, false)
            }
            if (!usr.validPassword(req.body.password, usr)) {
                req.flash('passwordError', 'Invalid Password')
                return done(null, false)
            }

            return done(null, usr)
        })

    }
))