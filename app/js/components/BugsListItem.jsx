import React from 'react';
import { DragSource } from 'react-dnd';
import md5 from 'md5';
import { draggableTypes } from '../lib/Constants';

const GRAVATAR_URL = "http://www.gravatar.com/avatar/";

const bugSource = {
  // isDragging(props, monitor) {
  //   return monitor.getItem().id === props.id;
  // },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { bugId: props.data.id };
    return item;
  },

  endDrag(props, monitor, component) {
    const { changeBugLabel } = props;
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    changeBugLabel(item.bugId, dropResult.label);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

let BugListItem = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    changeBugLabel: React.PropTypes.func
  },

  render() {
    const { connectDragSource } = this.props;

    let getClass = () => {
      let className = "bug";
      if (!this.props.data.is_open) {
        className += "closed";
      }
      return className;
    }

    let renderDate = () => {
      return <p className="bug-last-change-date">
        {new Date(this.props.data.last_change_time).toLocaleString()}
      </p>
    }

    let renderAssignee = () => {
      if (this.props.data.assigned_to) {
        // Get user image
        let imgURL = GRAVATAR_URL + md5(this.props.data.assigned_to.trim());
        imgURL += "?size=64";
        imgURL += "&d=mm";
        return <img src={imgURL} title={this.props.data.assigned_to} className="bug-assignee-picture" />
      }
    }

    let renderStatus = () => {
      let classes = "bug-status " + this.props.data.status.toLowerCase();
      return <div className={classes}>
        {this.props.data.status}
      </div>
    }

    let getBugURL = () =>
      "https://bugzilla.mozilla.org/show_bug.cgi?id=" + this.props.data.id;

    return connectDragSource(
      <li className={getClass()}>
        <h3 className="bug-title"><a className="bug-link" target="_blank" href={getBugURL()}>Bug {this.props.data.id}</a></h3>
        {renderAssignee()}
        {renderStatus()}
        <p className="bug-summary">{this.props.data.summary}</p>
        {renderDate()}
      </li>
    );
  }
});

export default DragSource(draggableTypes.BUG, bugSource, collect)(BugListItem);
