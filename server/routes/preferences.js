var express = require('express');
var router = express.Router();
var db = require('../src/db.js');
// var mailcomposer = require('mailcomposer');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// require('dotenv').load();
var dotenv = require('dotenv');
dotenv.load();

/* GET index page. */
router.get('/', function(req, res, next) {
  db.Categories().then(function(data) {
    res.send({payload:data});
  })
});

router.get('/:id', function(req, res, next) {
  db.category(req.params.id).first().then(function(data) {
    res.send({payload:data});
  });
});

module.exports = router;
