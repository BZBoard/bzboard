import AppDispatcher from '../lib/dispatcher'
import Constants from '../lib/constants'

export default {
  create(filter) {
    AppDispatcher.dispatch({
      type: Constants.action.filter.CREATE,
      filter
    });
  },
  remove(filter) {
    AppDispatcher.dispatch({
      type: Constants.action.filter.REMOVE,
      filter
    });
  },
  update(filter) {
    AppDispatcher.dispatch({
      type: Constants.action.filter.UPDATE,
      filter
    });
  },
};
