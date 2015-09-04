import React from 'react';
import { DragSource } from 'react-dnd';
import md5 from 'md5';
import { draggableTypes } from '../lib/Constants';
import { changeBugLabel } from '../actions';

const GRAVATAR_URL = "http://www.gravatar.com/avatar/";

const bugSource = {
  // isDragging(props, monitor) {
  //   return monitor.getItem().id === props.id;
  // },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.data.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    changeBugLabel(item.id, dropResult.name);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

let BugListItem = class extends React.Component {
  render() {

    const { connectDragSource } = this.props;

    let getClass = () => {
      let className = "";
      if (!this.props.data.is_open) {
        className += "closed-bug";
      }
      return className;
    }

    let renderDate = () => {
      return <p className="bug-change-date">
        {new Date(this.props.data.last_change_time).toLocaleString()}
      </p>
    }

    let renderAssignee = () => {
      if (this.props.data.assigned_to) {
        // Get user image
        let imgURL = GRAVATAR_URL + md5(this.props.data.assigned_to.trim());
        imgURL += "?size=64";
        imgURL += "&d=mm";
        return <img src={imgURL} title={this.props.data.assigned_to} className="owner-image" />
      }
    }

    let renderStatus = () => {
      let classes = "bug-status bug-status-" + this.props.data.status.toLowerCase();
      return <div className={classes}>
        {this.props.data.status}
      </div>
    }

    let getBugURL = () =>
      "https://bugzilla.mozilla.org/show_bug.cgi?id=" + this.props.data.id;

    return connectDragSource(
      <li className={getClass()}>
        <h3><a target="_blank" href={getBugURL()}>Bug {this.props.data.id}</a></h3>
        {renderAssignee()}
        {renderStatus()}
        <p>{this.props.data.summary}</p>
        {renderDate()}
      </li>
    );
  }
};

export default DragSource(draggableTypes.BUG, bugSource, collect)(BugListItem);
