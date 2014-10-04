/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MailActions = require('../actions/MailActions');
var MailStore = require('../stores/MailStore');

var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');
var Col = require('react-bootstrap/Col');

var MailList = require('./MailList');
var UnreadBadge = require('./UnreadBadge');
var NavLink = require('./NavLink');

var Sidebar = React.createClass({
  mixins: [Fluxable],
  watchStores: [MailStore],

  getStateFromStores: function() {
    return {
      inbox: MailStore.byCategory("inbox"),
      highlited: MailStore.byCategory("highlited"),
      important: MailStore.byCategory("important"),
      spam: MailStore.byCategory("spam")
    };
  },

  render: function() {
    return <Col sm={3} md={2}>
      <a href="#" className="btn btn-danger btn-sm btn-block" role="button">COMPOSE</a>
      <hr />

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
      </Nav>
    </Col>;
  },
});

module.exports = Sidebar;
