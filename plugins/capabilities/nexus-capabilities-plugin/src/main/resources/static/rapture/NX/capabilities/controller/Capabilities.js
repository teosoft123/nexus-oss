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
    'List',
    'Summary',
    'Settings',
    'Status',
    'About'
  ],

  refs: [
    {
      ref: 'list',
      selector: 'nx-capability-list'
    }
  ],

  init: function () {
    this.control({
      'nx-featurebrowser': {
        beforerender: this.addToBrowser
      },
      'nx-capability-list': {
        beforerender: this.loadCapabilities,
        selectionchange: this.showDetails
      }
    });
  },

  addToBrowser: function (featureBrowser) {
    featureBrowser.add(
        {
          xtype: 'nx-masterdetail-panel',
          title: 'Capability',
          list: 'nx-capability-list',
          tabs: [
            { xtype: 'nx-capability-summary' },
            { xtype: 'nx-capability-settings' },
            { xtype: 'nx-capability-status' },
            { xtype: 'nx-capability-about' }
          ]
        }
    );
  },

  loadCapabilities: function () {
    this.getCapabilitiesStore().load();
    this.getCapabilityTypesStore().load();
  },

  showDetails: function (selectionModel, selectedModels) {
    var masterdetail = this.getList().up('nx-masterdetail-panel');
    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      masterdetail.setDescription(selectedModels[0].data.typeName);
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