import React from 'react';
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

  toggleEditFilter: function() {
    this.setState({
      newFilterValue: this.props.filter.value,
      isEditing: !this.state.isEditing
    });
  },

  changeFilter: function(e) {
    if (e.keyCode == 13) { //Enter key
      let updatedFilter = Object.assign({}, this.props.filter);
      updatedFilter.value = this.state.newFilterValue;
      FilterActions.update(updatedFilter);
    }
  },

  onChangeFilterValue: function(e) {
    this.setState({newFilterValue: e.target.value});
  },

  render: function() {
    let showEdit = () => {
      if (this.state.isEditing) {
        return <div className="edit-filter">
                 <input value={this.state.newFilterValue}
                 onChange={this.onChangeFilterValue}
                 onKeyDown={this.changeFilter} />
                 <button onClick={this.remove} className="bugs-column-button bugs-column-remove"></button>
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
        <h2 contentEditable>{this.props.filter.name}</h2>
        {showEdit()}
        <button onClick={this.toggleEditFilter} className="bugs-column-button bugs-column-config"></button>
        <ul className="cards-list">
          {createBugs()}
        </ul>
      </div>
    );
  },
});
