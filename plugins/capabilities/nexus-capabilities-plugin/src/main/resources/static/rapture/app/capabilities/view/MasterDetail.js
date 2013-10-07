Ext.define('NX.capabilities.view.MasterDetail', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.capabilitymasterdetail',

  title: 'Capabilities',
  layout: 'border',

  initComponent: function () {
    this.items = [
      {
        xtype: 'capabilitylist',
        region: 'center',
        flex: 0.5
      },
      {
        xtype: 'capabilitydetail',
        region: 'south',
        split: true,
        collapsible: true,
        flex: 0.5
      }
    ];
    this.callParent(arguments);
  }

});
