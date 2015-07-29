import React from 'react';
import BugsList from './BugsList.jsx';

export default React.createClass({
  getInitialState: function() {
    return {lists: ["hey"]};
  },

  addBugList: function() {
    let nextLists = this.state.lists.concat(["New bug list"]);
    this.setState({lists: nextLists});
  },

  render: function() {
    let createList = function(list, index) {
      return <BugsList new="true"/>;
    };

    return (
      <div className="board">
        <button className="add-buglist" onClick={this.addBugList}></button>
        {this.state.lists.map(createList)}
      </div>
    );
  }
});
