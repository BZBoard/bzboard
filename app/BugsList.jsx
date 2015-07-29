import React from 'react';
import Bug from './Bug.jsx';


export default React.createClass({
  getInitialState: function() {
    let isEditing = this.props.new ? true : false;
    return {isEditing: isEditing, filter: "ALL owner:rittme"};
  },

  toggleFilter: function() {
    this.setState({isEditing: !this.state.isEditing, filter: this.state.filter});
  },

  changeFilter: function(e) {
    this.setState({filter: e.target.value});
  },

  render: function() {
    let showEdit = () => {
      if (this.state.isEditing) {
        return <input value={this.state.filter} onChange={this.changeFilter} className="edit-filter" />
      }
    }
    return (
      <div className="bugs-column">
        <h2>Backlog</h2>
        {showEdit()}
        <button onClick={this.toggleFilter} className="bugs-column-config"></button>
        <ul className="cards-list">
          <Bug/>
          <Bug/>
        </ul>
      </div>
    );
  }
});
