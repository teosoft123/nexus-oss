Ext.define('NX.LogAware', {
  requires: [
      'NX.Log'
  ],

  /**
   * @param {String} level
   * @param {Array} args
   */
  log: function (level, args) {
    args.unshift('[' + Ext.getClassName(this) + ']');
    NX.Log.log(level, args);
  },

  /**
   * @protected
   */
  logDebug: function () {
    this.log('debug', Array.prototype.slice.call(arguments));
  },

  /**
   * @protected
   */
  logInfo: function () {
    this.log('info', Array.prototype.slice.call(arguments));
  },

  /**
   * @protected
   */
  logWarn: function () {
    this.log('warn', Array.prototype.slice.call(arguments));
  },

  /**
   * @protected
   */
  logError: function () {
    this.log('error', Array.prototype.slice.call(arguments));
  }
});