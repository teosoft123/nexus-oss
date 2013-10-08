Ext.define('NX.app.Application', {
  extend: 'Ext.app.Application',

  requires: [
    'NX.view.Viewport'
  ],

  name: 'NX',
  appFolder: 'NX',

  namespaces: [],
  controllers: [
    'Main',
    'MasterDetail'
  ],
  models: [],
  refs: [],
  stores: [],
  views: [],

  constructor: function (config) {
    var self = this, custom, keys;

    Ext.Direct.addProvider(
        NX.direct.REMOTING_API
    );

    // only these customizations will be allowed
    custom = {
      namespaces: self.namespaces,
      controllers: self.controllers,
      models: self.models,
      refs: self.refs,
      stores: self.stores,
      views: self.views
    };
    keys = Object.keys(custom);
    console.log('Supported customizations: ' + keys);

    // TODO: More error handling around pluginConfigClassNames content, this needs to be defined, should have at least one element, etc

    // for each plugin, merge its customizations
    console.log('Plugins config class names: ' + NX.app.pluginConfigClassNames);
    Ext.each(NX.app.pluginConfigClassNames, function (className) {
      var pluginConfig;

      console.log('Loading plugin config from class: ' + className);
      pluginConfig = Ext.create(className);

      // Detect customizations, these are simply fields defined on the plugin object
      // supported types are Array and String only
      Ext.each(keys, function (key) {
        var value = pluginConfig[key];
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

    // Have to manually add namespaces, this is done by onClassExtended in super not in parent call
    if (custom.namespaces) {
      Ext.app.addNamespaces(custom.namespaces);
    }

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