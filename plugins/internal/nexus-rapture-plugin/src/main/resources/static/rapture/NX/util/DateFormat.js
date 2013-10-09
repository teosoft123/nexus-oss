Ext.define('NX.util.DateFormat', {
  singleton: true,

  mixins: [
    'NX.LogAware'
  ],

  /**
   * @private
   */
  defaultPatterns: {
    date: {
      'short': 'Y-M-d',       // 2013-Mar-06
      'long': 'l, F d, Y'     // Wednesday, March 06, 2013
    },

    time: {
      'short': 'H:i:s',                   // 15:49:57
      'long': 'H:i:s T (\\G\\M\\TO)'      // 15:49:57-0700 PST (GMT-0700)
    },

    datetime: {
      'short': 'Y-M-d H:i:s',                     // 2013-Mar-06 15:49:57
      'long': 'l, F d, Y H:i:s T (\\G\\M\\TO)'    // Wednesday, March 06, 2013 15:50:19 PDT (GMT-0700)
    }
  },

  /**
   * Return the date format object for the given name.
   *
   * Date format objects currently have a 'short' and 'long' variants.
   *
   *      @example
   *      var longDatetimePattern = NX.util.DateFormat.forName('datetime')['long'];
   *      var shortDatePattern = NX.util.DateFormat.forName('date')['short'];
   *
   * @param name
   *
   * @return {*} Date format object.
   */
  forName: function (name) {
    var format = this.defaultPatterns[name];

    // if no format, complain and return the full ISO-8601 format
    if (!name) {
      this.logWarn('Missing named format:' + name);
      return 'c';
    }

    // TODO: Eventually let this customizable by user, for now its hardcoded

    return format;
  }
});
