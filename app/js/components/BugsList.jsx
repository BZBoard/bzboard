import React from 'react';
import { INPUT_CHANGE_DELAY } from '../lib/Constants'
import { debounce } from 'underscore'
import BugsListItem from './BugsListItem.jsx'

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
      this.props.update(null, this.state.newFilterValue);
    }
    this.changeFilterValue = debounce(changeFilterValue, INPUT_CHANGE_DELAY);
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
    const { filter, bugs } = this.props;
    let showEdit = () => {
      if (this.state.isEditing) {
        return <div className="edit-filter">
                 <input value={this.state.newFilterValue}
                  onChange={this.onChangeFilterValue} />
                 <button onClick={this.props.remove} className="bugs-column-button bugs-column-remove"></button>
               </div>
      }
    }

    let bugsItems = [];
    for (let bug of bugs) {
      bugsItems.push(<BugsListItem key={bug.id} data={bug} />);
    }

    return (
      <div className="bugs-column">
        <h2 contentEditable>{filter.name}</h2>
        {showEdit()}
        <button onClick={this.toggleEditFilter} className="bugs-column-button bugs-column-config"></button>
        <ul className="cards-list">
          {bugsItems}
        </ul>
      </div>
    );
  },
});
