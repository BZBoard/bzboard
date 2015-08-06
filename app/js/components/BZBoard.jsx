import React from 'react';
import Reflux from 'reflux'
import Board from './Board.jsx';
import FilterStore from '../stores/FilterStore';
import '../../css/main.scss';

export default React.createClass({
  mixins: [Reflux.connect(FilterStore, "filters")],

  render() {
    return (
      <div className="bztasks">
        <h1>BZ Board</h1>
        <div className="board-wrapper">
          <Board filters={this.state.filters}/>
        </div>
      </div>
    );
  }
});
