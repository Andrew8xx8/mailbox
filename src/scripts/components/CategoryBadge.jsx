/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');

var React = require('react/addons');

var MailActions = require('../actions/MailActions');

var Star = React.createClass({
  render: function() {
    var isProcessing = this.props.mail.state === "removing";

    var cx = React.addons.classSet({
      label: true,
      "label-danger": !isProcessing,
      "label-default": isProcessing
    });

    return <span className={cx}>
      {this.props.category}&nbsp;
      <span className="glyphicon glyphicon-remove" onClick={this.handleClick}></span>
    </span>;
  },

  handleClick: function() {
    MailActions.removeFromCategory(this.props);
  }
});

module.exports = Star;

