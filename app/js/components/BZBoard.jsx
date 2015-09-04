import React from 'react';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';
import Board from './Board.jsx';
import configureStore from '../store/configureStore';
import '../../css/main.scss';

const store = configureStore();

let BzBoard = React.createClass({
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

export default DragDropContext(HTML5Backend)(BzBoard);
