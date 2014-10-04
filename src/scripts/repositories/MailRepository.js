'use strict';

var _ = require('lodash');
var Q = require('q');

function backendLatency() {
  return Math.round(Math.random() * 100);
}

module.exports = {
  search: function(options) {
    var deferred = Q.defer();

    // Эмулируем задержку бекенда
    setTimeout(function() {
      var data = require('./data.json');
      deferred.resolve(data);
    }, backendLatency());

    return deferred.promise;
  },

  destroy: function(mail) {
    var deferred = Q.defer();

    setTimeout(function() {
      deferred.resolve(mail);
    }, backendLatency());

    return deferred.promise;
  },

  markAsRead: function(mail) {
    var deferred = Q.defer();

    setTimeout(function() {
      deferred.resolve(mail);
    }, backendLatency());

    return deferred.promise;
  },

  markAsUnRead: function(mail) {
    var deferred = Q.defer();

    setTimeout(function() {
      deferred.resolve(mail);
    }, backendLatency());

    return deferred.promise;
  },

  removeFrom: function(payload) {
    var deferred = Q.defer();

    setTimeout(function() {
      deferred.resolve(payload);
    }, backendLatency());

    return deferred.promise;
  },

  toggleFavorite: function(mail) {
    var deferred = Q.defer();

    setTimeout(function() {
      deferred.resolve(mail);
    }, backendLatency());

    return deferred.promise;
  },
};
