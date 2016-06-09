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
      <div className="bzboard">
        <h1>BZ Board</h1>
        <Board store={store}/>
      </div>
    );
  }
});

export default DragDropContext(HTML5Backend)(BzBoard);
