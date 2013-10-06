Ext.define('NX.view.Viewport', {
  extend: 'Ext.container.Viewport',

  layout: 'fit',
  items: [
    {
      xtype: 'userlist'
    }
  ]
});