import BzBoardClient from '../lib/BzBoardClient'
import { combineReducers } from 'redux';
import {
  BUGS_UPDATE, FILTER_CREATE,
  FILTER_UPDATE, FILTER_REMOVE
} from '../actions';

function filters (state = { }, action) {
  switch (action.type) {
  case FILTER_CREATE:
    BzBoardClient.addFilter(action.filter);
  case FILTER_UPDATE: {
    BzBoardClient.updateFilter(action.filter);
    let filter = {};
    filter[action.filter.uid] = action.filter;
    return Object.assign({}, state, filter);
  }
  case FILTER_REMOVE: {
    BzBoardClient.removeFilter(action.uid);
    let newState = Object.assign({}, state);
    delete newState[action.uid];
    return newState;
  }
  default:
    return state;
  }
}

function bugsByFilter (state = { }, action) {
  switch (action.type) {
  case FILTER_CREATE:
  case FILTER_UPDATE: {
    let filterBugs = {};
    filterBugs[action.filter.uid] = [];
    return Object.assign({}, state, filterBugs);
  }
  case FILTER_REMOVE: {
    let newState = Object.assign({}, state);
    delete newState[action.uid];
    return newState;
  }
  case BUGS_UPDATE: {
    let filterBugs = {};
    filterBugs[action.filter.uid] = action.bugs;
    return Object.assign({}, state, filterBugs);
  }
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  filters,
  bugsByFilter
});

export default rootReducer;
