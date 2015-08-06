import EventEmitter from 'eventemitter2'
import Uuid from 'uuid'
import Dispatcher from '../lib/Dispatcher'
import Constants from '../lib/Constants'
import Filter from '../models/Filter'

const ActionTypes = Constants.action.filter;
const CHANGE_EVENT = 'change';
const FILTER_STORAGE = 'filters.storage';

let storage = {

  _get() {
    return JSON.parse(localStorage.getItem(FILTER_STORAGE));
  },

  _set(filters) {
    localStorage.setItem(FILTER_STORAGE, JSON.stringify(filters));
  },

  getAll() {
    return Promise.resolve(this._get());
  },

  addFilter(filter) {
    let filters = this._get();
    if (!filters) {
      filters = {};
    }
    filters[filter.uid] = filter;
    this._set(filters);
  },

  updateFilter(filter) {
    this.addFilter(filter);
  },

  removeFilter(uid) {
    let filters = this._get();
    delete filters[uid];
    this._set(filters);
  }
}

let _filters = new Map();
let initialized = false;

function _createFilterFromAction (action) {
  let uid = Uuid.v1();
  let filter = new Filter(uid, action.name, action.value);
  _filters.set(uid, filter);
  return filter;
}

function _updateFilterFromAction (action) {
  let filter = _filters.get(action.uid);
  filter.name = action.name;
  filter.value = action.value;
  return filter;
}

function _removeFilterFromAction (action) {
  _filters.delete(action.uid);
}

let FilterStore = Object.assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get(uid) {
    return _filters.get(uid);
  },

  getAll() {
    return Array.from(_filters.values());
  }

});

FilterStore.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE: {
      let filter = _createFilterFromAction(action);
      storage.addFilter(filter);
      FilterStore.emitChange();
      break;
    }

    case ActionTypes.UPDATE: {
      let filter = _updateFilterFromAction(action);
      storage.updateFilter(filter);
      FilterStore.emitChange();
      break;
    }

    case ActionTypes.REMOVE:
      _removeFilterFromAction(action);
      storage.removeFilter(action.uid);
      FilterStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default FilterStore;