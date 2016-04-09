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
  console.log('got to the right preference route');
  db.Preferences().then(function(data) {
    res.send({payload:data});
  })
});

router.get('/:id', function(req, res, next) {
  console.log('got to preference id route');
  db.preference(req.params.id).first().then(function(data) {
    console.log('preference data: ', data);
    res.send({payload:data});
  });
});

router.get('/:id/group', function(req, res, next) {
  console.log('got to group preference route');
  db.preferenceGroup(req.params.id).then(function(data) {
    console.log('preference group data: ', data);
    res.send({payload:data});
  });
});

router.post('/:id/edit', function(req, res, next) {
  console.log('got to post preference route with id and req.body', req.params.id, ' ', req.body);
  db.updatePreference(req.params.id, req.body.data).then(function(data) {
    console.console.log('did the updateActivity', req.body);;
  })
})

module.exports = router;
