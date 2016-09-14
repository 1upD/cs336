// Person prototype - stores name, birthdate, and list of friends.
function Person(nameString, birthdateString){
	this.name = nameString;
	this.birthdate = birthdateString;
	this.friends = [];
}
Person.prototype.getAge = function(){
	return getAge(this.birthdate);
}
Person.prototype.changeName = function(nameString){
	this.name = nameString;
}
Person.prototype.addFriend = function(friend){
	this.friends.push(friend);
}
Person.prototype.Greet = function(){
	console.log("I'm a person.");
}


// getAge() written by Naveen Jose at jsfiddle.net
// http://jsfiddle.net/codeandcloud/n33RJ/
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
// Student prototype - a person with a major and a different greeting
function Student(name, birthdateString, subjectString){
	Person.call(this, name, birthdateString);
	this.subject = subjectString;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.Greet = function(){
	console.log("I'm a student.");
}

// Test the person prototype with console output

// Make a new person
var person = new Person("Rose", "August 14, 2001");
// Print the person's age - should be 15
console.log(person.getAge());
// Print the person's old name
console.log(person.name);
// Change the person's name
person.changeName("Steven");
// Print the person's new name
console.log(person.name);
// Print a greeting
person.Greet();
// Add a friend
var friend = new Person("Onion", "2011"); // I'm just guessing 2011
person.addFriend(friend);
// Compare age
console.log(person.friends[0].getAge());
// Print list of friends
console.log(person.friends);


// Test the student prototype with console output
var student = new Student("Derek", "November 13, 1994", "Computer Science");
// Print a student greeting
student.Greet();
// How old am I?
console.log(student.getAge());
// What's my major?
console.log(student.subject);
// Is student an instance of Person?
console.log(student instanceof Person);
// Is student an instance of Student?
console.log(student instanceof Student);