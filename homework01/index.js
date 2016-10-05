var express = require('express');
var app = express();

// Harded coded list of people within an organization
var people = [
	{ id: 0, firstname: "Garnet", lastname: "N/A", years: 5750},
	{ id: 1, firstname: "Amethyst", lastname: "N/A", years: 5000},
	{ id: 2, firstname: "Pearl", lastname: "N/A", years: 6000},
	{ id: 3, firstname: "Steven", lastname: "Universe", years: 8}
];

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
    res.json(value);
  }
}

// Route /people returns all records
app.get('/people', function (req, res) {
  sendJSON(res, people);
});

// Route /person/id returns one record by id
app.get('/person/:id', function (req, res) {
  var person = getPerson(req.params.id);
  sendJSON(res, person);
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

// Any other route should serve a 404 message.
app.get('/*', function(req, res) {
  res.sendStatus(404); 
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log('JSON server app listening on port 3000!');
});

