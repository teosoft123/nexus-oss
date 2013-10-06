Ext.define('NX.example.store.Users', {
  extend: 'Ext.data.Store',
  model: 'NX.example.model.User',

  data: [
    {name: 'Ed', email: 'ed@sencha.com'},
    {name: 'Tommy', email: 'tommy@sencha.com'}
  ]
});
