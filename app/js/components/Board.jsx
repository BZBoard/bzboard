import React from 'react';
import BugsList from './BugsList.jsx';
import FilterStore from '../stores/FilterStore';
import FilterActions from '../actions/FilterActions'

function getStateFromStore() {
  return {
    filters: FilterStore.getAll()
  }
}

export default React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },

  componentDidMount: function() {
    FilterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FilterStore.removeChangeListener(this._onChange);
  },

  _addBugList: function() {
    FilterActions.create({
      name: 'New bug list',
      value: ''
    });
  },

  render: function() {
    let filters = this.state.filters;

    return (
      <div className="board">
        <button className="add-buglist" onClick={this._addBugList}></button>
        {filters.map(function(filter) {
          return <BugsList key={filter.uid} new="true"/>;
        })}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStore());
  }
});
