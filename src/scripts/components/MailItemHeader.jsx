/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');

var React = require('react/addons');
var ListGroupItem = require('react-bootstrap/ListGroupItem');

var MailActions = require('../actions/MailActions');
var Star = require('./Star');

var MailItem = React.createClass({
  render: function() {
    var mail = this.props.mail;

    return <p>
      <Star mail={mail} />
      <span>{mail.name}</span> &nbsp;&lt;{mail.from}&gt;
      <span className="badge pull-right">{moment(mail.time).format("hh:mm A")}</span>
    </p>;
  },

});

module.exports = MailItem;

