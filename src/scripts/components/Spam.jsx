/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MailStore = require('../stores/MailStore');

var MailList = require('./MailList');

var Spam = React.createClass({
  mixins: [Fluxable],
  watchStores: [MailStore],

  getStateFromStores: function() {
    return {
      mails: MailStore.byCategory("spam")
    };
  },

  render: function() {
    return <MailList mails={this.state.mails}/>;
  }
});

module.exports = Spam;
