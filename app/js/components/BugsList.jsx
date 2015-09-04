import React from 'react';
import BugsListItem from './BugsListItem.jsx'

export default React.createClass({

  propTypes: {
    bugs: React.PropTypes.array
  },

  render: function () {
    const { bugs } = this.props;

    let bugsItems = [];
    for (let bug of bugs) {
      bugsItems.push(<BugsListItem key={bug.id} data={bug} />);
    }

    return (
      <ul className="cards-list">
        {bugsItems}
      </ul>
    );
  }
});
