Ext.define('NX.capability.store.Capability', {
  extend: 'Ext.data.Store',
  model: 'NX.capability.model.Capability',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.capabilities.Capability.read
    },

    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id',
      successProperty: 'success'
    }
  }

});
