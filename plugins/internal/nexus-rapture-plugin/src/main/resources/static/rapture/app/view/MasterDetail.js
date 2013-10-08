Ext.define('NX.view.MasterDetail', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nxMasterDetail',

  layout: 'border',

  initComponent: function () {
    this.items = [
      {
        xtype: this.master,
        region: 'center',
        flex: 0.5
      },
      {
        xtype: 'nxDetail',
        modelName: this.modelName || this.title.toLowerCase(),
        items: this.details
      }
    ];

    this.callParent(arguments);
  }

});
