//setting up express app
const express = require('express');
const app = express();

const path = require('path');

//Set View DIR
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Our routes
const routes = require('./routes.js');
app.use('/', routes);

// Start our server
app.listen(process.env.PORT || 3000, port => console.log(`Listening on port ${port}`));