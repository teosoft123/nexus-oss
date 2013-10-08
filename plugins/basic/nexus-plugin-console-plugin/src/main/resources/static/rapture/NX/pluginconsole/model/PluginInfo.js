Ext.define('NX.pluginconsole.model.PluginInfo', {
  extend: 'Ext.data.Model',
  fields: [
    'name',
    'version',
    'description',
    'status',
    'scmVersion',
    'scmTimestamp',
    'site',
    'documentation'
  ]
});
