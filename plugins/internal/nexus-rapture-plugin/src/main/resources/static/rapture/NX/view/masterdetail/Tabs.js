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

  warningTpl: new Ext.XTemplate(
      '<div class="nx-masterdetail-warning">',
      '  <div>{icon}{text}</div>',
      '</div>',
      {
        compiled: true
      }
  ),

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

    this.description = this.title;

    this.callParent(arguments);
  },

  setDescription: function (description) {
    this.description = description;
    this.showTitle();
  },

  showWarning: function (message) {
    this.warning = message;
    this.showTitle();
  },

  clearWarning: function () {
    this.warning = undefined;
    this.showTitle();
  },

  showTitle: function () {
    var title = this.description;
    if (Ext.isDefined(this.warning)) {
      // TODO icon
      title += this.warningTpl.apply({
        text: this.warning
      });
    }
    this.setTitle(title);
  }

});
