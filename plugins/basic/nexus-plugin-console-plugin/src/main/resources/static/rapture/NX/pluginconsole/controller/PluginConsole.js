Ext.define('NX.pluginconsole.controller.PluginConsole', {
  extend: 'Ext.app.Controller',

  stores: [
    'PluginInfos'
  ],
  models: [
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
          tabs: { xtype: 'nx-info-panel' }
        }
    );
  },

  loadPlugins: function () {
    this.getPluginInfosStore().load();
  },

  showDetails: function (selectionModel, selectedModels) {
    var me = this,
        masterdetail = me.getList().up('nx-masterdetail-panel'),
        pluginInfo, info;

    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      pluginInfo = selectedModels[0].data;
      masterdetail.setDescription(pluginInfo.name);
      info = {
        'Name': pluginInfo.name,
        'Version': pluginInfo.version,
        'Status': pluginInfo.status,
        'Description': pluginInfo.description,
        'SCM Version': pluginInfo.scmVersion,
        'SCM Timestamp': pluginInfo.scmTimestamp,
        'Site': me.asLink(pluginInfo.site)
      };
      if (Ext.isDefined(pluginInfo.documentation)) {
        Ext.each(pluginInfo.documentation, function (doc) {
          info['Documentation'] = me.asLink(doc.url, doc.label);
        });
      }
      masterdetail.down("nx-info-panel").showInfo(info);
    }
  },

  asLink: function (url, text) {
    if (!Ext.isEmpty(url)) {
      if (Ext.isEmpty(text)) {
        text = url;
      }
      return '<a href=\'' + url + '\'>' + text + '</a>'
    }
  }

});