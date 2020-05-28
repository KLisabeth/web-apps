const handlers = require('./handlers.js');
const express = require('express');

const router = express.Router();

router.get('/furniture', handlers.readAll);
router.get('/furniture/:id', handlers.readOne);
router.post('/furniture', handlers.create);
router.put('/furniture/:id', handlers.update);
router.delete('/furniture/:id', handlers.delete);

module.exports = router;
