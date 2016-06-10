const PREFIX = "bzboard.";
const FILTER_STORAGE = PREFIX + "filter";
const LABELS_STORAGE = PREFIX + "labels";
const BUGZILLA_API_KEY_STORAGE = PREFIX + "bugzilla.credentials";

function _get(key, defaultValue = {}) {
  let data = localStorage.getItem(key);
  if (!data) {
    return defaultValue;
  }
  return JSON.parse(data);
}

function _set(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Clone an object keeping only allowed props
function cloneObject(original, allowedProps) {
  return allowedProps.reduce(function(clone, prop) {
    if (original[prop]) {
      clone[prop] = original[prop];
    }
    return clone;
  }, {});
}

export default {
  getBugzillaApiKey() {
    return _get(BUGZILLA_API_KEY_STORAGE, null);
  },

  setBugzillaApiKey(creds) {
    return _set(BUGZILLA_API_KEY_STORAGE, creds);
  },

  loadFilter() {
    return Promise.resolve(_get(FILTER_STORAGE, null));
  },

  getAllLabels() {
    return Promise.resolve(_get(LABELS_STORAGE));
  },

  updateFilter(filterProps) {
    let updatedProps = cloneObject(filterProps, ["name", "value"]);
    let existingFilter = _get(FILTER_STORAGE);
    let updatedFilter = Object.assign({}, existingFilter, updatedProps);
    _set(FILTER_STORAGE, updatedFilter);
  },

  updateLabel(labelProps) {
    let id = labelProps.id;
    let labels = _get(LABELS_STORAGE);
    if (!labels[id]) { // New label
      labels[id] = labelProps;
    } else {
      let updatedProps = cloneObject(labelProps, ["value"]);
      labels[id] = Object.assign({}, labels[id], updatedProps);
    }
    _set(LABELS_STORAGE, labels);
  },

  removeLabel(id) {
    let labels = _get(LABELS_STORAGE);
    delete labels[id];
    _set(LABELS_STORAGE, labels);
  }
};
