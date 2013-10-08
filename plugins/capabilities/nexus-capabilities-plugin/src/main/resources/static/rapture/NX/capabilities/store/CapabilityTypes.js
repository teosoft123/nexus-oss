Ext.define('NX.capabilities.store.CapabilityTypes', {
  extend: 'Ext.data.Store',
  model: 'NX.capabilities.model.CapabilityType',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    directFn: NX.direct.CapabilityTypes.list,

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
