Ext.define('NX.capabilities.store.CapabilityStatus', {
  extend: 'Ext.data.Store',
  model: 'NX.capabilities.model.CapabilityStatus',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.Capability.readStatus,
    },

    reader: {
      type: 'json',
      root: 'entries',
      idProperty: 'id',
      successProperty: 'success'
    }
  },

  sortOnLoad: true,
  sorters: { property: 'typeName', direction: 'ASC' }

});
