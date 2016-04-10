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
  db.Preferences().then(function(data) {
    res.send({payload:data});
  })
});

router.get('/:id', function(req, res, next) {
  db.preference(req.params.id).first().then(function(data) {
    res.send({payload:data});
  });
});

router.get('/:id/group', function(req, res, next) {
  db.preferenceGroup(req.params.id).then(function(data) {
    res.send({payload:data});
  });
});

router.get('/:id/categories', function(req, res, next) {
  db.preferenceCategories(req.params.id).then(function(data) {
    res.send({payload:data});
  })
});

router.post('/:id/times/edit', function(req, res, next) {
  var jsonObj = JSON.parse(req.body.json);
  db.updatePreference(req.params.id,
    {time: jsonObj.time,
      day: jsonObj.day,
      periodicity: jsonObj.periodicity}).then(function(data) {
  })
})


router.post('/:id/categories/insert', function(req, res, next) {
  var jsonObj = JSON.parse(req.body.json);
  console.log('jsonObj for cat insert: ', jsonObj);
  db.insertPreference_Category(
    {preference_id: req.params.id,
      category_id: jsonObj.category_id}).then(function(data) {
        console.log('LEAVE posted prefcat insert');
  })
})

router.get('/:id/categories/delete', function(req, res, next) {
  console.log('********in the pref category delete route with id of ', req.params.id);

  db.deletePreference_CategoryByPreference(req.params.id).then(function(data) {
    console.log('***** inside router delete data: ', data);
    res.send({payload:data});
      // console.log('LEAVE done with deletePC, ', data);
  })
})

module.exports = router;
