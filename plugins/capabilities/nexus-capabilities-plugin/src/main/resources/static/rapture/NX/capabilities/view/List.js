Ext.define('NX.capabilities.view.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.nx-capability-list',

  store: 'CapabilityStatus',

  initComponent: function () {
    this.columns = [
      {header: 'Type', dataIndex: 'typeName', flex: 1},
      {header: 'Description', dataIndex: 'description', flex: 1},
      {header: 'Notes', dataIndex: 'notes', flex: 1}
    ];

    this.callParent(arguments);
  }
});
