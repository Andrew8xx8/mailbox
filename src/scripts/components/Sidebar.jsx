/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MailStore = require('../stores/MailStore');

var Nav = require('react-bootstrap/Nav');
var Col = require('react-bootstrap/Col');

var UnreadBadge = require('./UnreadBadge');
var NavLink = require('./NavLink');
var TotalCount = require('./TotalCount');

var Sidebar = React.createClass({
  mixins: [Fluxable],
  watchStores: [MailStore],

  getStateFromStores: function() {
    return {
      inbox: MailStore.byCategory("inbox"),
      highlited: MailStore.byCategory("highlited"),
      important: MailStore.byCategory("important"),
      spam: MailStore.byCategory("spam"),
      all: MailStore.all()
    };
  },

  render: function() {
    return <Col sm={3} md={2}>
      <TotalCount />

      <br />

      <Nav bsStyle={'pills'} activeKey={1} stacked={true}>
        <NavLink route="inbox">
          <UnreadBadge mails={this.state.inbox} />
          Inbox
        </NavLink>

        <NavLink route="highlited">
          <UnreadBadge mails={this.state.highlited} />
          Highlights
        </NavLink>

        <NavLink route="important">
          <UnreadBadge mails={this.state.important} />
          Important
        </NavLink>

        <NavLink route="spam">
          <UnreadBadge mails={this.state.spam} />
          Spam
        </NavLink>

        <NavLink route="all">
          <UnreadBadge mails={this.state.all} />
          All mail
        </NavLink>
      </Nav>

    </Col>;
  },
});

module.exports = Sidebar;
