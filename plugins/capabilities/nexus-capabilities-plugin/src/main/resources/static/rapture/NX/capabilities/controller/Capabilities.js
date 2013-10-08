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
      selector: 'capabilityList'
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
    featureBrowser.add(
        {
          xtype: 'nxMasterDetailPanel',
          title: 'Capability',
          list: 'capabilityList',
          tabs: [
            { xtype: 'capabilitySummary' },
            { xtype: 'capabilitySettings' },
            { xtype: 'capabilityStatus' },
            { xtype: 'capabilityAbout' }
          ]
        }
    );
  },

  loadCapabilities: function () {
    this.getCapabilitiesStore().load();
    this.getCapabilityTypesStore().load();
  },

  showDetails: function (selectionModel, selectedModels) {
    var detail = this.getList().up('nxMasterDetailPanel').down('nxMasterDetailTabs');
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