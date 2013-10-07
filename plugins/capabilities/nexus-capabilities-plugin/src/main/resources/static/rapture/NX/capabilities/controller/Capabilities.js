Ext.define('NX.capabilities.controller.Capabilities', {
  extend: 'Ext.app.Controller',

  stores: [
    'Capabilities'
  ],
  models: [
    'Capability'
  ],
  views: [
    'MasterDetail',
    'List',
    'Detail',
    'Edit'
  ],
  refs: [
    {
      ref: 'detail',
      selector: 'capabilitydetail'
    }
  ],

  init: function () {
    this.control({
      'featurebrowser': {
        beforerender: this.addToBrowser
      },
      'capabilitylist': {
        beforerender: this.loadCapabilities,
        itemclick: this.showDetails
      },
      'capabilityedit button[action=save]': {
        click: this.updateCapability
      }
    });
  },

  addToBrowser: function (featureBrowser) {
    featureBrowser.add(this.getMasterDetailView());
  },

  loadCapabilities: function () {
    this.getCapabilitiesStore().load();
  },

  showDetails: function (grid, record) {
    this.getDetail().setTitle(record.data.typeName);
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