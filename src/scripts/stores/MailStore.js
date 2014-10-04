'use strict';

var _ = require('lodash');

var Store = require('../lib/Store');

var MailConstants = require('../constants/MailConstants');

var mails = [];
var loaded = false;
var searchOptions = {};
var active = null;

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

  active: function() {
    return active;
  }
});

RecordStore.registerHandler(MailConstants.SHOW, function(payload) {
  active = payload;

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.SEARCH, function(payload) {
  searchOptions = payload.options;
  loaded = false;

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.SEARCH_SUCCESS, function(payload) {
  mails = payload;
  active = payload[0];
  loaded = true;

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.REMOVE_FROM_CATEGORY, function(payload) {
  var mail = _.find(mails, { id: payload.mail.id });
  mail.state = "removing";

  this.emitChange();
});

RecordStore.registerHandler(MailConstants.REMOVE_FROM_CATEGORY_SUCCESS, function(payload) {
  var mail = _.find(mails, { id: payload.mail.id });
  mail.categories = _.without(mail.categories, payload.category);

  if (mail.categories.length < 1) {
    active = null;
    mails = _.without(mails, mail);
  }

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
    mail.categories = _.without(mail.categories, "highlited");
  } else {
    mail.categories.push("highlited");
  }

  this.emitChange();
});

module.exports = RecordStore;
