  const router = require('express').Router();

// Our resource routes
(require('./routes/pages'))(router);
(require('./routes/blogs'))(router);
(require('./routes/users'))(router);

module.exports = router;