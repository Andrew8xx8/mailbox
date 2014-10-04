/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MailActions = require('../actions/MailActions');
var MailStore = require('../stores/MailStore');

var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var MailList = require('./MailList');
var Sidebar = require('./Sidebar');
var ActiveMail = require('./ActiveMail');

var MailboxApp = React.createClass({
  componentDidMount: function() {
    MailActions.search({});
  },

  render: function() {
    return <div className="container">
      <Row>
        <Col sm={3} md={2}>
          <h2>Mailbox</h2>
        </Col>
        <Col sm={9} md={10}>
        </Col>
      </Row>
      <hr />
      <Row>
        <Sidebar />
        <Col sm={4} md={5}>
          <this.props.activeRouteHandler/>
        </Col>
        <Col sm={4} md={5}>
          <ActiveMail />
        </Col>
      </Row>
    </div>;
  }
});

module.exports = MailboxApp;
