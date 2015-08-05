function LocalConfig() {
}

LocalConfig.prototype = {
  ensureReady() {
    return Promise.resolve(true);
  },

  getPref(pref) {
    return localStorage.getItem(pref);
  },

  save(toUpdate, toRemove) {
    for (let [pref, value] of toUpdate) {
      localStorage.setItem(pref, value);
    }
    for (let pref of toRemove) {
      localStorage.removeItem(pref);
    }
  }
};

export default LocalConfig;
