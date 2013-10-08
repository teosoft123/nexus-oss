Ext.define('NX.capabilities.controller.Capabilities', {
  extend: 'Ext.app.Controller',

  stores: [
    'Capabilities',
    'CapabilityTypes'
  ],
  models: [
    'Capability',
    'CapabilityType'
  ],
  views: [
    'MasterDetail',
    'List',
    'Summary',
    'Settings',
    'Status',
    'About',
    'Edit'
  ],
  refs: [
    {
      ref: 'masterDetail',
      selector: 'capabilityMasterDetail'
    }
  ],

  init: function () {
    this.control({
      'featurebrowser': {
        beforerender: this.addToBrowser
      },
      'capabilityList': {
        beforerender: this.loadCapabilities,
        selectionchange: this.showDetails
      },
      'capabilityEdit button[action=save]': {
        click: this.updateCapability
      }
    });
  },

  addToBrowser: function (featureBrowser) {
    featureBrowser.add(this.getMasterDetailView());
  },

  loadCapabilities: function () {
    this.getCapabilitiesStore().load();
    this.getCapabilityTypesStore().load();
  },

  showDetails: function (selectionModel, selectedModels) {
    var detail = this.getMasterDetail().down('nxDetail');
    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      detail.setTitle(selectedModels[0].data.typeName)
      detail.getLayout().setActiveItem(1);
    }
    else {
      detail.setTitle('Empty selection')
      detail.getLayout().setActiveItem(0);
    }
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