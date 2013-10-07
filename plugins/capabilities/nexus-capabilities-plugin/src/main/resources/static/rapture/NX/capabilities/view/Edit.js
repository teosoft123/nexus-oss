Ext.define('NX.capabilities.view.Edit', {
  extend: 'Ext.window.Window',
  alias: 'widget.capabilityedit',

  title: 'Edit Capability',
  layout: 'fit',
  autoShow: true,

  initComponent: function () {
    this.items = [
      {
        xtype: 'form',
        items: [
          {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: 'Name'
          },
          {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email'
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: 'Save',
        action: 'save'
      },
      {
        text: 'Cancel',
        scope: this,
        handler: this.close
      }
    ];

    this.callParent(arguments);
  }
});
