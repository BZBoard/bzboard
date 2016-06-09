import Immutable from 'immutable';
import { BUGS_REPLACE, BUGS_UPDATE } from '../actions';

export default function bugs(state = Immutable.Map(), action) {
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

function _bugsKeyValueIterator(bugs) {
  let i = 0;
  return {
    next: function () {
      if (i == bugs.length) {
        return {done: true};
      }
      let bug = bugs[i++];
      return {value: [bug.id, bug], done: false};
    }
  };
}
