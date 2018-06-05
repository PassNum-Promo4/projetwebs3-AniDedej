const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is Projet Web Angular Back-end');
});

module.exports = router;
