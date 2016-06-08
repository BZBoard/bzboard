import React from 'react';
import BugsList from './BugsList.jsx'
import { DropTarget } from 'react-dnd';
import { INPUT_CHANGE_DELAY } from '../lib/Constants'
import { debounce } from 'underscore'
import { draggableTypes } from '../lib/Constants';

const columnTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    return { label: null };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect (connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

let filterColumn = React.createClass({
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
      this.props.updateFilterValue(this.state.newFilterValue);
    }
    this.changeFilterValue = debounce(changeFilterValue, INPUT_CHANGE_DELAY);

    let changeFilterName = () => {
      this.props.updateFilterName(this.state.newFilterName);
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
    const { filter, bugs, changeBugLabel, connectDropTarget } = this.props;
    let showEdit = () => {
      if (this.state.isEditing) {
        return <div className="edit-filter">
                 <input value={this.state.newFilterValue}
                  onChange={this.onChangeFilterValue} />
                 <button onClick={this.props.remove} className="bugs-column-button bugs-column-remove"></button>
               </div>
      }
    }

    return connectDropTarget(
      <div className="bugs-column">
        <input className="buglist-title" value={this.state.newFilterName} onChange={this.onChangeFilterName} />
        {showEdit()}
        <button onClick={this.toggleEditFilter} className="bugs-column-button bugs-column-config"></button>
        <BugsList bugs={bugs} changeBugLabel={changeBugLabel} />
      </div>
    );
  }
});

export default DropTarget(draggableTypes.BUG, columnTarget, collect)(filterColumn);
