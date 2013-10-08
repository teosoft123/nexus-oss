Ext.define('NX.capabilities.controller.Capabilities', {
  extend: 'Ext.app.Controller',

  stores: [
    'Capability',
    'CapabilityStatus',
    'CapabilityType'
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
        beforerender: this.loadStores,
        selectionchange: this.showDetails
      },
      'nx-capability-summary button[action=save]': {
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

  loadStores: function () {
    this.getCapabilityStore().load();
    this.getCapabilityStatusStore().load();
    this.getCapabilityTypeStore().load();
  },

  reloadStores: function () {
    this.getCapabilityStore().reload();
    this.getCapabilityStatusStore().reload();
    this.getCapabilityTypeStore().reload();
  },

  showDetails: function (selectionModel, selectedModels) {
    var me = this,
        masterdetail = me.getList().up('nx-masterdetail-panel'),
        status, info, summary, capabilityModel, capabilityTypeModel;

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
      summary = me.getSummary();
      summary.showInfo(info);

      capabilityModel = me.getCapabilityStore().getById(status.id);
      summary.down('form').loadRecord(capabilityModel);

      capabilityTypeModel = me.getCapabilityTypeStore().getById(status.typeId);
      me.getAbout().showAbout(capabilityTypeModel.get('about'));
      me.getStatus().showStatus(status.status);
    }

  },

  updateCapability: function () {
    var form = this.getSummary().down('form'),
        capabilityModel = form.getRecord(),
        values = form.getValues();

    capabilityModel.set(values);
    this.getCapabilityStore().sync({
      callback: function(){
        this.reloadStores();
      },
      scope: this
    });
  }

});