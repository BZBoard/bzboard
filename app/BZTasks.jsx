import React from 'react';
import Board from './Board.jsx';
import './style/main.scss';

export default class extends React.Component {
  render() {
    return (
      <div className="bztasks">
        <h1>BZ Organizer</h1>
        <div className="board-wrapper">
          <Board/>
        </div>
      </div>
    );
  }
};
