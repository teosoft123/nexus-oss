Ext.define('NX.store.Users', {
  extend: 'Ext.data.Store',
  model: 'NX.model.User',

  data: [
    {name: 'Ed', email: 'ed@sencha.com'},
    {name: 'Tommy', email: 'tommy@sencha.com'}
  ]
});
