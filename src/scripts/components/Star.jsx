/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');

var React = require('react/addons');

var MailActions = require('../actions/MailActions');

var Star = React.createClass({
  render: function() {
     var isHighlited = _.contains(this.props.mail.categories, "highlited");
     var isProcessing = this.props.mail.state === "updating_highlight";

     var cx = React.addons.classSet({
       star: true,
       glyphicon: true,
       "glyphicon-star": isHighlited && !isProcessing,
       "glyphicon-star-empty": !isHighlited && !isProcessing,
       "glyphicon-refresh": isProcessing
     });

     return <span className={cx} onClick={this.handleClick}></span>;
  },

  handleClick: function(e) {
    MailActions.toggleHighlight(this.props.mail);
    e.stopPropagation();
  }
});

module.exports = Star;

