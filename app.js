//setting up express app
const express = require('express');
const app = express();

const path = require('path');

//Set View DIR
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('dotenv').config();

//assets
app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));
app.use('/images', express.static('assets/images'));

//Mongo Access
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI,{

    auth:{
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error(`Error: ${err}`));

//Implement Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Our routes
const routes = require('./routes.js');
app.use('/', routes);

// Start our server
app.listen(process.env.PORT || 3000, port => console.log(`Listening on port ${port}`));