import React from 'react';
import Bug from './Bug.jsx';

export default class extends React.Component {
  render() {
    return (
      <div className="bugs-column">
        <h2>Backlog</h2>
        <ul className="cards-list">
          <Bug/>
          <Bug/>
        </ul>
      </div>
    );
  }
};
