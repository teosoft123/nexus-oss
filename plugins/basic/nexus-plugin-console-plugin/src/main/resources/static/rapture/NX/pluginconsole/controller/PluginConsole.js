Ext.define('NX.pluginconsole.controller.PluginConsole', {
  extend: 'Ext.app.Controller',

  stores: [
    'PluginInfos'
  ],
  models: [
    'PluginInfo'
  ],
  views: [
    'List',
    'Summary'
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
        beforerender: this.loadPlugins,
        selectionchange: this.showDetails
      }
    });
  },

  addToBrowser: function (featureBrowser) {
    featureBrowser.add(
        {
          xtype: 'nx-masterdetail-panel',
          title: 'Plugin Console',
          emptyText: 'Please select a plugin to view details',
          list: 'nx-pluginconsole-list',
          tabs: { xtype: 'nx-pluginconsole-summary' }
        }
    );
  },

  loadPlugins: function () {
    this.getPluginInfosStore().load();
  },

  showDetails: function (selectionModel, selectedModels) {
    var masterdetail = this.getList().up('nx-masterdetail-panel');
    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      masterdetail.setDescription(selectedModels[0].data.name);
    }
  }

});