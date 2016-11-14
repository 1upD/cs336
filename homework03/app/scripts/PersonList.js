import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';

import Person from './Person.js'

module.exports =  React.createClass({
  render: function() {
  var personNodes = this.props.data.map(function(person) {
    return (
      <Person firstname={person.firstname} lastname={person.lastname} years={person.years} key={person.id}>
        {person.years}
      </Person>
    );
  });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});
