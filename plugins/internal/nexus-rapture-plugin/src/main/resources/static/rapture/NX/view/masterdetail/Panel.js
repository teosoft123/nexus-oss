Ext.define('NX.view.masterdetail.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nx-masterdetail-panel',

  layout: 'border',

  initComponent: function () {
    this.items = [
      {
        xtype: this.list,
        region: 'center',
        flex: 0.5
      },
      {
        xtype: 'nx-masterdetail-tabs',
        modelName: this.modelName || this.title.toLowerCase(),
        emptyText: this.emptyText,
        items: this.tabs
      }
    ];

    this.callParent(arguments);
  }

});
