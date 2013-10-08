Ext.define('NX.controller.MasterDetail', {
  extend: 'Ext.app.Controller',

  views: [
    'masterdetail.Panel',
    'masterdetail.Tabs'
  ],

  init: function () {
    this.control({
      'nx-masterdetail-panel': {
        selectionchange: this.showDetails
      }
    });
  },

  showDetails: function (masterDetail, selectedModels) {
    var detail = masterDetail.down('nx-masterdetail-tabs');
    if (Ext.isDefined(selectedModels) && selectedModels.length > 0) {
      detail.getLayout().setActiveItem(1);
    }
    else {
      detail.setTitle('Empty selection');
      detail.getLayout().setActiveItem(0);
    }
  }

});