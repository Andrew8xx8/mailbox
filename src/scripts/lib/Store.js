'use strict';

var Events = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/AppDispatcher');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var Store = function(methods) {
  this.dispatchIndex = Dispatcher.register(this._dispatchAction.bind(this));

  _.merge(this, methods);

  this._handlers = {};
  this.dispatcher = Dispatcher;
  this.setMaxListeners(30);
};

_.extend(Store.prototype, Events.prototype);

Store.prototype = _.extend(Store.prototype, {
  _dispatchAction: function(payload){
    var actionType = payload.actionType;
    this.emit(actionType, payload.params);
  },

  registerHandler: function(actionType, cb) {
    this.on(actionType, cb);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = Store;
