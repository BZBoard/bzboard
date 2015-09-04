import React from 'react';
import { INPUT_CHANGE_DELAY } from '../lib/Constants'
import { debounce } from 'underscore'
import BugsList from './BugsList.jsx'

export default React.createClass({

  propTypes: {
    filter: React.PropTypes.object,
    bugs: React.PropTypes.array,
    changeBugLabel: React.PropTypes.func
  },

  getInitialState: function() {
    let isEditing = this.props.new ? true : false;
    return {
      newFilterValue: this.props.filter.value,
      isEditing: isEditing,
      newFilterName: this.props.filter.name,
    };
  },

  componentWillMount: function() {
    let changeFilterValue = () => {
      this.props.update(null, this.state.newFilterValue);
    }
    this.changeFilterValue = debounce(changeFilterValue, INPUT_CHANGE_DELAY);

    let changeFilterName = () => {
      this.props.update(this.state.newFilterName, null);
    }
    this.changeFilterName = debounce(changeFilterName, INPUT_CHANGE_DELAY);
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
    this.setState({newFilterName: e.target.value});
    this.changeFilterName();
  },

  render: function() {
    const { filter, bugs, changeBugLabel } = this.props;
    let showEdit = () => {
      if (this.state.isEditing) {
        return <div className="edit-filter">
                 <input value={this.state.newFilterValue}
                  onChange={this.onChangeFilterValue} />
                 <button onClick={this.props.remove} className="bugs-column-button bugs-column-remove"></button>
               </div>
      }
    }

    return (
      <div className="bugs-column">
        <input className="buglist-title" value={this.state.newFilterName} onChange={this.onChangeFilterName} />
        {showEdit()}
        <button onClick={this.toggleEditFilter} className="bugs-column-button bugs-column-config"></button>
        <BugsList bugs={bugs} changeBugLabel={changeBugLabel} />
      </div>
    );
  }
});