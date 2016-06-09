import Immutable from 'immutable';
import uuid from 'uuid'
import BzBoardClient from '../lib/BzBoardClient'
import { LABEL_ADD, LABEL_CREATE, LABEL_UPDATE, LABEL_REMOVE } from '../actions';

export default function labels(state = Immutable.Map(), action) {
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
