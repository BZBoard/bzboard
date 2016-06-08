import BzBoardClient from '../lib/BzBoardClient'
import Immutable from 'immutable';
import uuid from 'uuid'
import { combineReducers } from 'redux';
import {
  BUGS_REPLACE, BUGS_UPDATE,
  FILTER_INIT, FILTER_UPDATE_NAME, FILTER_UPDATE_VALUE,
  LABEL_ADD, LABEL_CREATE, LABEL_UPDATE,
  LABEL_REMOVE, LABEL_BUG
} from '../actions';

/* State Structure:
{
  bugs: Map({
    1: {
      id: 1,
      ...
    }
  }), // Not persisted
  labels: Map({
    1: {
      id: 1,
      name: "My label"
    }
  })
}
*/

function _bugFromJson(hash) {
  // TODO: no need to keep the whole bug object, it's really huge
  let bug = Object.assign({}, hash);
  return bug;
}

function _bugsKeyValueIterator(bugs) {
  let i = 0;
  return {
    next: function () {
      if (i == bugs.length) {
        return {done: true};
      }
      let bug = bugs[i++];
      return {value: [bug.id, _bugFromJson(bug)], done: false};
    }
  };
}

function bugs(state = Immutable.Map(), action) {
  const { bugs } = action;
  switch (action.type) {
  case BUGS_REPLACE:
    return Immutable.Map(Immutable.Iterable(_bugsKeyValueIterator(bugs)));
  case BUGS_UPDATE:
    return state.merge(Immutable.Iterable(_bugsKeyValueIterator(bugs)));
  default:
    return state;
  }
}

function filter(state = { name: "New Filter", value: "" }, action) {
  switch (action.type) {
  case FILTER_INIT:
    return { name: action.filter.name, value: action.filter.value };
  case FILTER_UPDATE_NAME: {
    let updatedProps = { name: action.newName };
    BzBoardClient.updateFilter(updatedProps);
    return Object.assign({}, state, updatedProps);
  }
  case FILTER_UPDATE_VALUE: {
    let updatedProps = { value: action.newValue };
    BzBoardClient.updateFilter(updatedProps);
    return Object.assign({}, state, updatedProps);
  }
  default:
    return state;
  }
}

function labels(state = Immutable.Map(), action) {
  switch (action.type) {
  case LABEL_ADD: {
    let { label } = action;
    return state.set(label.id, label);
  }
  case LABEL_CREATE: {
    let id = uuid.v4();
    let label = { id, value: action.label.value };
    BzBoardClient.updateLabel(label);
    return state.set(id, label);
  }
  case LABEL_UPDATE: {
    let id = action.label.id;
    let updatedProps = { id, value: action.label.value };
    BzBoardClient.updateLabel(updatedProps);
    return state.update(id, label => Object.assign({}, label, { value: updatedProps.value }));
  }
  case LABEL_REMOVE:
    BzBoardClient.removeLabel(action.id);
    return state.delete(action.id);
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  filter,
  labels,
  bugs
});

export default rootReducer;
