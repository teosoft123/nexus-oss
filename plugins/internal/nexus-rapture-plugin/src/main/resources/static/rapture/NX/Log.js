Ext.define('NX.Log', {
  singleton: true,

  /**
   * @param {String} level
   * @param {Array} args
   */
  log: function (level, args) {
    var config = {
      level: level,
      msg: args.join(' ')
    };

    // translate debug -> log for Ext.log
    if (level === 'debug') {
      config.level = 'log';
    }

    Ext.log(config);
  },

  /**
   * @public
   */
  debug: function () {
    this.log('debug', Array.prototype.slice.call(arguments));
  },

  /**
   * @public
   */
  info: function () {
    this.log('info', Array.prototype.slice.call(arguments));
  },

  /**
   * @public
   */
  warn: function () {
    this.log('warn', Array.prototype.slice.call(arguments));
  },

  /**
   * @public
   */
  error: function () {
    this.log('error', Array.prototype.slice.call(arguments));
  }
});