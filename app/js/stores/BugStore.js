import Reflux from 'reflux'
import FilterStore from '../stores/FilterStore';
import BzClient from '../lib/BzClient';

export default Reflux.createStore({
  init: function () {
    this.bugs = {};
    this.listenTo(FilterStore, this.loadBugs);
  },

  getInitialState: function () {
    return {};
  },

  loadBugs: function (filters) {
    Promise.all(filters.map(filter => {
      return BzClient.fetch(filter.value)
        .then(bugs => {
          this.bugs[filter.uid] = bugs;
        });
    }))
    .then(() => {
      this.trigger(this.bugs);
    })
  }
});
