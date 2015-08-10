import React from 'react';
import { debounce } from 'underscore'
import Filter from '../models/Filter'
import BugsListItem from './BugsListItem.jsx'
import BzClient from '../lib/BzClient.js'
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
      isEditing: isEditing,
      name: this.props.filter.name,
    };
  },

  componentWillMount: function() {
    let changeFilterValue = () => {
      let updatedFilter = Filter.fromData(this.props.filter);
      updatedFilter.value = this.state.newFilterValue;
      FilterActions.update(updatedFilter);
    }
    this.changeFilterValue = debounce(changeFilterValue, 500);

    let changeFilterName = () => {
      let updatedFilter = Filter.fromData(this.props.filter);
      updatedFilter.name = this.state.name;
      FilterActions.update(updatedFilter);
    }
    this.changeFilterName = debounce(changeFilterName, 500);
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

  onChangeFilterName: function(e) {
    this.setState({name: e.target.value});
    this.changeFilterName();
  },

  _removeMe: function() {
    this.props.remove(this.props.filter.uid);
  },

  render: function() {
    let showEdit = () => {
      if (this.state.isEditing) {
        return <div className="edit-filter">
                 <input value={this.state.newFilterValue}
                  onChange={this.onChangeFilterValue} />
                 <button onClick={this._removeMe} className="bugs-column-button bugs-column-remove"></button>
               </div>
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
        <input className="buglist-title" value={this.state.name} onChange={this.onChangeFilterName} />
        {showEdit()}
        <button onClick={this.toggleEditFilter} className="bugs-column-button bugs-column-config"></button>
        <ul className="cards-list">
          {createBugs()}
        </ul>
      </div>
    );
  },
});
