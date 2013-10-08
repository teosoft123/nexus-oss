Ext.define('NX.view.masterdetail.Tabs', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nx-masterdetail-tabs',

  title: 'Empty Selection',

  layout: 'card',
  region: 'south',
  split: true,
  collapsible: true,
  flex: 0.5,
  activeItem: 0,

  initComponent: function () {
    var text = this.emptyText,
        content = this.items;

    if (!text) {
      text = 'Please select a ' + this.modelName + ' or create a new ' + this.modelName;
    }

    if (Ext.isArray(this.items) && this.items.length > 1) {
      content = {
        xtype: 'tabpanel',
        activeTab: 0,
        layoutOnTabChange: true,
        items: this.items
      }
    }

    this.items = [
      {
        xtype: 'panel',
        html: '<span class="nx-masterdetail-emptyselection-text">' + text + '</span>'
      },
      content
    ];

    this.callParent(arguments);
  }

});
