import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';

module.exports = React.createClass({
  render: function() {
   return (
     <div className="person">
       <h2 className="personFirstname">
         {this.props.firstname} {this.props.lastname}
       </h2>
       <p>{this.props.firstname} {this.props.lastname} has been with this organization
       for {this.props.years} years.</p>
     </div>
   )
  }
});
