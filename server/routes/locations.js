var express = require('express');
var router = express.Router();
var db = require('../src/db.js');

// var yelp = require('node-yelp');
var dotenv = require('dotenv');
dotenv.load();

router.get('/:id', function(req, res, next) {
  // knex('users').orderBy('name', 'desc')

  db.location(req.params.id).first().then(function(data) {
    console.log('made it to the locations show');
      res.send({payload:data});
  });
});


module.exports = router;
