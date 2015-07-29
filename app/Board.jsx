import React from 'react';
import BugsColumn from './BugsColumn.jsx';

export default class extends React.Component {
  render() {
    return <div><BugsColumn/><BugsColumn/><BugsColumn/></div>;
  }
};
