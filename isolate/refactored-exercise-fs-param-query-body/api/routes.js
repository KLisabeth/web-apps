const handlers = require('./handlers.js');
const express = require('express');

// create the router
const router = express.Router();

router.use((req, res, next) => {
  console.log('routes!');
  next();
});

router.get('/', (req, res) => {
  res.send('routes!');
});

// write the routes!
router.post('/param/:value', handlers.postParams);

router.post('/query', handlers.postQuery);

router.post('/body', handlers.postBody);

module.exports = router;
