Ext.define('NX.pluginconsole.controller.PluginConsole', {
  extend: 'Ext.app.Controller',

  requires: [
    'NX.util.Url'
  ],

  stores: [
    'PluginInfo'
  ],
  views: [
    'List'
  ],

  refs: [
    {
      ref: 'list',
      selector: 'nx-pluginconsole-list'
    }
  ],

  init: function () {
    this.control({
      'nx-featurebrowser': {
        beforerender: this.addToBrowser
      },
      'nx-pluginconsole-list': {
        beforerender: this.loadStores,
        selectionchange: this.onSelectionChange
      }
    });

    this.getPluginInfoStore().on('load', this.onPluginInfoStoreLoad, this);
  },

  addToBrowser: function (featureBrowser) {
    featureBrowser.add(
        {
          xtype: 'nx-masterdetail-panel',
          title: 'Plugin Console',
          emptyText: 'Please select a plugin to view details',
          list: 'nx-pluginconsole-list',
          tabs: { xtype: 'nx-info-panel' }
        }
    );
  },

  loadStores: function () {
    this.getPluginInfoStore().load();
  },

  onPluginInfoStoreLoad: function (store) {
    var selectedModels = this.getList().getSelectionModel().getSelection();
    if (selectedModels.length > 0) {
      this.showDetails(store.getById(selectedModels[0].getId()));
    }
  },

  onSelectionChange: function (selectionModel, selectedModels) {
    if (selectedModels.length > 0) {
      this.showDetails(selectedModels[0]);
    }
  },

  showDetails: function (pluginInfoModel) {
    var me = this,
        masterdetail = me.getList().up('nx-masterdetail-panel'),
        info;

    if (Ext.isDefined(pluginInfoModel)) {
      masterdetail.setDescription(pluginInfoModel.get('name'));
      info = {
        'Name': pluginInfoModel.get('name'),
        'Version': pluginInfoModel.get('version'),
        'Status': pluginInfoModel.get('status'),
        'Description': pluginInfoModel.get('description'),
        'SCM Version': pluginInfoModel.get('scmVersion'),
        'SCM Timestamp': pluginInfoModel.get('scmTimestamp'),
        'Site': NX.util.Url.asLink(pluginInfoModel.get('site'))
      };
      if (Ext.isDefined(pluginInfoModel.get('documentation'))) {
        Ext.each(pluginInfoModel.get('documentation'), function (doc) {
          if (!Ext.isEmpty(doc.url)) {
            info['Documentation'] = NX.util.Url.asLink(doc.url, doc.label);
          }
        });
      }
      masterdetail.down("nx-info-panel").showInfo(info);
    }
  }

});