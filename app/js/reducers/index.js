import BzBoardClient from '../lib/BzBoardClient'
import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {
  BUGS_UPDATE, FILTER_CREATE,
  FILTER_UPDATE, FILTER_REMOVE,
  LABEL_BUG
} from '../actions';

/* State Structure:
{
  bugs: Map({
    1: {
      id: 1,
      ...
      label: labelName, // Mutable
      filters: [1, 2]
    }
  }),
  filters: Map({
    1: {
      id: 1,
      ...
    }
  })
}
*/

function bugFromJson (hash, action) {
  // TODO: no need to keep the whole bug object, it's really huge
  let bug = Object.assign({}, hash);
  bug.filters = new Set([action.filter.uid]);
  let label = /\[(fxsync)\]/.exec(hash.whiteboard);
  bug.label = label ? label[1] : null;
  return bug;
}

function bugs (state = Immutable.Map(), action) {
  switch (action.type) {
  case FILTER_UPDATE:
  case FILTER_REMOVE:
    return Immutable.Map(state.reduce((obj, bug) => {
      bug.filters.remove(action.filter.uid);
      if(bug.filters.size > 0) {
        obj[bug.id] = bug;
      }
      return obj;
    }, {}));
  case BUGS_UPDATE:
    return state.mergeWith((a, b) => {
      a.filters = new Set([...a.filters, ...b.filters]);
      return a;
    }, Immutable.Map(action.bugs.reduce((obj, bug) => {
        bug = bugFromJson(bug, action);
        obj[bug.id] = bug;
        return obj;
    }, {})));
  case LABEL_BUG:
    state.get(action.bugId).label = action.newLabel;
  default:
    return state;
  }
}

function filters (state = Immutable.Map(), action) {
  switch (action.type) {
  case FILTER_CREATE:
    BzBoardClient.addFilter(action.filter);
    return state.set(action.filter.uid, action.filter);
  case FILTER_UPDATE:
    BzBoardClient.updateFilter(action.filter);
    return state.set(action.filter.uid, action.filter);
  case FILTER_REMOVE:
    BzBoardClient.removeFilter(action.filter.uid);
    return state.delete(action.filter.uid);
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  filters,
  bugs
});

export default rootReducer;
