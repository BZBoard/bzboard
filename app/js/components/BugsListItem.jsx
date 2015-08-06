import React from 'react';

export default class extends React.Component {
  render() {
    let getClass = () => {
      let className = "";
      if (!this.props.data.is_open) {
        className += "closed-bug";
      }
      return className;
    }

    let renderDate = () => {
      return <small className="bug-change-date">
        {new Date(this.props.data.last_change_time).toLocaleString()}
      </small>
    }

    let renderStatus = () => {
      if (this.props.data.assigned_to) {
        return <div className="bug-status">
        {this.props.data.status} - {this.props.data.assigned_to}
        </div>
      }
      return <div className="bug-status">
        {this.props.data.status}
      </div>
    }

    let getBugURL = () =>
      "https://bugzilla.mozilla.org/show_bug.cgi?id=" + this.props.data.id;

    return (
      <li className={getClass()}>
        <h3><a target="_blank" href={getBugURL()}>Bug {this.props.data.id}</a></h3>
        {renderDate()}
        {renderStatus()}
        <p>{this.props.data.summary}</p>
      </li>
    );
  }
};
