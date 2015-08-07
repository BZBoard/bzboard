import React from 'react';
import Reflux from 'reflux';
import BugsList from './BugsList.jsx';
import Filter from '../models/Filter';
import FilterActions from '../actions/FilterActions'
import BugStore from '../stores/BugStore';

export default React.createClass({
  mixins: [Reflux.connect(BugStore, "bugs")],

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
        {filters.map(filter => {
          return <BugsList key={filter.uid} filter={filter} bugs={this.state.bugs} new="true"/>;
        })}
      </div>
    );
  }
});
