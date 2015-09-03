const PREFIX = "bzboard.";
const FILTER_STORAGE = PREFIX + "filters";
const BUGZILLA_CREDS_STORAGE = PREFIX + "bugzilla.credentials";

function _get(key, defaultValue = {}) {
  let data = localStorage.getItem(FILTER_STORAGE);
  if (!data) {
    return {};
  }
  return JSON.parse(data);
}

function _set(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default {

  getBugzillaCredentials() {
    return _get(BUGZILLA_CREDS_STORAGE, null);
  },

  setBugzillaCredentials(creds) {
    return _set(BUGZILLA_CREDS_STORAGE, creds);
  },

  getAll() {
    return Promise.resolve(_get(FILTER_STORAGE));
  },

  addFilter(filter) {
    let filters = _get(FILTER_STORAGE);
    filters[filter.uid] = filter;
    _set(FILTER_STORAGE, filters);
  },

  updateFilter(filter) {
    this.addFilter(filter);
  },

  removeFilter(uid) {
    let filters = _get(FILTER_STORAGE);
    delete filters[uid];
    _set(FILTER_STORAGE, filters);
  }
};
