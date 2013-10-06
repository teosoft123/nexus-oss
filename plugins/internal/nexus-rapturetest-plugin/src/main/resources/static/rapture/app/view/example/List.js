Ext.define('NX.view.example.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.userlist',

  title: 'All Users',

  store: 'example.Users',

  initComponent: function () {
    this.columns = [
      {header: 'Name', dataIndex: 'name', flex: 1},
      {header: 'Email', dataIndex: 'email', flex: 1}
    ];

    this.callParent(arguments);
  }
});
