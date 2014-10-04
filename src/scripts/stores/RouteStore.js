'use strict';

var _ = require('lodash');

var RoutesConstants = require('../constants/RoutesConstants');

var Store = require('../lib/Store');

var path = "/records";
var loaded = false;

var RouteStore = new Store({
  path: function() {
    return path;
  },

  isLoaded: function() {
    return loaded;
  }
});

RouteStore.registerHandler(RoutesConstants.SELECT_PAGE, function(payload) {
  path = payload.path;
  loaded = true;

  this.emitChange();
});

module.exports = RouteStore;
