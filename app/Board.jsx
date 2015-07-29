import React from 'react';
import BugsList from './BugsList.jsx';

export default class extends React.Component {
  render() {
    return <div><BugsList/><BugsList/><BugsList/></div>;
  }
};
