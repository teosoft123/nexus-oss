Ext.define('NX.capabilities.view.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.nx-capability-list',

  store: 'CapabilityStatus',

  columns: [
    { header: 'Type', dataIndex: 'typeName', flex: 1 },
    { header: 'Description', dataIndex: 'description', flex: 1 },
    { header: 'Notes', dataIndex: 'notes', flex: 1 }
  ],

  viewConfig: {
    getRowClass: function (record) {
      if (record.get('enabled') && !record.get('active')) {
        return 'nx-red-marker';
      }
    }
  },

  tbar: [
    { xtype: 'button', text: 'New', action: 'new' }
  ]

});
