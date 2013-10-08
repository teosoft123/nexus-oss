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
    { ref: 'list', selector: 'nx-capability-list' },
    { ref: 'summary', selector: 'nx-capability-summary' },
    { ref: 'status', selector: 'nx-capability-status' },
    { ref: 'about', selector: 'nx-capability-about' }
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
    var me = this,
        masterdetail = me.getList().up('nx-masterdetail-panel'),
        status, info;

    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      status = selectedModels[0].data;
      masterdetail.setDescription(status.typeName);
      info = {
        'Type': status.typeName,
        'Description': status.description
      }
      if (Ext.isDefined(status.tags)) {
        Ext.each(status.tags, function (tag) {
          info[tag.key] = tag.value;
        });
      }
      me.getSummary().showInfo(info);
      me.getAbout().showAbout(me.getCapabilityTypesStore().getById(status.capability.typeId).get('about'));
      me.getStatus().showStatus(status.status);
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