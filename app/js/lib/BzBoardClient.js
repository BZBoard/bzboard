const FILTER_STORAGE = 'filters.storage';

function _get() {
  let filters = localStorage.getItem(FILTER_STORAGE);
  if (!filters) {
    return {};
  }
  return JSON.parse(filters);
}

function _set(filters) {
  localStorage.setItem(FILTER_STORAGE, JSON.stringify(filters));
}

export default {

  getAll() {
    return Promise.resolve(_get());
  },

  addFilter(filter) {
    let filters = _get();
    filters[filter.uid] = filter;
    _set(filters);
  },

  updateFilter(filter) {
    this.addFilter(filter);
  },

  removeFilter(uid) {
    let filters = _get();
    delete filters[uid];
    _set(filters);
  }
};
