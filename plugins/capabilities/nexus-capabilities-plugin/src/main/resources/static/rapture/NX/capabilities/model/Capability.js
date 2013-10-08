Ext.define('NX.capabilities.model.Capability', {
  extend: 'Ext.data.Model',
  fields: [
    'typeName',
    'description',
    'capability',
    'tags',
    {name: 'notes', mapping: 'capability.notes'}
  ]
});
