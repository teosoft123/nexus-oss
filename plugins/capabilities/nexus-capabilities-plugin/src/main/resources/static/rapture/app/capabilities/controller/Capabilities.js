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
      'featurebrowser': {
        beforerender: this.addToBrowser
      },
      'capabilitylist': {
        beforerender: this.loadCapabilities,
        itemdblclick: this.editCapability
      },
      'capabilityedit button[action=save]': {
        click: this.updateCapability
      }
    });
  },

  addToBrowser: function (featureBrowser) {
    featureBrowser.add(this.getListView());
  },

  loadCapabilities: function () {
    this.getCapabilitiesStore().load();
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