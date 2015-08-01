function RemoteConfig() {
}

RemoteConfig.prototype = {
  ensureReady() {
    throw new Error('Not implemented yet');
  },

  getPref() {
    throw new Error('Not implemented yet');
  },

  save() {
    throw new Error('Not implemented yet');
  }
};

export default RemoteConfig;