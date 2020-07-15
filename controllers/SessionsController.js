const User = require('../models/user');
const passport = require('passport');
const viewPath = 'sessions';

exports.new = (req, res) => {
    res.render(`${viewPath}/new`,{
        pageTitle: 'Login'
    });
};

exports.create = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/blogs',
        successFlash: 'You Were Successfully Login. ',
        failureRedirect: '/login',
        failureFlash: 'Invalid Credentials'
    })(req, res, next);
};

exports.delete = (req, res) => {
    req.logout();
    req.flash('Success', 'You are Logout Successfully.');
    res.redirect('/');
}