//setting up express app
const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');


//Mongo Access
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI,{
    auth:{
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.error(`Error: ${err}`));

//Implement Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//setup session
const passport = require('passport');
const session = require('express-session');
app.use(session({
    secret: 'any salty secret here',
    resave: true,
    saveUninitialized: false
}));

//setting up passport
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//setting up passport jwt
const JwtStrategy = require('passport-jwt').Strategy;
const opts = {};
opts.jwtFromRequest = function(req){
    const token = (req && req.cookies) ? req.cookies
    ['token'] : null;
    return token;
}
opts.secretOrKey = 'superSecretSaltKey';
passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, done)
 {
     User.findOne({id: jwt_payload.sub}, function(err,user){
         if(err) return done (err, false);
         if(user) return done (null, user);
         return done(null, false);
     });
 }));



//Set View DIR
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//assets
app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));
app.use('/images', express.static('assets/images'));

//setup flash notification
const flash = require ('connect-flash');
app.use(flash());
app.use('/', (req, res,next) => {
    //setting default locals
    res.locals.pageTitle = "Untitled";
    //passing along flash message

    res.locals.flash = req.flash();
    res.locals.formData = req.session.formData || {};
    //console.log(res.locals.flash);
    req.session.formData = {};



    //Authentication Helper
    res.locals.authorized = req.isAuthenticated();
    if (res.locals.authorized) res.locals.email = req.session.passport.user;
    next();
});

//Our routes
const routes = require('./routes.js');
app.use('/', routes);

app.get('/test', (req, res) => {
    res.status(200).json({message: 'Hello World'});
  });
  
const clientRoot = path.join(__dirname, '/client/build');
app.use((req, res, next) =>{
    if( req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
        res.sendFile('index.html', {clientRoot});
    } else next();
});

// Start our server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))


