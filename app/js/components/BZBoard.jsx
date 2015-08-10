import React from 'react';
import Reflux from 'reflux'
import Board from './Board.jsx';
import '../../css/main.scss';

export default React.createClass({
  render() {
    return (
      <div className="bztasks">
        <h1>BZ Board</h1>
        <div className="board-wrapper">
          <Board/>
        </div>
      </div>
    );
  }
});
