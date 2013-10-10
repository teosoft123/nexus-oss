Ext.define('NX.util.Msg', {
  singleton: true,

  showError: function (title, message, options) {
    if (Ext.isDefined(message)) {
      options = options || {};
      Ext.Msg.show({
        title: title || 'Operation failed',
        msg: message,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
        closeable: false,
        animEl: options.animEl
      });
    }
  },

  askConfirmation: function (title, message, onYesFn, options) {
    options = options || {};
    Ext.Msg.show({
      title: title,
      msg: message,
      buttons: Ext.Msg.YESNO,
      icon: Ext.MessageBox.QUESTION,
      closeable: false,
      animEl: options.animEl,
      fn: function (buttonName) {
        if (buttonName === 'yes' || buttonName === 'ok') {
          if (Ext.isDefined(onYesFn)) {
            onYesFn.call(options.scope);
          }
        }
      }
    });
  }

});