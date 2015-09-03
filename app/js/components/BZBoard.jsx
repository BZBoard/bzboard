import React from 'react';
import Board from './Board.jsx';
import configureStore from '../store/configureStore';
import '../../css/main.scss';

const store = configureStore();

export default React.createClass({
  render() {
    return (
      <div className="bztasks">
        <h1>BZ Board</h1>
        <div className="board-wrapper">
          <Board store={store}/>
        </div>
      </div>
    );
  }
});
