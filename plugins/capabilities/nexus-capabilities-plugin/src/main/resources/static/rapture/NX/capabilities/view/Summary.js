Ext.define('NX.capabilities.view.Summary', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.nx-capability-summary',

  title: 'Summary',

  items: [
    {
      layout: 'column',
      items: [
        {
          xtype: 'nx-info',
          columnWidth: 1
        },
        {
          html: 'Status',
          width: 50
        }
      ]
    },
    {
      xtype: 'form',
      items: {
        xtype: 'fieldset',
        title: 'Notes',
        autoScroll: true,
        collapsed: false,
        hideLabels: true,
        items: {
          xtype: 'textarea',
          htmlDecode: true,
          helpText: "Optional notes about configured capability",
          name: 'notes',
          allowBlank: true,
          anchor: '100%'
        }
      },
      buttons: [
        {
          text: 'Save',
          action: 'save'
        },
        {
          text: 'Cancel',
          scope: this,
          handler: this.close
        }
      ]
    }
  ],

  showInfo: function (info) {
    this.down('nx-info').showInfo(info);
  }

});
