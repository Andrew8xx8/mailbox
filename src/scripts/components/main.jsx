/** @jsx React.DOM */

var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('bootstrap/less/bootstrap.less');
require('../../styles/main.css');

var MailboxApp = require('./MailboxApp');
var Inbox = require('./Inbox');
var Highlights = require('./Highlights');
var Spam = require('./Spam');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={MailboxApp}>
      <Route name="inbox" handler={Inbox}/>
      <Route name="highlited" handler={Highlights}/>
      <Route name="important" handler={Inbox}/>
      <Route name="spam" handler={Spam}/>

      <DefaultRoute handler={Inbox}/>
    </Route>
  </Routes>
), document.getElementById('content'));
