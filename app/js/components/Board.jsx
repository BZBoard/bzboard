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

  removeBugList: function(uid) {
    FilterActions.remove(uid);
  },

  render: function() {
    let filters = this.props.filters;

    return (
      <div className="board">
        <button className="add-buglist" title="Add buglist" onClick={this._addBugList}></button>
        {filters.map(filter => {
          return <BugsList key={filter.uid} remove={this.removeBugList} filter={filter} bugs={this.state.bugs}/>;
        })}
      </div>
    );
  }
});
