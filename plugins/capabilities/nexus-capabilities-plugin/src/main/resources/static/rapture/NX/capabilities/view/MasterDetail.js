Ext.define('NX.capabilities.view.MasterDetail', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.capabilityMasterDetail',

  title: 'Capabilities',
  layout: 'border',

  items: [
    {
      xtype: 'capabilityList',
      region: 'center',
      flex: 0.5
    },
    {
      xtype: 'nxDetail',
      items: [
          { xtype: 'capabilitySummary' },
          { xtype: 'capabilitySettings' },
          { xtype: 'capabilityStatus' },
          { xtype: 'capabilityAbout' }
        ]
    }
  ]

});
