import BzBoardClient from '../lib/BzBoardClient'
import BzClient from '../lib/BzClient'
import Filter from '../models/Filter';

export const BUGS_UPDATE   = 'BUGS_UPDATE';
export const FILTER_CREATE = 'FILTER_CREATE';
export const FILTER_UPDATE = 'FILTER_UPDATE';
export const FILTER_REMOVE = 'FILTER_REMOVE';
export const LABEL_BUG     = 'LABEL_BUG';

export function getFilters () {
  return dispatch => {
    BzBoardClient.getAll()
      .then(rawFilters => {
        for (let rawFilter of Object.values(rawFilters)) {
          let filter = Filter.fromData(rawFilter);
          dispatch(createFilter(filter));
        }
      });
  };
}

export function changeBugLabel (bugId, newLabel) {
  return {
    type: LABEL_BUG,
    bugId,
    newLabel
  };
}

function updateFilterBugs (filter, bugs) {
  return {
    type: BUGS_UPDATE,
    bugs,
    filter
  };
}

export function createFilter (filter) {
  return dispatch => {
    dispatch({
      type: FILTER_CREATE,
      filter
    });
    BzClient.fetch(filter.value)
      .then(bugs => dispatch(updateFilterBugs(filter, bugs)));
  };
}

export function updateFilter (filter) {
  return dispatch => {
    dispatch({
      type: FILTER_UPDATE,
      filter
    });
    // TODO : check if filter.value changed, maybe no need to refetch
    BzClient.fetch(filter.value)
      .then(bugs => dispatch(updateFilterBugs(filter, bugs)));
  };
}

export function removeFilter (uid) {
  return {
    type: FILTER_REMOVE,
    uid
  };
}
