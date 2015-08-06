import React from 'react';
import Board from './Board.jsx';
import '../../css/main.scss';

export default class extends React.Component {
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
};
