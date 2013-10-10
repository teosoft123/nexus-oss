Ext.define('NX.capability.view.Status', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nx-capability-status',

  title: 'Status',

  autoScroll: true,
  html: '',

  showStatus: function (status) {
    this.html = status;
    if (this.body) {
      this.body.update(status);
    }
  }

});
