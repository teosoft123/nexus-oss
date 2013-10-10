Ext.define('NX.repository.controller.Repositories', {
  extend: 'Ext.app.Controller',

  stores: [
    'Repository'
  ],
  models: [
    'Repository'
  ],
  views: [
    'List'
  ],

  refs: [
    {
      ref: 'list',
      selector: 'nx-repository-list'
    }
  ],

  init: function () {
    this.control({
      'nx-featurebrowser': {
        beforerender: this.addToBrowser
      },
      'nx-repository-list': {
        beforerender: this.loadStores,
        selectionchange: this.showDetails
      }
    });
  },

  addToBrowser: function (featureBrowser) {
    featureBrowser.add(
        {
          xtype: 'nx-masterdetail-panel',
          title: 'Repositories',
          modelName: 'repository',
          list: 'nx-repository-list',
          tabs: { xtype: 'nx-info-panel' }
        }
    );
  },

  loadStores: function () {
    this.getRepositoryStore().load();
  },

  showDetails: function (selectionModel, selectedModels) {
    var me = this,
        masterdetail = me.getList().up('nx-masterdetail-panel'),
        repositoryModel, info;

    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      repositoryModel = selectedModels[0];
      masterdetail.setDescription(repositoryModel.get('name'));
      info = {
        'Id': repositoryModel.get('id'),
        'Name': repositoryModel.get('name')
      };
      masterdetail.down("nx-info-panel").showInfo(info);
    }
  },

  /**
   * @private
   */
  asLink: function (url, text) {
    if (Ext.isEmpty(text)) {
      text = url;
    }
    return '<a href="' + url + '" target="_blank">' + text + '</a>'
  }
});