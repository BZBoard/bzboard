/**
 * Client class that talks to bugzilla
 */

const BZ_DOMAIN = "https://bugzilla.mozilla.org";
const REST_BUG  = "/rest/bug";

export default {
  getBugs: function(bugIds) {
    if (!Array.isArray(bugIds)) {
      bugIds = [bugIds];
    }
    let url = BZ_DOMAIN + REST_BUG + "?id=" + bugIds.join(",");
    return this._fetchFromUrl(url);
  },

  searchBugs: function(filter, excludeIds) {
    if(!filter) {
      return Promise.resolve([]);
    }
    if (!Array.isArray(excludeIds)) {
      excludeIds = [excludeIds];
    }
    let url = BZ_DOMAIN + REST_BUG + "?query_format=advanced&quicksearch="
              + encodeURIComponent(filter) + "&f0=bug_id&o0=anyexact&v0="
              + excludeIds.join(",");
    return this._fetchFromUrl(url);
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
