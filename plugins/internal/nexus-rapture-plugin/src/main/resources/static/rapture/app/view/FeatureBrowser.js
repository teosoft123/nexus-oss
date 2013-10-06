Ext.define('NX.view.FeatureBrowser', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.featurebrowser',

  tabPosition: 'left',

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