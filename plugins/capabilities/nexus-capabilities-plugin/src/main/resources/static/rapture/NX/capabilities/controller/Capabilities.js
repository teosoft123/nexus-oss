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
    'About',
    'SettingsFieldSet'
  ],

  refs: [
    { ref: 'list', selector: 'nx-capability-list' },
    { ref: 'summary', selector: 'nx-capability-summary' },
    { ref: 'settings', selector: 'nx-capability-settings' },
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
      },
      'nx-capability-settings button[action=save]': {
        click: this.updateCapability
      }
    });

    this.getCapabilityStatusStore().on('load', this.onCapabilityStatusStoreLoad, this);
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

  onCapabilityStatusStoreLoad: function () {
    var sm = this.getList().getSelectionModel();
    this.showDetails(sm, sm.getSelection());
  },

  showDetails: function (selectionModel, selectedModels) {
    var me = this,
        capabilityStatusModel, capabilityModel, capabilityTypeModel;

    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      capabilityStatusModel = selectedModels[0];
      capabilityModel = me.getCapabilityStore().getById(capabilityStatusModel.get('id'));
      capabilityTypeModel = me.getCapabilityTypeStore().getById(capabilityStatusModel.get('typeId'));

      me.showTitle(capabilityStatusModel);
      me.showSummary(capabilityStatusModel, capabilityModel);
      me.showSettings(capabilityModel, capabilityTypeModel);
      me.showAbout(capabilityTypeModel);
      me.showStatus(capabilityStatusModel);
    }
  },

  showTitle: function (capabilityStatusModel) {
    var masterdetail = this.getList().up('nx-masterdetail-panel');

    masterdetail.setDescription(capabilityStatusModel.get('typeName'));
    if (capabilityStatusModel.get('enabled') && !capabilityStatusModel.get('active')) {
      masterdetail.showWarning(capabilityStatusModel.get('stateDescription'));
    }
    else {
      masterdetail.clearWarning();
    }
  },

  showSummary: function (capabilityStatusModel, capabilityModel) {
    var summary = this.getSummary(),
        info = {
          'Type': capabilityStatusModel.get('typeName'),
          'Description': capabilityStatusModel.get('description')
        };

    if (Ext.isDefined(capabilityStatusModel.get('tags'))) {
      Ext.each(capabilityStatusModel.get('tags'), function (tag) {
        info[tag.key] = tag.value;
      });
    }

    summary.showInfo(info);
    summary.down('form').loadRecord(capabilityModel);
  },

  showSettings: function (capabilityModel, capabilityTypeModel) {
    var settings = this.getSettings(),
        settingsFieldSet = settings.down('nx-capability-settings-fieldset');

    settings.loadRecord(capabilityModel);
    settingsFieldSet.importCapability(settings.getForm(), capabilityModel, capabilityTypeModel);
  },

  showStatus: function (capabilityStatusModel) {
    this.getStatus().showStatus(capabilityStatusModel.get('status'));
  },

  showAbout: function (capabilityTypeModel) {
    this.getAbout().showAbout(capabilityTypeModel.get('about'));
  },

  updateCapability: function (button) {
    var me = this,
        form = button.up('form'),
        capabilityModel = form.getRecord(),
        values = form.getValues();

    capabilityModel.set(values);
    this.getCapabilityStore().sync({
      callback: function () {
        me.loadStores();
      },
      scope: this
    });
  }

});