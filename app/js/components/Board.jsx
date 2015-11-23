import React from 'react';
import { connect } from 'react-redux';
import { getFilters, createFilter, updateFilter, removeFilter,
         getLabels, createLabel, updateLabel, removeLabel,
         changeBugLabel } from '../actions';
import FilterColumn from './FilterColumn.jsx';
import LabelColumn from './LabelColumn.jsx';
import Filter from '../models/Filter';
import Label from '../models/Label';

let Board = React.createClass({

  propTypes: {
    filters: React.PropTypes.object,
    label: React.PropTypes.object,
    bugs: React.PropTypes.object,
  },

  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(getFilters());
    dispatch(getLabels());
  },

  _addBugList: function() {
    const { dispatch } = this.props;
    let label = new Label("New bug list");
    dispatch(createLabel(label));
  },

  _updateLabel: function(uid, name) {
    const { labels, dispatch } = this.props;
    let updatedLabel = Label.fromData(labels.get(uid));
    if (name) {
      updatedLabel.name = name;
    }
    dispatch(updateLabel(updatedLabel));
  },

  _removeLabel: function(uid) {
    const { dispatch } = this.props;
    dispatch(removeLabel(uid));
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

  _changeBugLabel: function(bugId, newLabel) {
    const { dispatch } = this.props;
    dispatch(changeBugLabel(bugId, newLabel));
  },

  render: function() {
    const { columns } = this.props;
    let cols = [];
    for (let column of columns) {
      if (column.type === "filter") {
        cols.push(<FilterColumn key={column.id} filter={column.filter} bugs={column.bugs}
                                update={this._updateFilter.bind(this, column.filter.uid)}
                                remove={this._removeFilter.bind(this, column.filter.uid)}
                                changeBugLabel={this._changeBugLabel}/>);
      } else {
        cols.push(<LabelColumn key={column.id} label={column.label} bugs={column.bugs}
                               update={this._updateLabel.bind(this, column.label.uid)}
                               remove={this._removeLabel.bind(this, column.label.uid)}
                               changeBugLabel={this._changeBugLabel}/>);
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

function newLabelColumn(label) {
  return {
    id: "label-" + label.uid,
    type: "label",
    label,
    bugs: []
  };
}

function toColumns(filters, labels, bugs) {
  let filterColumns = new Map();
  let labelColumns = new Map();
  for (let filter of filters.values()) {
    let col = newFilterColumn(filter);
    filterColumns.set(filter.uid, col);
  }

  for (let label of labels.values()) {
    let col = newLabelColumn(label);
    labelColumns.set(label.uid, col);
  }
/*
  for (let bug of bugs.values()) {
    if (!bug.label) {
      for (let filter of bug.filters) {
        filterColumns.get(filter).bugs.push(bug);
      }
    } else {
      if (!labelColumns.has(bug.label)) {
        labelColumns.set(bug.label, newLabelColumn(bug.label));
      }
      labelColumns.get(bug.label).bugs.push(bug);
    }
  }
*/
  return [...filterColumns.values()].concat([...labelColumns.values()]);
}

function mapStoreStateToProps(state) {
  const { filters, labels, bugs } = state;
  return {
    filters,
    labels,
    columns: toColumns(filters, labels, bugs)
  };
}

export default connect(mapStoreStateToProps)(Board);
