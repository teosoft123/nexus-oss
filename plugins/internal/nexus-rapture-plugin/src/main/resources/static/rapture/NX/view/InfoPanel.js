Ext.define('NX.view.InfoPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nx-info-panel',

  items: {
    xtype: 'nx-info'
  },

  showInfo: function (info) {
    this.down('nx-info').showInfo(info);
  }

});
