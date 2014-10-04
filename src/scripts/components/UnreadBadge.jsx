/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var React = require('react/addons');

var UnreadBadge = React.createClass({
  render: function() {
    var length = _.filter(this.props.mails, "unread").length;

    if (length > 0) {
      return <span className="badge pull-right">{length}</span>;
    } else {
      return <span></span>;
    }
  },
});

module.exports = UnreadBadge;
