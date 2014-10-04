/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var React = require('react/addons');

var Fluxable = require('../behaviors/Fluxable');
var MailStore = require('../stores/MailStore');

var TotalCount = React.createClass({
  mixins: [Fluxable],
  watchStores: [MailStore],

  getStateFromStores: function() {
    return {
      all: MailStore.all()
    };
  },

  render: function() {
    var unread = _.filter(this.state.all, "unread").length;

    return <span className="label label-default center-block">{unread} / {this.state.all.length}</span>;
  },
});

module.exports = TotalCount;
