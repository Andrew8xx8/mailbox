/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');
var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MailActions = require('../actions/MailActions');
var MailStore = require('../stores/MailStore');

var ListGroup = require('react-bootstrap/ListGroup');
var ListGroupItem = require('react-bootstrap/ListGroupItem');

var MailList = require('./MailList');
var UnreadBadge = require('./UnreadBadge');
var NavLink = require('./NavLink');

var Star = require('./Star');
var CategoryBadge = require('./CategoryBadge');

var ActiveMail = React.createClass({
  mixins: [Fluxable],
  watchStores: [MailStore],

  getStateFromStores: function() {
    return {
      mail: MailStore.active()
    };
  },

  render: function() {
    console.log('render', this.state.mail);
    if (!this.state.mail) {
      return <div></div>;
    } else {

      var mail = this.state.mail;
      console.log('render', mail.categories);

      return <ListGroup>
        <ListGroupItem key="head">
          <h4>
            <Star mail={mail} />
            {mail.subject}
          </h4>
        </ListGroupItem>

        <ListGroupItem key="meta">
          <span>{mail.name}</span> &nbsp;&lt;{mail.from}&gt;
          <span className="badge pull-right">{moment(mail.time).format("hh:mm A")}</span>
        </ListGroupItem>

        <ListGroupItem key="folders">
          <p>{this.renderCategories(mail)}</p>
        </ListGroupItem>

        <ListGroupItem key="body">
          <p>{mail.body}</p>
        </ListGroupItem>
      </ListGroup>;
    }
  },

  renderCategories: function(mail) {
    return _.map(mail.categories, function(category) {
      return <CategoryBadge key={category} category={category} mail={mail} />;
    });
  }
});

module.exports = ActiveMail;
