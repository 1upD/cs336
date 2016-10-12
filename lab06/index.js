/*
 * Exercise 6.1
 *
 * a. Only GET can be executed from Chrome. Curl can test GET, POST, PUT, and DELETE. 
 * A browser cannot execute POST, PUT, or DELETE because it would be undesirable for 
 * users to manually send those requests to a remote server.
 * 
 * curl localhost:3000/request
 *
 * curl -X POST localhost:300/request
 *
 * b. 404 - The resource is not found because there is no route to that location.
 *
 * Exercise 6.2
 *
 * a. Forms support GET and POST methods.
 * 
 * b. The data is sent to the server in a url encoded format. Spaces are replaced with +, symbols like @ are replaced as well.
 */

var express = require('express');
var HttpStatus = require('http-status-codes');
var bodyParser = require('body-parser')

var app = express();
app.use('/static', express.static(__dirname + '/public'));
app.use('/static/forms', express.static(__dirname + '/public/forms'));

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/request', function (req, res) {
  res.status(HttpStatus.OK).sendFile(__dirname + '/public/forms/index.html');
});

app.post('/request', urlencodedParser, function (req, res) {
  res.status(HttpStatus.OK).send('Got a POST request!\nName: ' + req.body.user_name + '\nEmail: ' + req.body.user_mail + '\nMessage: ' + req.body.user_message);
});

app.put('/request', function (req, res) {
  res.status(HttpStatus.ACCEPTED).send('Got a PUT request');
});

app.delete('/request', function (req, res) {
  res.status(HttpStatus.ACCEPTED).send('Got a DELETE request');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

