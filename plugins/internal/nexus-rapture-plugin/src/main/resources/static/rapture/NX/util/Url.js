Ext.define('NX.util.Url', {
  singleton: true,

  baseUrl: window.location.protocol
      + '//'
      + window.location.host
      + '/'
      +
      (window.location.pathname.split('/').length > 2 ? window.location.pathname.split('/')[1] + '/' : ''),

  urlOf: function (path) {
    var baseUrl = this.baseUrl;

    if (!Ext.isEmpty(path)) {
      if (Ext.String.endsWith(baseUrl, '/')) {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
      }
      if (!Ext.String.startsWith(path, '/')) {
        path = '/' + path;
      }
      return baseUrl + path;
    }
    return this.baseUrl;
  }

});