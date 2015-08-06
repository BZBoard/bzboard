import Reflux from 'reflux'
import BzBoardClient from '../lib/BzBoardClient'

/**
 * These actions represents all data manipulations
 * done by the app.
 *
 * Every action apart from load implements a preEmit hook
 * where it does its server communications.
 *
 * Reasoning behind not implementing callbacks is due to
 * not 'caring' about wheter a save or delete has actually happened.
 * Much like Twitter, we only acknowledge that an action has been recieved
 * by the server.
 *
 * If a callback nature architecture would be implemented
 * each successful or erroneous action would trigger its own callback action.
 *
 * Example:
 *  addTodo -> 200 OK -> addTodoSuccessfulCallback();
 */

let FilterActions = Reflux.createActions([
  "load",
  "create",
  "remove",
  "update"
]);

FilterActions.create.preEmit = function (filter) {
  BzBoardClient.addFilter(filter);
};

FilterActions.remove.preEmit = function (uid) {
  BzBoardClient.removeFilter(uid);
};

FilterActions.update.preEmit = function (filter) {
  BzBoardClient.updateFilter(filter);
};

export default FilterActions;
