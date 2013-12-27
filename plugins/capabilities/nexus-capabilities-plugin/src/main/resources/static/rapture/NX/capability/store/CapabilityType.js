Ext.define('NX.capability.store.CapabilityType', {
  extend: 'Ext.data.Store',
  model: 'NX.capability.model.CapabilityType',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.capabilities.CapabilityType.read
    },

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
