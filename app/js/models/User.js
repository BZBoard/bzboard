function User(config) {
  config.ensureReady().then(() => {
    this._filters = [];
  })
}

User.prototype = {
  getFilters() {

  },

  addFilter(filter) {
    this._filters.push(filter);
  },

  removeFilter() {
    this._filters.push(filter);
  }
};

export default User;
