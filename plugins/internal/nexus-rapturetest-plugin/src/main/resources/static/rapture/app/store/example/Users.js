Ext.define('NX.store.example.Users', {
  extend: 'Ext.data.Store',
  model: 'NX.model.example.User',

  data: [
    {name: 'Ed', email: 'ed@sencha.com'},
    {name: 'Tommy', email: 'tommy@sencha.com'}
  ]
});
