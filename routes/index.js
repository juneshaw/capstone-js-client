var express = require('express');
var router = express.Router();
var mailcomposer = require('mailcomposer');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// require('dotenv').load();
var dotenv = require('dotenv');
dotenv.load();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ConnectBot' });
});

// Worked with shortUrl successfully
//
// router.get('/send', function(req, res, next) {
//   console.log('KEY: ', process.env.GOOGLE_API_KEY);
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key='+process.env.GOOGLE_API_KEY);
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.onload=function() {
//     console.log((xhr.responseText));
//   };
//   xhr.send(JSON.stringify({'longUrl': 'HTTP://WWW.GOOGLE.COM'
//   }));

// Attempting gmail unsuccessfully
//
// router.get('/send', function(req, res, next) {
//   var mail = mailcomposer({from:'june.shaw@me.com', to:'june.shaw@me.com',text:'hi there'});
//   var message;
//   mail.build(function(err, message) {
//     process.stdout.write(message);
//   });
//
//   console.log('KEY: ', process.env.GOOGLE_API_KEY);
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST',
//     'https://www.googleapis.com/gmail/v1/users/me/drafts/?key='+process.env.GOOGLE_API_KEY);
//
//
//
//   //  'https://www.googleapis.com/gmail/v1/users/'+process.env.GOOGLE_MAIL+'drafts/?key='+process.env.GOOGLE_API_KEY);
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.onload=function() {
//     console.log((xhr.responseText));
//   };
//   xhr.send(JSON.stringify(
//     {'message':
//       {raw: "e2Zyb206anVuZS5zaGF3QG1lLmNvbSwgdG86anVuZS5zaGF3QG1lLmNvbSx0ZXh0OmhpIHRoZXJlfQo"}
//     }
//   ));
// });

  // });
// })

// var restRequest = gapi.client.urlshortener.url.get({
//   'shortUrl': 'http://goo.gl/fbs5'
// });
// restRequest.execute(function(jsonResponse, rawResponse){
//Handle response

// Textbelt

router.get('/send', function(req, res, next) {

  var text = require('textbelt');

  var opts = {
    fromAddr: 'june.shaw@me.com',  // "from" address in received text
    fromName: 'June Shaw',       // "from" name in received text
    region:   'us',              // region the receiving number is in: 'us', 'canada', 'intl'
    subject:  'test'        // subject of the message
  }
  console.log('opts: ', opts);
  text.sendText('3037264083', 'A sample text message!', opts, function(err) {
    if (err) {
      console.log(err);
    }
  });
});

router.get('/twsend', function(req, res, next) {
  // Load the twilio module
  var twilio = require('twilio');

  // Create a new REST API client to make authenticated requests against the
  // twilio back end
  var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  // Pass in parameters to the REST API using an object literal notation. The
  // REST client will handle authentication and response serialzation for you.
  client.sms.messages.create({
      to:'+13037264083',
      from:process.env.TWILIO_NUMBER,
      body:'ahoy hoy! Testing Twilio and node.js'
  }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);

          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log('Oops! There was an error.');
          console.log('Error: ', error);
      }
  });
});

router.get('/receive', function(req, res, next) {
  console.log('Received a message from Twilio: ');
  console.log('res: ', res.params.body);
  // console.log('res: ', res);
  // console.log('next: ', next);
});

module.exports = router;
