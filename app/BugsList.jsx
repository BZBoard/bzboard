import React from 'react';
import Bug from './Bug.jsx';
import BzClient from './BzClient.js';

export default React.createClass({
  getInitialState: function() {
    let isEditing = this.props.new ? true : false;
    return {isEditing: isEditing, filter: "ALL owner:rittme"};
  },

  toggleFilter: function() {
    if(this.state.isEditing) {
      this.fetchBugs();
    }
    this.setState({isEditing: !this.state.isEditing, filter: this.state.filter});
  },

  changeFilter: function(e) {
    this.setState({filter: e.target.value});
  },

  fetchBugs: function() {
    let fetchOptions = {quicksearch: this.state.filter};
    BzClient.fetch(fetchOptions).then((bugs)=>{
      console.log(bugs);
      this.setState({bugs: bugs});
    });
  },

  render: function() {
    let showEdit = () => {
      if (this.state.isEditing) {
        return <input value={this.state.filter} onChange={this.changeFilter} className="edit-filter" />
      }
    }

    let createBugs = () => {
      if (this.state.bugs) {
        return this.state.bugs.map((bug) => {
          return <Bug key={bug.id} data={bug} />;
        });
      }
    }

    return (
      <div className="bugs-column">
        <h2>Backlog</h2>
        {showEdit()}
        <button onClick={this.toggleFilter} className="bugs-column-config"></button>
        <ul className="cards-list">
          {createBugs()}
        </ul>
      </div>
    );
  },
});
