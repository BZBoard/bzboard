import React from 'react';
import BugsList from './BugsList.jsx'
import { DropTarget } from 'react-dnd';
import { draggableTypes } from '../lib/Constants';

const columnTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    return { name: props.name }
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

let labelColumn = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    bugs: React.PropTypes.array,
    changeBugLabel: React.PropTypes.func
  },

  render: function() {
    const { name, bugs, changeBugLabel, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="bugs-column">
        <input className="buglist-title" disabled="true" defaultValue={name} />
        <BugsList bugs={bugs} changeBugLabel={changeBugLabel} />
      </div>
    );
  }
});

export default DropTarget(draggableTypes.BUG, columnTarget, collect)(labelColumn);
