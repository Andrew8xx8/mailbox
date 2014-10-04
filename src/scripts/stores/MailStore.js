'use strict';

var _ = require('lodash');

var Store = require('../lib/Store');

var MailConstants = require('../constants/MailConstants');

var mails = [];
var loaded = false;
var searchOptions = {};

var RecordStore = new Store({
  all: function() {
    return mails;
  },

  byCategory: function(category) {
    return _.filter(mails, function(mail) {
      return _.contains(mail.categories, category);
    });
  },

  isLoaded: function() {
    return loaded;
  },

  searchOptions: function() {
    return searchOptions;
  },
});

RecordStore.registerHandler(MailConstants.SEARCH, function(payload) {
  searchOptions = payload.options;
  loaded = false;

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.SEARCH_SUCCESS, function(payload) {
  mails = payload;
  loaded = true;

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.DESTROY, function(payload) {
  var mail = _.find(mails, { id: payload.mail.id });
  mail.state = "deleting";

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.DESTROY_SUCCESS, function(payload) {
  var mail = _.find(mails, { id: payload.mail.id });
  mail.category = ['deleted'];

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.READ, function(payload) {
  var mail = _.find(mails, { id: payload.id });
  mail.state = "marking_as_read";

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.READ_SUCCESS, function(payload) {
  var mail = _.find(mails, { id: payload.id });
  mail.unread = false;
  mail.state = "";

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.UNREAD, function(payload) {
  var mail = _.find(mails, { id: payload.id });
  mail.state = "marking_as_unread";

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.UNREAD_SUCCESS, function(payload) {
  var mail = _.find(mails, { id: payload.id });
  mail.unread = true;
  mail.state = "";

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.TOGGLE_HIGHLIGHT, function(payload) {
  var mail = _.find(mails, { id: payload.id });
  mail.state = "updating_highlight";

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.TOGGLE_HIGHLIGHT_SUCCESS, function(payload) {
  var mail = _.find(mails, { id: payload.id });
  mail.state = "";

  if (_.contains(mail.categories, "highlited")) {
    mail.categories = _.remove(mail.categories, "highlited");
  } else {
    mail.categories.push("highlited");
  }

  this.emitChange();
});

module.exports = RecordStore;
