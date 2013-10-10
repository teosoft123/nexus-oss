Ext.define('NX.repository.view.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.nx-repository-list',

  store: 'RepositoryInfo',

  columns: [
    {header: 'Name', dataIndex: 'name', flex: 1},
    {header: 'Type', dataIndex: 'type', flex: 1},
    {header: 'Format', dataIndex: 'format', flex: 1}
  ],

  tbar: [
    { xtype: 'button', text: 'Delete', action: 'delete', disabled: true }
  ]

});
