Ext.define('NX.capabilities.controller.Capabilities', {
  extend: 'Ext.app.Controller',

  stores: [
    'Capabilities'
  ],
  models: [
    'Capability'
  ],
  views: [
    'List',
    'Edit'
  ],

  init: function () {
    this.control({
      'capabilitylist': {
        show: function () {
          this.getCapabilitiesStore().load();
        },
        itemdblclick: this.editCapability
      },
      'capabilityedit button[action=save]': {
        click: this.updateCapability
      }
    });
  },

  editCapability: function (grid, record) {
    var view = Ext.widget('capabilityedit');
    view.down('form').loadRecord(record);
  },

  updateCapability: function (button) {
    var win = button.up('window'),
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();

    record.set(values);
    win.close();
  }
});