Ext.define('NX.capabilities.view.Add', {
  extend: 'Ext.window.Window',
  alias: 'widget.nx-capability-add',

  title: 'Create new capability',

  layout: 'fit',
  autoShow: true,
  modal: true,
  constrain: true,
  width: 640,

  initComponent: function () {
    var me = this;

    me.items = {
      xtype: 'form',
      items: [
        {
          xtype: 'fieldset',
          autoHeight: true,
          collapsed: false,
          border: false,
          items: {
            xtype: 'combo',
            fieldLabel: 'Type',
            itemCls: 'required-field',
            helpText: "Type of configured capability",
            name: 'typeId',
            store: me.capabilityTypeStore,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            editable: false,
            mode: 'local',
            triggerAction: 'all',
            emptyText: 'Select...',
            selectOnFocus: false,
            allowBlank: false,
            anchor: '96%'
          }
        },
        {
          xtype: 'fieldset',
          title: 'About',
          autoHeight: true,
          autoScroll: true,
          collapsible: true,
          collapsed: false,
          items: {
            xtype: 'nx-capability-about',
            title: undefined
          }
        },
        {
          xtype: 'nx-capability-settings-fieldset',
          title: 'Settings'
        }
      ],

      buttons: [
        { text: 'Add', action: 'add' },
        { text: 'Cancel', handler: me.close, scope: me }
      ],

      getValues: function () {
        return me.down('nx-capability-settings-fieldset').exportCapability(this.getForm())
      },

      markInvalid: function (validationMessages) {
        return me.down('nx-capability-settings-fieldset').markInvalid(this.getForm(), validationMessages)
      }

    };

    me.callParent(arguments);
  }

});
