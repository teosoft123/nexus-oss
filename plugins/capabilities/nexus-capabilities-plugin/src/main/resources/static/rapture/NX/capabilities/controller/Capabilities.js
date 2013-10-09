Ext.define('NX.capabilities.controller.Capabilities', {
  extend: 'Ext.app.Controller',

  stores: [
    'Capability',
    'CapabilityStatus',
    'CapabilityType'
  ],
  models: [
    'Capability'
  ],
  views: [
    'Add',
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
      'nx-capability-list button[action=new]': {
        click: this.showAddWindow
      },
      'nx-capability-list button[action=delete]': {
        click: this.deleteCapability
      },
      'nx-capability-summary button[action=save]': {
        click: this.updateCapability
      },
      'nx-capability-settings button[action=save]': {
        click: this.updateCapability
      },
      'nx-capability-add combo[name=typeId]': {
        select: this.changeCapabilityType
      },
      'nx-capability-add button[action=add]': {
        click: this.createCapability
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

    masterdetail.setDescription(this.describeCapability(capabilityStatusModel));
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

  showAddWindow: function () {
    Ext.widget('nx-capability-add', {
      capabilityTypeStore: this.getCapabilityTypeStore()
    });
  },

  changeCapabilityType: function (combo) {
    var win = combo.up('window'),
        capabilityTypeModel;

    capabilityTypeModel = this.getCapabilityTypeStore().getById(combo.value);
    win.down('nx-capability-about').showAbout(capabilityTypeModel.get('about'));
    win.down('nx-capability-settings-fieldset').setCapabilityType(capabilityTypeModel);
  },

  createCapability: function (button) {
    var me = this,
        win = button.up('window'),
        form = button.up('form'),
        capabilityModel = me.getCapabilityModel().create(),
        values = form.getValues();

    capabilityModel.set(values);

    NX.direct.Capability.create(capabilityModel.data, function (response, status) {
      if (!me.showExceptionIfPresent(response, status, 'Capability could not be created')) {
        if (Ext.isDefined(response)) {
          if (response.shouldRefresh) {
            me.getCapabilityStatusStore().on('load', function (store) {
              me.getList().getSelectionModel().select(store.getById(response.id));
            }, me, {single: true});
            me.loadStores();
          }
          if (response.success) {
            win.close();
          }
          else {
            if (Ext.isDefined(response.validationMessages)) {
              me.showMessage(form.markInvalid(response.validationMessages))
            }
            else {
              me.showMessage(response.message, 'Capability could not be created')
            }
          }
        }
      }
    });
  },

  updateCapability: function (button) {
    var me = this,
        form = button.up('form'),
        capabilityModel = form.getRecord(),
        values = form.getValues();

    capabilityModel.set(values);

    NX.direct.Capability.update(capabilityModel.data, function (response, status) {
      if (!me.showExceptionIfPresent(response, status, 'Capability could not be saved')) {
        if (Ext.isDefined(response)) {
          if (response.shouldRefresh) {
            me.loadStores();
          }
          if (!response.success) {
            if (Ext.isDefined(response.validationMessages)) {
              me.showMessage(form.markInvalid(response.validationMessages))
            }
            else {
              me.showMessage(response.message, 'Capability could not be saved')
            }
          }
        }
      }
    });
  },

  deleteCapability: function (button) {
    var me = this,
        selection = me.getList().getSelectionModel().getSelection();

    if (Ext.isDefined(selection) && selection.length > 0) {
      Ext.Msg.show({
        title: 'Confirm deletion?',
        msg: me.describeCapability(selection[0]),
        buttons: Ext.Msg.YESNO,
        animEl: button.getEl(),
        icon: Ext.MessageBox.QUESTION,
        closeable: false,
        scope: self,
        fn: function (buttonName) {
          if (buttonName === 'yes' || buttonName === 'ok') {
            NX.direct.Capability.delete(selection[0].get('id'), function (response, status) {
              if (!me.showExceptionIfPresent(response, status, 'Capability could not be deleted')) {
                if (Ext.isDefined(response)) {
                  if (response.shouldRefresh) {
                    me.loadStores();
                  }
                  if (!response.success) {
                    me.showMessage(response.message, 'Capability could not be deleted')
                  }
                }
              }
            });
          }
        }
      });
    }
  },

  /**
   * Returns a description of capability suitable to be displayed.
   */
  describeCapability: function (capabilityStatusModel) {
    var description = capabilityStatusModel.get('typeName');
    if (capabilityStatusModel.get('description')) {
      description += ' - ' + capabilityStatusModel.get('description');
    }
    return description;
  },

  showExceptionIfPresent: function (response, status, title) {
    if (Ext.isDefined(status.serverException)) {
      this.showMessage(
          Ext.isDefined(response) && Ext.isDefined(response.exceptionMessage)
              ? response.exceptionMessage
              : status.serverException.exception.message,
          title
      );
      return true;
    }
    return false;
  },

  showMessage: function (message, title) {
    if (Ext.isDefined(message)) {
      Ext.Msg.show({
        title: title || 'Operation failed',
        msg: message,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
        closeable: false
      });
      return true;
    }
    return false;
  }

});