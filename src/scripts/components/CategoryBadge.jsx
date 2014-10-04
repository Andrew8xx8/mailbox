/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');

var React = require('react/addons');

var MailActions = require('../actions/MailActions');

var Star = React.createClass({
  render: function() {
    return <span className="label label-danger">
      {this.props.category}&nbsp;
      <span className="glyphicon glyphicon-remove" onClick={this.handleClick}></span>
    </span>;
  },

  handleClick: function() {
    MailActions.removeFromCategory(this.props);
  }
});

module.exports = Star;

