import React from 'react';
import BugsListItem from './BugsListItem.jsx'

export default React.createClass({

  propTypes: {
    bugs: React.PropTypes.array,
    changeBugLabel: React.PropTypes.func
  },

  render: function () {
    const { bugs, changeBugLabel } = this.props;

    let bugsItems = [];
    if(bugs) {
      for (let bug of bugs) {
        bugsItems.push(<BugsListItem key={bug.id} data={bug} changeBugLabel={changeBugLabel} />);
      }
    }

    return (
      <ul className="cards-list">
        {bugsItems}
      </ul>
    );
  }
});
