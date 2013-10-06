Ext.application({
  requires: [
    'NX.view.Viewport'
  ],

  name: 'NX',
  controllers: [
    'example.Users'
  ],

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