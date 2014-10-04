/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var {Link, ActiveState} = require('react-router');

var NavLink = React.createClass({
  mixins: [ActiveState],

  getInitialState: function() {
    return {
      isActive: false
    };
  },

  updateActiveState: function () {
    this.setState({
      isActive: Link.isActive(this.props.route)
    });
  },

  render: function() {
    var cx = React.addons.classSet({
      active: this.state.isActive
    });

    return (<li className={cx}>
      <Link to={this.props.route}>{this.props.children}</Link>
    </li>);
  }
});

module.exports = NavLink;
