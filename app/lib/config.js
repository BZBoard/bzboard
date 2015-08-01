function Config(storageEngine = "localStorage") {
  if (storageEngine === this.STORAGE_ENGINE_LOCAL) {
    import LocalConfig from './local-config';
    this.storageEngine = new LocalConfig();
  } else if (storageEngine === this.STORAGE_ENGINE_REMOTE) {
    import RemoteConfig from './remote-config';
    this.storageEngine = new RemoteConfig();
  } else {
    throw new Error('Unknown config storage engine');
  }
  this._cacheUpdate = new Map();
  this._cacheRemove = new Set();
}

Config.prototype = {
  STORAGE_ENGINE_LOCAL: "localStorage",
  STORAGE_ENGINE_REMOTE: "remote",

  // Returns a promise, should call this everytime before
  // using the other methods
  ensureReady() {
    return this.storageEngine.ensureReady();
  },

  getPref(pref) {
    if (this._cacheUpdate.has(pref)) {
      return this._cacheUpdate.get(pref);
    }
    else if (this._cacheRemove.has(pref)) {
      return undefined;
    }
    else {
      return this.storageEngine.getPref(pref);
    }
  },

  setPref(pref, value) {
    this._cacheUpdate.set(pref, value);
    this._cacheRemove.delete(pref);
  },

  delPref(pref) {
    this._cacheRemove.add(pref);
    this._cacheUpdate.delete(pref);
  },

  // Returns a promise
  save() {
    return this.storageEngine.save(this._cacheUpdate, this._cacheRemove);
  },

  cancel() {
    this._cacheRemove.clear();
    this._cacheUpdate.clear();
  }
};

export default Config;