Ext.define('NX.repository.controller.Repositories', {
  extend: 'Ext.app.Controller',

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
    this.getRepositoryInfoStore().load();
  },

  showDetails: function (selectionModel, selectedModels) {
    var me = this,
        masterdetail = me.getList().up('nx-masterdetail-panel'),
        repositoryInfoModel, info;

    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      repositoryInfoModel = selectedModels[0];
      masterdetail.setDescription(repositoryInfoModel.get('name'));
      info = {
        'Id': repositoryInfoModel.get('id'),
        'Name': repositoryInfoModel.get('name'),
        'type': repositoryInfoModel.get('type'),
        'Format': repositoryInfoModel.get('format'),
        'Local status': me.getLocalStatus(repositoryInfoModel),
        'Proxy mode': me.getProxyMode(repositoryInfoModel),
        'Remote status': me.getRemoteStatus(repositoryInfoModel),
        'Url': me.asLink(repositoryInfoModel.get('url'))
      };
      masterdetail.down('nx-info-panel').showInfo(info);
    }
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