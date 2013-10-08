Ext.define('NX.capabilities.store.Capabilities', {
  extend: 'Ext.data.Store',
  model: 'NX.capabilities.model.Capability',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    directFn: NX.direct.Capabilities.list,

    reader: {
      type: 'json',
      root: 'entries',
      idProperty: 'capability.id',
      successProperty: 'success'
    }
  },

  sortOnLoad: true,
  sorters: { property: 'typeName', direction: 'ASC' }

});
