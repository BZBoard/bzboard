import AppDispatcher from '../lib/Dispatcher'
import Constants from '../lib/Constants'

export default {
  create(filter) {
    AppDispatcher.dispatch({
      type: Constants.action.filter.CREATE,
      name: filter.name,
      value: filter.value
    });
  },
  remove(filter) {
    AppDispatcher.dispatch({
      type: Constants.action.filter.REMOVE,
      uid: filter.uid
    });
  },
  update(filter) {
    AppDispatcher.dispatch({
      type: Constants.action.filter.UPDATE,
      uid: filter.uid,
      name: filter.name,
      value: filter.value
    });
  },
};
