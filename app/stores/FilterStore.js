import EventEmitter from 'eventemitter2'
import Uuid from 'uuid'
import Dispatcher from '../lib/dispatcher'
import Constants from '../lib/constants'
import Filter from '../models/Filter'

let ActionTypes = Constants.action.filter;
let CHANGE_EVENT = 'change';

let _filters = new Map();

function _createFilterFromAction (action) {
  let uid = Uuid.v1();
  let filter = new Filter(uid, action.name, action.value);
  _filters.set(uid, filter);
}

function _updateFilterFromAction (uid, action) {
  let filter = _filters.get(uid);
  filter.name = action.name;
  filter.value = action.value;
}

function _removeFilterFromAction (uid) {
  _filters.delete(uid);
}

let FilterStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(uid) {
    return _filters.get(uid);
  },

  getAll: function() {
    return Array.from(_filters.values());
  }

});

FilterStore.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE:
      _createFilterFromAction(action);
      FilterStore.emitChange();
      break;

    case ActionTypes.UPDATE:
      _updateFilterFromAction(action);
      FilterStore.emitChange();
      break;

    case ActionTypes.REMOVE:
      _removeFilterFromAction(action);
      FilterStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default FilterStore;