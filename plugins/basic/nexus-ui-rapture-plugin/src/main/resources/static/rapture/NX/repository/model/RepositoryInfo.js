Ext.define('NX.repository.model.RepositoryInfo', {
  extend: 'Ext.data.Model',
  fields: [
    'id',
    'name',
    'type',
    'format',
    'localStatus',
    'proxyMode',
    'remoteStatus',
    'remoteStatusReason',
    'status',
    'url'
  ]
});
