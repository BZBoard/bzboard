import React from 'react';
import BugsList from './BugsList.jsx';
import Filter from '../models/Filter';
import FilterActions from '../actions/FilterActions'

export default React.createClass({
  propTypes: {
    filters: React.PropTypes.array
  },

  componentDidMount: function () {
    FilterActions.load();
  },

  _addBugList: function() {
    FilterActions.create(new Filter('New bug list', ''));
  },

  render: function() {
    let filters = this.props.filters;

    return (
      <div className="board">
        <button className="add-buglist" onClick={this._addBugList}></button>
        {filters.map(function(filter) {
          return <BugsList key={filter.uid} new="true"/>;
        })}
      </div>
    );
  }
});
