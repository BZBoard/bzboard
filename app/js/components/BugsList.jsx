import React from 'react';
import Reflux from 'reflux'
import { INPUT_CHANGE_DELAY } from '../lib/Constants'
import { debounce } from 'underscore'
import BugsListItem from './BugsListItem.jsx'
import BzClient from '../lib/BzClient.js'
import BugStore from '../stores/BugStore'

export default React.createClass({
  mixins: [Reflux.connectFilter(BugStore, "bugs", function (allBugs) {
    return allBugs[this.props.filter.uid] || {};
  })],

  propTypes: {
    filter: React.PropTypes.object
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
    let showEdit = () => {
      if (this.state.isEditing) {
        return <div className="edit-filter">
                 <input value={this.state.newFilterValue}
                  onChange={this.onChangeFilterValue} />
                 <button onClick={this.props.remove} className="bugs-column-button bugs-column-remove"></button>
               </div>
      }
    }

    let bugs = [];
    for (let bug of Object.values(this.state.bugs)) {
      bugs.push(<BugsListItem key={bug.id} data={bug} />);
    }

    return (
      <div className="bugs-column">
        <h2 contentEditable>{this.props.filter.name}</h2>
        {showEdit()}
        <button onClick={this.toggleEditFilter} className="bugs-column-button bugs-column-config"></button>
        <ul className="cards-list">
          {bugs}
        </ul>
      </div>
    );
  },
});
