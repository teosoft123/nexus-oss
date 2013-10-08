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

    this.addEvents('selectionchange');

    this.down(this.list).on('selectionchange', this.selectionChange, this);
  },

  selectionChange: function (selectionModel, selectedModels) {
    this.fireEvent('selectionchange', this, selectedModels);
  },

  destroy: function () {
    this.down(this.list).un('selectionchange', this.selectionChange);
  },

  setDescription: function (title) {
    this.down('nx-masterdetail-tabs').setTitle(title);
  }

});
