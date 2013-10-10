Ext.define('NX.capability.view.Settings', {
  extend: 'Ext.form.Panel',
  alias: 'widget.nx-capability-settings',

  title: 'Settings',

  items: {
    xtype: 'nx-capability-settings-fieldset'
  },

  buttons: [
    {
      text: 'Save',
      action: 'save'
    },
    {
      text: 'Cancel'
    }
  ],

  getValues: function () {
    return this.down('nx-capability-settings-fieldset').exportCapability(this.getForm())
  },

  markInvalid: function (validationMessages) {
    return this.down('nx-capability-settings-fieldset').markInvalid(this.getForm(), validationMessages)
  }

});
