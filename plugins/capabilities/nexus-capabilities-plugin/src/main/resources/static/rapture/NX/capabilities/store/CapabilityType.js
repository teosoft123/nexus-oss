Ext.define('NX.capabilities.store.CapabilityType', {
  extend: 'Ext.data.Store',
  model: 'NX.capabilities.model.CapabilityType',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.CapabilityType.read
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
