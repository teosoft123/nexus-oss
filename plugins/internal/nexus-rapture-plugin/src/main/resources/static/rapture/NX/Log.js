Ext.define('NX.Log', {
  singleton: true,

  /**
   * @param {String} level
   * @param {Array} args
   */
  log: function (level, args) {
    var msg;
    args.unshift('[' + level.toUpperCase() + ']');
    msg = args.join(' ');

    switch (level) {
      case 'debug':
        console.log(msg);
        break;
      case 'info':
        console.info(msg);
        break;
      case 'warn':
        console.warn(msg);
        break;
      case 'error':
        console.error(msg);
        break;
      default:
        Ext.Error.raise('Invalid log level: ' + level);
    }
  },

  debug: function () {
    this.log('debug', Array.prototype.slice.call(arguments));
  },

  info: function () {
    this.log('info', Array.prototype.slice.call(arguments));
  },

  warn: function () {
    this.log('warn', Array.prototype.slice.call(arguments));
  },

  error: function () {
    this.log('error', Array.prototype.slice.call(arguments));
  }
});