import BzBoardClient from '../lib/BzBoardClient'
import BzClient from '../lib/BzClient'

export const FILTER_INIT = 'FILTER_INIT';
export const FILTER_UPDATE_VALUE = 'FILTER_UPDATE_VALUE';
export const FILTER_UPDATE_NAME  = 'FILTER_UPDATE_NAME';
export const BUGS_REPLACE  = 'BUGS_REPLACE';
export const BUGS_UPDATE   = 'BUGS_UPDATE';
export const LABEL_BUG     = 'LABEL_BUG';
export const LABEL_ADD    = 'LABEL_ADD';
export const LABEL_CREATE  = 'LABEL_CREATE';
export const LABEL_UPDATE  = 'LABEL_UPDATE';
export const LABEL_REMOVE  = 'LABEL_REMOVE';

export function loadFilter() {
  return dispatch => {
    BzBoardClient.loadFilter()
      .then(filter => {
        dispatch({
          type: FILTER_INIT,
          filter
        });
        dispatch(loadBugs(filter.value));
      })
  };
}

export function updateFilterName(newName) {
  return dispatch => {
    dispatch({
      type: FILTER_UPDATE_NAME,
      newName
    });
  };
}

export function updateFilterValue(newValue) {
  return dispatch => {
    dispatch({
      type: FILTER_UPDATE_VALUE,
      newValue
    });
    dispatch(loadBugs(newValue));
  };
}

export function loadBugs(searchString) {
  return dispatch => {
    BzClient.searchBugs(searchString)
      .then(bugs => dispatch(replaceAllBugs(bugs)));
  };
}


export function updateBugWhiteboard (bugId, whiteboard) {
  return dispatch => {
    BzClient.updateBugWhiteboard(bugId, whiteboard)
      .then(res => {
        let changedId = res.bugs.map(bug => bug.id);
        return BzClient.getBugs([changedId]);
      })
      .then(bugs => dispatch(updateBugs(bugs)));
  };
}

function updateBugs(bugs) {
  return {
    type: BUGS_UPDATE,
    bugs
  };
}

function replaceAllBugs (bugs) {
  return {
    type: BUGS_REPLACE,
    bugs
  };
}

export function getLabels () {
  return dispatch => {
    BzBoardClient.getAllLabels()
      .then(rawLabels => {
        for (let label of Object.values(rawLabels)) {
          dispatch(addLabel(label));
        }
      });
  };
}

function addLabel (label) {
  return dispatch => {
    dispatch({
      type: LABEL_ADD,
      label
    });
  }
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
  return dispatch => {
    dispatch({
      type: LABEL_UPDATE,
      label
    });
  };
}

export function removeLabel (id) {
  return {
    type: LABEL_REMOVE,
    id
  };
}
