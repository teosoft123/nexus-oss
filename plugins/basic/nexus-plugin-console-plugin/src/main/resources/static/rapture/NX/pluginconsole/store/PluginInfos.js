Ext.define('NX.pluginconsole.store.PluginInfos', {
  extend: 'Ext.data.Store',
  model: 'NX.pluginconsole.model.PluginInfo',

  proxy: {
    type: 'direct',
    paramsAsHash: false,
    directFn: PluginConsole.listPluginInfos,

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
