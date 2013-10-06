Ext.define('NX.view.FeatureBrowser', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.featurebrowser',

  config: {
    tabPosition: 'left'
  },

  initComponent: function () {
    var self = this;

    self.items = [
      {
        xtype: 'userlist'
      }
    ];

    this.callParent(arguments);
  }
});