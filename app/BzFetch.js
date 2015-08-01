/**
 * Fetch filter results from bugzilla
 */

const BZ_DOMAIN = "https://bugzilla.mozilla.org";
const REST_BUG  = "/rest/bug";

let BzFetch = {
  fetch: function(options) {
    return this._fetchFromUrl(this._optionsToUrl(options));
  },

  _optionsToUrl: function(options) {
    if (!this.bzParams.isWhiteListed(Object.keys(options))) {
      throw "Invalid Bugzilla parameter.";
    }

    let url = BZ_DOMAIN + REST_BUG + "?";
    for (let key of Object.keys(options)) {
      url += key + "=" + options[key] + "&";
    }
    return url.substr(0, url.length-1);
  },

  _fetchFromUrl: function(url) {
    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.open('GET', url);
      req.setRequestHeader("Content-type", "application/json");
      req.setRequestHeader("Accept", "application/json");

      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
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
  },

  _requestResponse: function() {
    console.log(this.responseText);
  },


  bzParams : {
    PARAMS_WHITELIST: [
      "alias",
      "assigned_to",
      "component",
      "creation_time",
      "creator",
      "id",
      "last_change_time",
      "limit",
      "offset",
      "op_sys",
      "platform",
      "priority",
      "product",
      "resolution",
      "severity",
      "status",
      "summary",
      "tags",
      "target_milestone",
      "qa_contact",
      "url",
      "version",
      "whiteboard",
      "quicksearch",
    ],

    isWhiteListed: function(params) {
      if (!Array.isArray(params)) {
        params = [params];
      }
      return params.every(p => this.PARAMS_WHITELIST.some(w => w == p));
    },
  },
}