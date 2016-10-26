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
app.use('/static/jquery', express.static(__dirname + '/public/forms'));

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// List of people within an organization
var people = [
	{ id: 0, firstname: "Garnet", lastname: "N/A", years: 5750},
	{ id: 1, firstname: "Amethyst", lastname: "N/A", years: 5000},
	{ id: 2, firstname: "Pearl", lastname: "N/A", years: 6000},
	{ id: 3, firstname: "Steven", lastname: "Universe", years: 8}
];

var nextId = 4;

// Function to get a person's record based on their id
function getPerson(id){
return people.filter(
	function(obj){
		if(obj.id == id){
			return obj;
		}
	})[0];
}

// Function to get a person's first and last name based on their id
// Some last names are not applicable
function getName(id){
	person = getPerson(id);
	if(person === null || person === undefined){
		return null;
	}
	return person.firstname + " " + person.lastname;
}

// Functions to get years with organization
function getYears(id){
	person = getPerson(id);
	if(person === null || person === undefined){
		return null;
	}
	return person.years;
}

// Function to send a value as JSON. If value is null, send null instead
function sendJSON(res, value){
  if(value == null){
    res.sendStatus(404);
  } else {
    res.status(HttpStatus.OK).json(value);
  }
}

// Function to remove a person
function deletePerson(id){
  people = people.filter(function(el) { return el.id != id; });
}

// Route /people returns all records
app.get('/people', function (req, res) {
  sendJSON(res, people);
});

app.post('/people/', urlencodedParser, function (req, res) {
  newPerson = req.body;
  newPerson.id = nextId++;
  people.push(newPerson);
  sendJSON(res, newPerson);
});

app.put('/people/', urlencodedParser, function (req, res) {
  newPerson = req.body;
  deletePerson(newPerson.id);
  people.push(newPerson);
  sendJSON(res, newPerson);
});

app.delete('/people/', urlencodedParser, function (req, res) {
  var deletedPerson = getPerson(req.body.id)
  deletePerson(req.body.id);
  sendJSON(res, deletedPerson);
});

// Route /person/id returns one record by id
app.get('/person/:id', function (req, res) {
  var person = getPerson(req.params.id);
  sendJSON(res, person);
});


app.put('/person/:id', urlencodedParser, function (req, res) {
  newPerson = req.body;
  newPerson.id = req.params.id // Make sure the id matches the URL
  deletePerson(newPerson.id);
  people.push(newPerson);
  sendJSON(res, newPerson);
});

app.delete('/person/:id', function (req, res) {
  var deletedPerson = getPerson(req.params.id)
  deletePerson(req.params.id);
  sendJSON(res, deletedPerson);
});

// Route /person/id/name returns a first and last name by id
app.get('/person/:id/name', function (req, res) {
  var name = getName(req.params.id);
  sendJSON(res, name);
});

// Route /person/id/years returns years within organization by id
app.get('/person/:id/years', function (req, res) {
  var years = getYears(req.params.id);
  sendJSON(res, years);
});

// Form to add a person
app.get('/form', function (req, res) {
  res.status(HttpStatus.OK).sendFile(__dirname + '/public/forms/index.html');
});

app.get('/', function (req, res) {
  res.status(HttpStatus.OK).sendFile(__dirname + '/public/forms/index.html');
});

// Any other route should serve a 404 message.
app.get('/*', function(req, res) {
  res.sendStatus(404);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
