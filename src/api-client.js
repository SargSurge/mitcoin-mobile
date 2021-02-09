import Constants from "expo-constants";
import { URL, URLSearchParams } from "react-native-url-polyfill";

var API_HOST;

if ( __DEV__ ) {
  API_HOST = Constants.manifest.extra.apiHost.development;
} else {
  API_HOST = Constants.manifest.extra.apiHost.production;
}

function API(host) {
  this.host = host;
}

API.prototype.path = function(path, params) {
  var url = new URL(this.host);
  url.pathname = path;

  if ( params ) {
    for ( paramKey in params ) {
      url.searchParams.set(paramKey, params[paramKey]);
    }
  }

  return url.toString();
}

export default new API(API_HOST);
