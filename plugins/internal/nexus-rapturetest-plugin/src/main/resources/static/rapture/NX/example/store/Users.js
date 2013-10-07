Ext.define('NX.example.store.Users', {
  extend: 'Ext.data.Store',
  model: 'NX.example.model.User',

  data: [
    {name: 'Jason', email: 'jdillon@sonatype.com'},
    {name: 'Alin', email: 'alin@sonatype.com'}
  ]
});
