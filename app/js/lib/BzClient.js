/**
 * Client class that talks to bugzilla
 */

const BZ_DOMAIN = "https://bugzilla.mozilla.org";
const REST_BUG  = "/rest/bug";
import Url from 'url'

const WHITEBOARD_STUB_KEY = "bzboard.whiteboard_stub";
const INCLUDED_FIELDS = "id,assigned_to,summary,status,whiteboard,is_open,last_change_time";

export default {
  _addWhiteboardStubToBugs(bugs) {
    let whiteboards = this._getWhiteboards();
    bugs.forEach(bug => {
      if (whiteboards[bug.id]) {
        bug.whiteboard = whiteboards[bug.id];
      }
    });
    return bugs;
  },

  getBugs: function(bugIds) {
    if (!Array.isArray(bugIds)) {
      bugIds = [bugIds];
    }
    let url = BZ_DOMAIN + REST_BUG + "?id=" + bugIds.join(",");
    return this._fetchFromUrl(url)
    .then(obj => Object.values(obj))
    .then(bugs => this._addWhiteboardStubToBugs(bugs));
  },

  searchBugs: function(filter, excludeIds) {
    if(!filter) {
      return Promise.resolve([]);
    }
    if (!Array.isArray(excludeIds)) {
      excludeIds = [excludeIds];
    }
    let url;
    if (filter.startsWith("https://bugzilla.mozilla.org/rest/bug")) {
    // The user provided a rest search URL, not awesome but it works for now
      let parsedUrl = Url.parse(filter, true);
      parsedUrl.query.include_fields = INCLUDED_FIELDS;
      parsedUrl.search = null; // Reset this otherwise query is not used
      url = Url.format(parsedUrl);
    } else {
      url = BZ_DOMAIN + REST_BUG + "?query_format=advanced&quicksearch="
            + encodeURIComponent(filter)
            + "&include_fields=" + INCLUDED_FIELDS
            + "&f0=bug_id&o0=anyexact&v0="
            + excludeIds.join(",");
    }

    return this._fetchFromUrl(url)
    .then(bugs => this._addWhiteboardStubToBugs(bugs));
  },

  _getWhiteboards: function() {
    try {
      return JSON.parse(localStorage.getItem(WHITEBOARD_STUB_KEY)) || {};
    } catch (e) {
      return {};
    }
  },

  _setWhiteboards: function(whiteboards) {
    localStorage.setItem(WHITEBOARD_STUB_KEY, JSON.stringify(whiteboards));
  },

  updateBugWhiteboard: function(bugId, newWhiteboard) {
    let whiteboards = this._getWhiteboards();
    // TODO: REPLACE THIS BY ACTUALLY CHANGING IT IN BUGZILLA (NEED APPROVAL)
    whiteboards[bugId] = newWhiteboard;
    this._setWhiteboards(whiteboards);
    return Promise.resolve({ bugs: [ { id: bugId } ] }); // Stub response from Bugzills
  },

  _fetchFromUrl: function(url) {
    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.open('GET', url);
      req.setRequestHeader("Content-type", "application/json");
      req.setRequestHeader("Accept", "application/json");

      req.onload = function() {
        if (req.status == 200) {
          try {
            resolve(JSON.parse(req.response).bugs);
          } catch (e) {
            console.log("Failed to parse the request bugs");
            reject(Error(e));
          }
        }
        else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send();
    });
  }
}
