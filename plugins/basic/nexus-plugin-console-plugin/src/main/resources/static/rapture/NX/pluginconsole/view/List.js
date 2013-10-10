Ext.define('NX.pluginconsole.view.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.nx-pluginconsole-list',

  store: 'PluginInfo',

  columns: [
    {header: 'Name', dataIndex: 'name', flex: 1},
    {header: 'Version', dataIndex: 'version', flex: 1},
    {header: 'Description', dataIndex: 'description', flex: 1}
  ]

});
