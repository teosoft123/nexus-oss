Ext.define('NX.example.view.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.userlist',

  title: 'Example',

  store: 'Users',

  initComponent: function () {
    this.columns = [
      {header: 'Name', dataIndex: 'name', flex: 1},
      {header: 'Email', dataIndex: 'email', flex: 1}
    ];

    this.callParent(arguments);
  }
});
