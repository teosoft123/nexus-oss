Ext.define('NX.app.Application', {
  extend: 'Ext.app.Application',

  requires: [
    'NX.view.Viewport'
  ],

  name: 'NX',

  constructor: function (config) {
    var self = this, custom, keys;

    // FIXME: Have to sort out how we want to apply non-plugin configuration, asis has to be done here, not above

    // only these customizations will be allowed
    custom = {
      controllers: ['Test'],
      models: [],
      namespaces: [],
      refs: [],
      stores: [],
      views: []
    };
    keys = Object.keys(custom);
    console.log('Supported customizations: ' + keys);

    // for each plugin, merge its customizations
    console.log('Plugins: ' + NX.app.pluginIds);
    Ext.each(NX.app.pluginIds, function (pluginId) {
      var className = 'NX.app.' + pluginId.replace(/-/g, '_'), // replace all "-" with "_"
          plugin;

      console.log('Loading plugin: ' + pluginId + ', from class: ' + className);
      plugin = Ext.create(className);

      // Detect customizations, these are simply fields defined on the plugin object
      // supported types are Array and String only
      Ext.each(keys, function (key) {
        var value = plugin[key];
        if (value) {
          console.log(key + ': ' + value);
          if (Ext.isString(value)) {
            custom[key].push(value);
          }
          else if (Ext.isArray(value)) {
            custom[key] = custom[key].concat(value);
          }
          else {
            Ext.Error.raise('Invalid customization; class: ' + className + ', property: ' + key);
          }
        }
      });
    });

    // apply the customization to this application
    console.log('Applying customizations');

    Ext.each(keys, function (key) {
      console.log(key + ': ' + custom[key]);
    });
    Ext.apply(self, custom);

    // Have to manually add namepaces, this is done by onClassExtended in super no in ctor call
    Ext.app.addNamespaces(custom.namespaces);

    // and then let the super-class do the real work
    self.callParent(arguments);
  },

  launch: function () {
    Ext.create('NX.view.Viewport');

    // hide the loading mask after we have loaded
    var hideMask = function () {
      Ext.get('loading').remove();
      Ext.fly('loading-mask').animate({
        opacity: 0,
        remove: true
      });
    };

    Ext.defer(hideMask, 250);
  }
});