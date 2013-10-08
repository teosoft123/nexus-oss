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
    'About',
    'Edit'
  ],

  refs: [
    {
      ref: 'list',
      selector: 'nx-capability-list'
    }
  ],

  init: function () {
    this.control({
      'featurebrowser': {
        beforerender: this.addToBrowser
      },
      'nx-capability-list': {
        beforerender: this.loadCapabilities,
        selectionchange: this.showDetails
      },
      'nx-capability-edit button[action=save]': {
        click: this.updateCapability
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
    var detail = this.getList().up('nx-masterdetail-panel').down('nx-masterdetail-tabs');
    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      detail.setTitle(selectedModels[0].data.typeName);
      detail.getLayout().setActiveItem(1);
    }
    else {
      detail.setTitle('Empty selection');
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