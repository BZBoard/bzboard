import React from 'react';
import { connect } from 'react-redux';
import { getFilters, createFilter, updateFilter, removeFilter } from '../actions';
import BugsList from './BugsList.jsx';
import Filter from '../models/Filter';

let Board = React.createClass({

  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(getFilters());
  },

  _addBugList: function() {
    const { dispatch } = this.props;
    let filter = new Filter('New bug list', '');
    dispatch(createFilter(filter));
  },

  _updateFilter: function(uid, name, value) {
    const { filters, dispatch } = this.props;
    let updatedFilter = Filter.fromData(filters[uid]);
    if (name) {
      updatedFilter.name = name;
    }
    if (value) {
      updatedFilter.value = value;
    }
    dispatch(updateFilter(updatedFilter));
  },

  _removeFilter: function(uid) {
    const { dispatch } = this.props;
    dispatch(removeFilter(uid));
  },

  render: function() {
    const { filters, bugsByFilter } = this.props;
    let bugLists = [];
    for (let filter of Object.values(filters)) {
      bugLists.push(<BugsList key={filter.uid} filter={filter} bugs={bugsByFilter[filter.uid]}
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

function mapStoreStateToProps(state) {
  const { filters, bugsByFilter } = state;
  return {
    filters,
    bugsByFilter
  };
}

export default connect(mapStoreStateToProps)(Board);
