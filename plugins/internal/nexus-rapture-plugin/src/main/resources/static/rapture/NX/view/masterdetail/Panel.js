Ext.define('NX.view.masterdetail.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nxMasterDetailPanel',

  layout: 'border',

  initComponent: function () {
    this.items = [
      {
        xtype: this.list,
        region: 'center',
        flex: 0.5
      },
      {
        xtype: 'nxMasterDetailTabs',
        modelName: this.modelName || this.title.toLowerCase(),
        items: this.tabs
      }
    ];

    this.callParent(arguments);
  }

});
