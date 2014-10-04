'use strict';

var _ = require('lodash');

module.exports = {
  getInitialState: function() {
    return this.getStateFromStores();
  },

  componentDidMount: function() {
    _.forEach(this.watchStores, function(store) {
      store.addChangeListener(this._onChange);
    }.bind(this));

    if (_.isFunction(this.didMount)) { this.didMount(); }
  },

  componentWillUnmount: function() {
    _.forEach(this.watchStores, function(store) {
      store.removeChangeListener(this._onChange);
    }.bind(this));

    if (_.isFunction(this.willUnmount)) { this.willUnmount(); }
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

};
