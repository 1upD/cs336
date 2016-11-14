import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {firstname: '', lastname: '', years: ''};
  },
  handleFirstnameChange: function(e) {
    this.setState({firstname: e.target.value});
  },
  handleLastnameChange: function(e) {
    this.setState({lastname: e.target.value});
  },
  handleYearsChange: function(e) {
    this.setState({years: e.target.value});
  },
  handleSubmit: function(e) {
  e.preventDefault();
  var firstname = this.state.firstname.trim();
  var lastname = this.state.lastname.trim();
  var years = this.state.years.trim();
  if (!firstname || !lastname || !years) {
    return;
  }
  this.props.onPersonSubmit({firstname: firstname, lastname: lastname, years: years});
  // TODO: send request to the server
  this.setState({firstname: '', lastname: '', years: ''});
},
  render: function() {
    return (
      <div className="personForm">
      <form className="personForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        placeholder="First name"
        value={this.state.firstname}
        onChange={this.handleFirstnameChange}
      />
      <input
        type="text"
        placeholder="Last name"
        value={this.state.lastname}
        onChange={this.handleLastnameChange}
      />
      <input
        type="number"
        placeholder="Years"
        value={this.state.years}
        onChange={this.handleYearsChange}
      />
        <input type="submit" value="Post" />
      </form>
      </div>
    );
  }
});
