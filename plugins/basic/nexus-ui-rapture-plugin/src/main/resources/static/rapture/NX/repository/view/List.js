Ext.define('NX.repository.view.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.nx-repository-list',

  store: 'Repository',

  initComponent: function () {
    this.columns = [
      {header: 'Name', dataIndex: 'name', flex: 1}
    ];

    this.callParent(arguments);
  }
});
