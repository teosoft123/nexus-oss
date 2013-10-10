Ext.define('NX.util.ExtDirect', {
  singleton: true,

  requires: [
    'NX.util.Msg'
  ],

  showExceptionIfPresent: function (title, response, status, options) {
    if (Ext.isDefined(status.serverException)) {
      NX.util.Msg.showError(
          Ext.isDefined(response) && Ext.isDefined(response.exceptionMessage)
              ? response.exceptionMessage
              : status.serverException.exception.message,
          title,
          options
      );
      return true;
    }
    return false;
  }

});