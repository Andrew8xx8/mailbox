'use strict';

var _ = require('lodash');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var MailConstants = require('../constants/MailConstants');
var MailRepository = require('../repositories/MailRepository');

var MailStore = require('../stores/MailStore');

function search(options) {
  var searchOptions = options || {};

  searchOptions = _.merge(MailStore.searchOptions(), searchOptions);

  AppDispatcher.handleAction(MailConstants.SEARCH, {
    options: options
  });

  MailRepository.search(options).then(function(mails) {
    AppDispatcher.handleAction(MailConstants.SEARCH_SUCCESS, mails);
  }).fail(function(err) {
    AppDispatcher.handleAction(MailConstants.SEARCH_FAIL, err);
  });
}

function destroy(mail) {
  AppDispatcher.handleAction(MailConstants.DESTROY, mail);

  MailRepository.destroy(mail).then(function(mail) {
    AppDispatcher.handleAction(MailConstants.DESTROY_SUCCESS, mail);
  });
}

function markAsRead(mail) {
  AppDispatcher.handleAction(MailConstants.READ, mail);

  MailRepository.markAsRead(mail).then(function(mail) {
    AppDispatcher.handleAction(MailConstants.READ_SUCCESS, mail);
  });
}

function markAsUnRead(mail) {
  AppDispatcher.handleAction(MailConstants.UNREAD, mail);

  MailRepository.markAsUnRead(mail).then(function(mail) {
    AppDispatcher.handleAction(MailConstants.UNREAD_SUCCESS, mail);
  });
}

function toggleHighlight(mail) {
  AppDispatcher.handleAction(MailConstants.TOGGLE_HIGHLIGHT, mail);

  MailRepository.toggleFavorite(mail).then(function(mail) {
    AppDispatcher.handleAction(MailConstants.TOGGLE_HIGHLIGHT_SUCCESS, mail);
  });
}

module.exports = {
  search: search,
  destroy: destroy,
  markAsUnRead: markAsUnRead,
  markAsRead: markAsRead,
  toggleHighlight: toggleHighlight
};
