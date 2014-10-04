/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');

var React = require('react/addons');
var ListGroup = require('react-bootstrap/ListGroup');
var ListGroupItem = require('react-bootstrap/ListGroupItem');

var MailActions = require('../actions/MailActions');
var MailItemHeader = require('./MailItemHeader');

var MailList = React.createClass({
  render: function() {
    return (
      <ListGroup>
        {this.renderMailItems()}
      </ListGroup>
    );
  },

  renderMailItems: function() {
    return _.map(this.props.mails, function(mail) {
      var cx = React.addons.classSet({
        unread: mail.unread
      });

      var header = <MailItemHeader mail={mail} />;

      return (<ListGroupItem key={mail.id} className={cx} header={header} onClick={this.handleClick.bind(this, mail)}>
        <span className="">{mail.subject}</span>
        <span className="text-muted">{mail.body}</span>
      </ListGroupItem>);
    }.bind(this));
  },

  handleClick: function(mail) {
    MailActions.show(mail);
    MailActions.markAsRead(mail);
  }
});

module.exports = MailList;
