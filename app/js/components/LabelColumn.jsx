import React from 'react';
import BugsList from './BugsList.jsx'
import { DropTarget } from 'react-dnd';
import { INPUT_CHANGE_DELAY } from '../lib/Constants';
import { debounce } from 'underscore';
import { draggableTypes } from '../lib/Constants';

const columnTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    return { label: props.label.value };
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
    label: React.PropTypes.object,
    bugs: React.PropTypes.array,
    changeBugLabel: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      newLabelName: this.props.label.value,
    };
  },

  componentWillMount: function() {
    let changeLabelName = () => {
      this.props.update(this.state.newLabelName, null);
    }
    this.changeLabelName = debounce(changeLabelName, INPUT_CHANGE_DELAY);
  },

  onChangeLabelName: function(e) {
    this.setState({newLabelName: e.target.value});
    this.changeLabelName();
  },

  render: function() {
    const { label, bugs, changeBugLabel, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="bugs-column">
        <input className="buglist-title" value={this.state.newLabelName} onChange={this.onChangeLabelName} />
        <button onClick={this.props.remove} className="bugs-column-button bugs-column-remove"></button>
        <BugsList bugs={bugs} changeBugLabel={changeBugLabel} />
      </div>
    );
  }
});

export default DropTarget(draggableTypes.BUG, columnTarget, collect)(labelColumn);
