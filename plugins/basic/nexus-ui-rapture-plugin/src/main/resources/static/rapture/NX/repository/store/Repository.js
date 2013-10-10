Ext.define('NX.repository.store.Repository', {
  extend: 'Ext.data.Store',
  model: 'NX.repository.model.Repository',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    directFn: NX.direct.Repository.read,

    reader: {
      type: 'json',
      root: 'entries',
      idProperty: 'id',
      successProperty: 'success'
    }
  },

  sortOnLoad: true,
  sorters: { property: 'name', direction: 'ASC' }

});
