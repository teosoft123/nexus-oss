Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
  requires: [
    'Ext.container.Viewport'
  ],

  name: 'AM',
  appFolder: 'app',

  controllers: [
    'Users'
  ],

  launch: function () {
    Ext.create('AM.view.Viewport');

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