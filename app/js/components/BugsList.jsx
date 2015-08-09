import React from 'react';
import { debounce } from 'underscore'
import BugsListItem from './BugsListItem.jsx';
import BzClient from '../lib/BzClient.js';
import FilterActions from '../actions/FilterActions'

export default React.createClass({
  propTypes: {
    filter: React.PropTypes.object,
    bugs: React.PropTypes.object
  },

  getInitialState: function() {
    let isEditing = this.props.new ? true : false;
    return {
      newFilterValue: this.props.filter.value,
      isEditing: isEditing
    };
  },

  componentWillMount: function() {
    let changeFilterValue = () => {
      let updatedFilter = Object.assign({}, this.props.filter);
      updatedFilter.value = this.state.newFilterValue;
      FilterActions.update(updatedFilter);
    }
    this.changeFilterValue = debounce(changeFilterValue, 500);
  },

  toggleEditFilter: function() {
    this.setState({
      newFilterValue: this.props.filter.value,
      isEditing: !this.state.isEditing
    });
  },

  onChangeFilterValue: function(e) {
    this.setState({newFilterValue: e.target.value});
    this.changeFilterValue();
  },

  render: function() {
    let showEdit = () => {
      if (this.state.isEditing) {
        return <input value={this.state.newFilterValue}
                onChange={this.onChangeFilterValue} className="edit-filter" />
      }
    }

    let createBugs = () => {
      let bugs = [];
      let filterBugs = this.props.bugs[this.props.filter.uid];
      if (filterBugs) {
        for (let bug of Object.values(filterBugs)) {
          bugs.push(<BugsListItem key={bug.id} data={bug} />);
        }
      }
      return bugs;
    }

    return (
      <div className="bugs-column">
        <h2 contentEditable>{this.props.filter.name}</h2>
        {showEdit()}
        <button onClick={this.toggleEditFilter} className="bugs-column-config"></button>
        <ul className="cards-list">
          {createBugs()}
        </ul>
      </div>
    );
  },
});
