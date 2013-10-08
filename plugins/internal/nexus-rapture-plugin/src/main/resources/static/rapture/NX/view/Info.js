Ext.define('NX.view.Info', {
  extend: 'Ext.Component',
  alias: 'widget.nx-info',

  tpl: Ext.create('Ext.XTemplate', [
    '<div class="nx-info">',
    '<table>',
    '<tpl for=".">',
    '<tr class="nx-info-entry">',
    '<td class="nx-info-entry-name">{name}</td>',
    '<td class="nx-info-entry-value">{value}</td>',
    '</tr>',
    '</tpl>',
    '</tr>',
    '</table>',
    '</div>'
  ]),

  showInfo: function (info) {
    var entries = [];
    Ext.Object.each(info, function (key, value) {
      if (!Ext.isEmpty(value)) {
        entries.push(
            {
              name: key,
              value: value
            }
        )
      }
    });
    this.tpl.overwrite(this.getEl(), entries);
    this.up('panel').doComponentLayout();
  }

});
