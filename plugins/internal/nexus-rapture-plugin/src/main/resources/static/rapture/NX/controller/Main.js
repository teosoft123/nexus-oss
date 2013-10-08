Ext.define('NX.controller.Main', {
  extend: 'Ext.app.Controller',

  views: [
      'FeatureBrowser',
      'MasterDetail',
      'Detail'
  ],

  init: function () {
    this.control({
      'featurebrowser': {
        afterrender: this.setActiveTab
      }
    });
  },

  setActiveTab: function (featureBrowser) {
    // TODO any other algorithm?
    featureBrowser.setActiveTab(0);
  }

});