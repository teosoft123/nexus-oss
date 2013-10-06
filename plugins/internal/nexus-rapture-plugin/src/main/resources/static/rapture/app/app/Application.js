Ext.define('NX.app.Application', {
  extend: 'Ext.app.Application',

  requires: [
    'NX.view.Viewport'
  ],

  name: 'NX',

  constructor: function(config) {
    var self = this, custom, keys;

    // only these customizations will be allowed
    custom = {
      controllers: [],
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
    Ext.each(NX.app.pluginIds, function(pluginId) {
      var className = 'NX.app.' + pluginId.replace(/-/g, '_'), // replace all "-" with "_"
          plugin;

      console.log('Loading plugin: ' + pluginId + ', from class: ' + className);
      plugin = Ext.create(className);

      // Detect customizations
      Ext.each(keys, function(key) {
        var value = plugin[key];
        if (value) {
          console.log(key + ': ' + value);
          custom[key] = custom[key].concat(value);
        }
      });
    });

    // apply the customization to this application
    console.log('Applying customizations');
    Ext.each(keys, function(key) {
      console.log(key + ': ' + custom[key]);
    });
    Ext.apply(self, custom);

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