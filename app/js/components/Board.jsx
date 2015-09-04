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
    let updatedFilter = Filter.fromData(filters.get(uid));
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

function toColumns(filters, bugs) {
  let filterColumns = new Map();
  let labelColumns = new Map();
  for (let filter of filters.values()) {
    let col = newFilterColumn(filter);
    filterColumns.set(filter.uid, col);
  }

  for (let bug of bugs.values()) {
    if (!bug.label) {
      filterColumns.get(bug.filter).bugs.push(bug);
    } else {
      if (!labelColumns.has(bug.label)) {
        labelColumns.set(bug.label, newLabelColum(bug.label));
      }
      labelColumns.get(bug.label).bugs.push(bug);
    }
  }

  return [...filterColumns.values()].concat([...labelColumns.values()]);
}

function mapStoreStateToProps(state) {
  const { filters, bugs } = state;
  return {
    filters,
    columns: toColumns(filters, bugs)
  };
}

export default connect(mapStoreStateToProps)(Board);
