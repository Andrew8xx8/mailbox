/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MailActions = require('../actions/MailActions');
var MailStore = require('../stores/MailStore');

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
      <div className="row">
        <div className="col-sm-3 col-md-2">
          <h2>Mailbox</h2>
        </div>
        <div className="col-sm-9 col-md-10">
        </div>
      </div>
      <hr />
      <div className="row">
        <Sidebar />
        <Col sm={4} md={5}>
          <this.props.activeRouteHandler/>
        </Col>
        <Col sm={4} md={5}>
          <ActiveMail />
        </Col>
      </div>
    </div>;
  }
});

module.exports = MailboxApp;
