import React from 'react';
import BugsList from './BugsList.jsx'

export default React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    bugs: React.PropTypes.array
  },

  render: function() {
    const { name, bugs } = this.props;

    return (
      <div className="bugs-column">
        <input className="buglist-title" disabled="true" defaultValue={name} />
        <BugsList bugs={bugs} />
      </div>
    );
  }
});
