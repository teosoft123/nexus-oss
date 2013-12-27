Ext.define('NX.repository.controller.Repositories', {
  extend: 'Ext.app.Controller',

  requires: [
    'NX.util.Url',
    'NX.util.Msg',
    'NX.util.ExtDirect'
  ],

  stores: [
    'RepositoryInfo'
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
        selectionchange: this.onSelectionChange
      },
      'nx-repository-list button[action=delete]': {
        click: this.deleteRepository
      }
    });

    this.getRepositoryInfoStore().on('load', this.onRepositoryInfoStoreLoad, this);
    this.getRepositoryInfoStore().on('beforeload', this.onRepositoryInfoStoreBeforeLoad, this);
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
    this.getRepositoryInfoStore().load();
  },

  onRepositoryInfoStoreBeforeLoad: function () {
    this.getList().down('button[action=delete]').disable();
  },

  onRepositoryInfoStoreLoad: function (store) {
    var selectedModels = this.getList().getSelectionModel().getSelection();
    if (selectedModels.length > 0) {
      this.getList().down('button[action=delete]').enable();
      this.showDetails(store.getById(selectedModels[0].getId()));
    }
  },

  onSelectionChange: function (selectionModel, selectedModels) {
    if (selectedModels.length > 0) {
      this.getList().down('button[action=delete]').enable();
      this.showDetails(selectedModels[0]);
    }
  },

  showDetails: function (repositoryInfoModel) {
    var me = this,
        masterdetail = me.getList().up('nx-masterdetail-panel'),
        info;

    if (Ext.isDefined(repositoryInfoModel)) {
      masterdetail.setDescription(repositoryInfoModel.get('name'));
      info = {
        'Id': repositoryInfoModel.get('id'),
        'Name': repositoryInfoModel.get('name'),
        'type': repositoryInfoModel.get('type'),
        'Format': repositoryInfoModel.get('format'),
        'Local status': me.getLocalStatus(repositoryInfoModel),
        'Proxy mode': me.getProxyMode(repositoryInfoModel),
        'Remote status': me.getRemoteStatus(repositoryInfoModel),
        'Url': NX.util.Url.asLink(repositoryInfoModel.get('url'))
      };
      masterdetail.down('nx-info-panel').showInfo(info);
    }
  },

  deleteRepository: function (button) {
    var me = this,
        selection = me.getList().getSelectionModel().getSelection();

    if (Ext.isDefined(selection) && selection.length > 0) {
      NX.util.Msg.askConfirmation('Confirm deletion?', me.describeRepository(selection[0]), function () {
        NX.direct.repository.Repository.delete(selection[0].getId(), function (response, status) {
          if (!NX.util.ExtDirect.showExceptionIfPresent('Repository could not be deleted', response, status)) {
            if (Ext.isDefined(response)) {
              me.loadStores();
              if (!response.success) {
                NX.util.Msg.showError('Repository could not be deleted', response.message);
              }
            }
          }
        });
      }, {scope: me});
    }
  },

  describeRepository: function (repositoryInfoModel) {
    return repositoryInfoModel.get('name');
  },

  getLocalStatus: function (repositoryInfoModel) {
    var localStatus = repositoryInfoModel.get('localStatus');

    if (localStatus === 'IN_SERVICE') {
      return 'In Service';
    }
    else if (localStatus === 'OUT_OF_SERVICE') {
      return 'Out Of Service';
    }
    return localStatus;
  },

  getProxyMode: function (repositoryInfoModel) {
    var proxyMode = repositoryInfoModel.get('proxyMode');

    if (proxyMode === 'ALLOW') {
      return 'Allowed';
    }
    else if (proxyMode === 'BLOCKED_MANUAL') {
      return 'Manually blocked';
    }
    else if (proxyMode === 'BLOCKED_AUTO') {
      return 'Automatically blocked';
    }
    return proxyMode;
  },

  getRemoteStatus: function (repositoryInfoModel) {
    var remoteStatus = repositoryInfoModel.get('remoteStatus'),
        remoteStatusReason = repositoryInfoModel.get('remoteStatusReason');

    if (remoteStatus === 'UNKNOWN') {
      return 'Unknown';
    }
    else if (remoteStatus === 'AVAILABLE') {
      return 'Available';
    }
    else if (remoteStatus === 'UNAVAILABLE') {
      return 'Unavailable' + (remoteStatusReason ? ' due to ' + remoteStatusReason : '');
    }
    return remoteStatus;
  }

});