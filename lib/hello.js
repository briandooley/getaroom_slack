var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  hello.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var world = req.query && req.query.hello ? req.query.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  hello.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var request = require('request');
    request('https://support-o4bohmdroxumilzlre2tpjgo-live.mbaas2.eu.feedhenry.com/getaroom', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage. 

        var message = '';
        for (i = 0; i < body.length; i++) {
          message = message + res2[i].room + '  -  ' + res2[i].text + '\n';
        }
        res.json({text: message});
      }
    });

      var message = '';
      for (i = 0; i < res2.length; i++) {
        message = message + res2[i].room + '  -  ' + res2[i].text + '\n';
      }
    // see http://expressjs.com/4x/api.html#res.json
    res.json({text: message});
  });

  return hello;
}


module.exports = helloRoute;
