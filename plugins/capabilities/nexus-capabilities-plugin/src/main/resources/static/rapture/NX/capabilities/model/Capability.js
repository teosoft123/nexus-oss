Ext.define('NX.capabilities.model.Capability', {
  extend: 'Ext.data.Model',
  fields: [
    'typeName',
    'description',
    'status',
    'capability',
    'tags',
    {name: 'notes', mapping: 'capability.notes'}
  ]
});
