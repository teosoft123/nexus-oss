Ext.define('NX.capabilities.store.Capability', {
  extend: 'Ext.data.Store',
  model: 'NX.capabilities.model.Capability',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.Capability.read,
      update: NX.direct.Capability.update
    },

    reader: {
      type: 'json',
      root: 'entries',
      idProperty: 'id',
      successProperty: 'success'
    }
  }

});
