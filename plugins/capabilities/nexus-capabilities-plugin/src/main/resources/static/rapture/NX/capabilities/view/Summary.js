Ext.define('NX.capabilities.view.Summary', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nx-capability-summary',

  title: 'Summary',

  items: [
    {
      xtype: 'nx-info'
    }
  ],

  showInfo: function (info) {
    this.down('nx-info').showInfo(info);
  }

});
