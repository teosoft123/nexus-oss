Ext.define('NX.pluginconsole.store.PluginInfo', {
  extend: 'Ext.data.Store',
  model: 'NX.pluginconsole.model.PluginInfo',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    api: {
      read: NX.direct.PluginConsole.read
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
