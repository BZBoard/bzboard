import React from 'react';
import { connect } from 'react-redux';
import { getFilters, createFilter, updateFilter, removeFilter } from '../actions';
import FilterColumn from './FilterColumn.jsx';
import LabelColumn from './LabelColumn.jsx';
import Filter from '../models/Filter';

let Board = React.createClass({

  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(getFilters());
  },

  _addBugList: function() {
    const { dispatch } = this.props;
    let filter = new Filter('New bug list', '');
    dispatch(createFilter(filter));
  },

  _updateFilter: function(uid, name, value) {
    const { filters, dispatch } = this.props;
    let updatedFilter = Filter.fromData(filters[uid]);
    if (name) {
      updatedFilter.name = name;
    }
    if (value) {
      updatedFilter.value = value;
    }
    dispatch(updateFilter(updatedFilter));
  },

  _removeFilter: function(uid) {
    const { dispatch } = this.props;
    dispatch(removeFilter(uid));
  },

  render: function() {
    const { columns } = this.props;
    let cols = [];
    for (let column of columns) {
      if (column.type === "filter") {
        cols.push(<FilterColumn key={column.id} filter={column.filter} bugs={column.bugs}
                                update={this._updateFilter.bind(this, column.filter.uid)}
                                remove={this._removeFilter.bind(this, column.filter.uid)}/>);
      } else {
        cols.push(<LabelColumn key={column.id} name={column.name} bugs={column.bugs}/>);
      }
    }

    return (
      <div className="board">
        <button className="add-buglist" title="Add buglist" onClick={this._addBugList}></button>
        {cols}
      </div>
    );
  }
});

function newFilterColumn(filter) {
  return {
    id: "filter-" + filter.uid,
    type: "filter",
    filter,
    bugs: []
  };
}

function newLabelColum(labelName) {
  return {
    id: "label-" + labelName,
    name: labelName,
    type: "label",
    bugs: []
  };
}

function toColumns(filters, bugsByFilter) {
  // TODO : find better unique keys for the map / symbols
  let columns = new Map();
  for (let filter of Object.values(filters)) {
    let col = newFilterColumn(filter);
    columns.set(filter.uid, col);
  }

  for (let uid of Object.keys(bugsByFilter)) {
    for (let bug of bugsByFilter[uid]) {
      let bugsList;
      let label = /\[(fxsync)\]/.exec(bug.whiteboard);
      if (label) {
        label = label[1];
        if (!columns.has(label)) {
          let col = newLabelColum(label);
          columns.set(label, col);
        }
        bugsList = columns.get(label).bugs;
      }
      else {
        bugsList = columns.get(uid).bugs;
      }
      bugsList.push(bug);
    }
  }
  return columns.values();
}

function mapStoreStateToProps(state) {
  const { filters, bugsByFilter } = state;
  return {
    filters,
    columns: toColumns(filters, bugsByFilter)
  };
}

export default connect(mapStoreStateToProps)(Board);
