import BzBoardClient from '../lib/BzBoardClient'
import { FILTER_INIT, FILTER_UPDATE_NAME, FILTER_UPDATE_VALUE } from '../actions';

export default function filter(state = null, action) {
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
