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

  updateFilter(props) {
    let updatedProps = {};
    if (props.name) { // TODO: Make a generic method for copying allowed props
      updatedProps.name = props.name;
    }
    if (props.value) {
      updatedProps.value = props.value;
    }
    let existingFilter = _get(FILTER_STORAGE);
    let updatedFilter = Object.assign({}, existingFilter, updatedProps);
    _set(FILTER_STORAGE, updatedFilter);
  },

  updateLabel(label) {
    let labels = _get(LABELS_STORAGE);
    let isNew = labels[label.id];
    let labelToUpload;
    if (isNew) {
      labelToUpload = label;
    } else {
      let updatedProps = {};
      if (label.value) {
        updatedProps.value = label.value;
      }
      labelToUpload = Object.assign({}, labels[label.id], updatedProps);
    }
    labels[label.id] = labelToUpload;
    _set(LABELS_STORAGE, labels);
  },

  removeLabel(id) {
    let labels = _get(LABELS_STORAGE);
    delete labels[id];
    _set(LABELS_STORAGE, labels);
  }
};
