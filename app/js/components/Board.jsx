import React from 'react';
import { connect } from 'react-redux';
import { loadFilter, createFilter,
         updateFilterValue, updateFilterName,
         getLabels, createLabel, updateLabel, removeLabel,
         updateBugWhiteboard } from '../actions';
import FilterColumn from './FilterColumn.jsx';
import LabelColumn from './LabelColumn.jsx';

const COLUMN_KEY_FILTER = "column_filter";

let Board = React.createClass({

  propTypes: {
    filter: React.PropTypes.object,
    label: React.PropTypes.object,
    bugs: React.PropTypes.object,
  },

  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(loadFilter());
    dispatch(getLabels());
  },

  _addLabel: function() {
    const { dispatch } = this.props;
    let label = { value: "[WhiteboardTag]" };
    dispatch(createLabel(label));
  },

  _updateLabel: function(id, value) {
    const { labels, dispatch } = this.props;
    let label = { id, value };
    dispatch(updateLabel(label));
  },

  _removeLabel: function(id) {
    const { dispatch } = this.props;
    dispatch(removeLabel(id));
  },

  _updateFilterValue: function(value) {
    const { dispatch } = this.props;
    dispatch(updateFilterValue(value));
  },

  _updateFilterName: function(name) {
    const { dispatch } = this.props;
    dispatch(updateFilterName(name));
  },

  _changeBugLabel: function(bugId, newLabel) {
    const { bugs, labels, dispatch } = this.props;
    let bug = bugs.get(bugId);
    let allLabelsNames = labels.toArray().map(label => label.value);
    let newWhiteboard = bug.whiteboard || "";
    // Clear tracked labels
    allLabelsNames.forEach(label => {
      if (newWhiteboard.includes(label)) {
        newWhiteboard = newWhiteboard.replace(label, "");
      }
    })
    // Assign a new one
    if (newLabel) {
      newWhiteboard += newLabel;
    }
    if (newWhiteboard == bug.whiteboard) { // Nothing changed!
      return;
    }
    dispatch(updateBugWhiteboard(bug.id, newWhiteboard));
  },

  render: function() {
    const { filter, labels, columns } = this.props;
    if (!filter) {
      return false;
    }

    let labelColumns = [];
    for (let [id, label] of labels) {
      labelColumns.push(<LabelColumn key={id} label={label} bugs={columns.get(id)}
                             update={this._updateLabel.bind(this, id)}
                             remove={this._removeLabel.bind(this, id)}
                             changeBugLabel={this._changeBugLabel}/>);
    }

    return (
      <div className="board">
        <button className="add-label" title="Add label" onClick={this._addLabel}></button>
        <FilterColumn key={COLUMN_KEY_FILTER} filter={filter} bugs={columns.get(COLUMN_KEY_FILTER)}
                      updateFilterValue={this._updateFilterValue} updateFilterName={this._updateFilterName}
                      changeBugLabel={this._changeBugLabel}/>
        {labelColumns}
      </div>
    );
  }
});

function sortBugsInColumns(bugs, labels) {
  let columns = new Map();
  columns.set(COLUMN_KEY_FILTER, []);
  labels.forEach(label => columns.set(label.id, []));

  bugs.forEach(bug => {
    let label = labels.find(label => bug.whiteboard.includes(label.value)); // TODO : not optimized at all
    let key = !label ? COLUMN_KEY_FILTER : label.id;
    columns.get(key).push(bug);
  });
  return columns;
}

function mapStateToProps(state) {
  const { filter, labels, bugs } = state;
  return {
    filter,
    labels,
    bugs,
    columns: sortBugsInColumns(bugs.toArray(), labels.toArray())
  };
}

export default connect(mapStateToProps)(Board);
