import BzBoardClient from '../lib/BzBoardClient'
import BzClient from '../lib/BzClient'
import Filter from '../models/Filter';
import Label from '../models/Label';

export const BUGS_UPDATE   = 'BUGS_UPDATE';
export const FILTER_CREATE = 'FILTER_CREATE';
export const FILTER_UPDATE = 'FILTER_UPDATE';
export const FILTER_REMOVE = 'FILTER_REMOVE';
export const LABEL_BUG     = 'LABEL_BUG';
export const LABEL_CREATE  = 'LABEL_CREATE';
export const LABEL_UPDATE  = 'LABEL_UPDATE';
export const LABEL_REMOVE  = 'LABEL_REMOVE';

export function getFilters () {
  return dispatch => {
    BzBoardClient.getAllFilters()
      .then(rawFilters => {
        for (let rawFilter of Object.values(rawFilters)) {
          let filter = Filter.fromData(rawFilter);
          dispatch(createFilter(filter));
        }
      });
  };
}

export function getLabels () {
  return dispatch => {
    BzBoardClient.getAllLabels()
      .then(rawLabels => {
        for (let rawLabel of Object.values(rawLabels)) {
          let label = Label.fromData(rawLabel);
          dispatch(createLabel(label));
        }
      });
  };
}


export function changeBugLabel (bugId, newLabel) {
  return {
    type: LABEL_BUG,
    bugId: bugId + "",
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
    BzClient.searchBugs(filter.value)
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
    BzClient.searchBugs(filter.value)
      .then(bugs => dispatch(updateFilterBugs(filter, bugs)));
  };
}

export function removeFilter (uid) {
  return {
    type: FILTER_REMOVE,
    uid
  };
}

export function createLabel (label) {
  return dispatch => {
    dispatch({
      type: LABEL_CREATE,
      label
    });
  }
}

export function updateLabel (label) {
  dispatch({
    type: FILTER_UPDATE,
    filter
  });
}

export function removeLabel (uid) {
  return {
    type: LABEL_REMOVE,
    uid
  };
}
