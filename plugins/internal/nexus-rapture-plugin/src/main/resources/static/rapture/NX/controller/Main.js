Ext.define('NX.controller.Main', {
  extend: 'Ext.app.Controller',

  views: [
      'FeatureBrowser',
      'Info',
      'InfoPanel'
  ],

  init: function () {
    this.control({
      'nx-featurebrowser': {
        afterrender: this.setActiveTab
      }
    });
  },

  setActiveTab: function (featureBrowser) {
    // TODO any other algorithm?
    featureBrowser.setActiveTab(0);
  }

});