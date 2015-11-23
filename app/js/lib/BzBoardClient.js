const PREFIX = "bzboard.";
const FILTER_STORAGE = PREFIX + "filters";
const LABELS_STORAGE = PREFIX + "labels";
const BUGZILLA_CREDS_STORAGE = PREFIX + "bugzilla.credentials";

function _get(key, defaultValue = {}) {
  let data = localStorage.getItem(key);
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

  getAllFilters() {
    return Promise.resolve(_get(FILTER_STORAGE));
  },

  getAllLabels() {
    return Promise.resolve(_get(LABELS_STORAGE));
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
  },

  addLabel(label) {
    let labels = _get(LABELS_STORAGE);
    labels[label.uid] = label;
    _set(LABELS_STORAGE, labels);
  },

  updateLabel(label) {
    this.updateLabel(label);
  },

  removeLabel(uid) {
    let labels = _get(LABELS_STORAGE);
    delete labels[uid];
    _set(LABELS_STORAGE, labels);
  }
};
