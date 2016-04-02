var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require(dotenv).load();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ConnectBot' });
});

router.get('/send', function(req, res, next) {
  console.log('KEY: ', GOOGLE_API_KEY);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyA34gNqYa9dpD_u4MCmrWUTi-zbQlSw0yA');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload=function() {
    console.log((xhr.responseText));
  };
  xhr.send(JSON.stringify({'longUrl': 'HTTP://WWW.GOOGLE.COM'
  }));

  // });
})

// var restRequest = gapi.client.urlshortener.url.get({
//   'shortUrl': 'http://goo.gl/fbs5'
// });
// restRequest.execute(function(jsonResponse, rawResponse){
//Handle response
module.exports = router;
