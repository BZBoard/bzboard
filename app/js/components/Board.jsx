import React from 'react';
import Reflux from 'reflux';
import BugsList from './BugsList.jsx';
import Filter from '../models/Filter';
import FilterActions from '../actions/FilterActions'
import FilterStore from '../stores/FilterStore';

export default React.createClass({
  mixins: [Reflux.connect(FilterStore, "filters")],

  componentDidMount: function () {
    FilterActions.load();
  },

  _addBugList: function() {
    let filter = new Filter('New bug list', '');
    FilterActions.create(filter);
  },

  _updateFilter: function(uid, name, value) {
    let updatedFilter = Filter.fromData(this.state.filters[uid]);
    if (name) {
      updatedFilter.name = name;
    }
    if (value) {
      updatedFilter.value = value;
    }
    FilterActions.update(updatedFilter);
  },

  _removeFilter: function(uid) {
    FilterActions.remove(uid);
  },

  render: function() {

    let bugLists = [];
    for (let filter of Object.values(this.state.filters)) {
      bugLists.push(<BugsList key={filter.uid} filter={filter}
                              update={this._updateFilter.bind(this, filter.uid)}
                              remove={this._removeFilter.bind(this, filter.uid)}/>);
    }

    return (
      <div className="board">
        <button className="add-buglist" title="Add buglist" onClick={this._addBugList}></button>
        {bugLists}
      </div>
    );
  }
});
