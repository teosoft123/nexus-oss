Ext.define('NX.capability.store.CapabilityStatus', {
  extend: 'Ext.data.Store',
  model: 'NX.capability.model.CapabilityStatus',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.capabilities.Capability.readStatus,
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
