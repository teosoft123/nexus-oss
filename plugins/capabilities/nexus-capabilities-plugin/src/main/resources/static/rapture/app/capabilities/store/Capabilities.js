Ext.define('NX.capabilities.store.Capabilities', {
  extend: 'Ext.data.Store',
  model: 'NX.capabilities.model.Capability',

  proxy: {
    type: 'ajax',
    url: '/nexus/service/siesta/capabilities',
    headers: {
      'accept': 'application/json'
    },
    reader: {
      type: 'json',
      idProperty: 'capability.id'
    }
  },

  sortOnLoad: true,
  sorters: { property: 'typeName', direction: 'ASC' }

});
