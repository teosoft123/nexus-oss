Ext.define('NX.repository.store.RepositoryInfo', {
  extend: 'Ext.data.Store',
  model: 'NX.repository.model.RepositoryInfo',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.repository.Repository.readInfo
    },

    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id',
      successProperty: 'success'
    }
  },

  sortOnLoad: true,
  sorters: { property: 'name', direction: 'ASC' }

});
