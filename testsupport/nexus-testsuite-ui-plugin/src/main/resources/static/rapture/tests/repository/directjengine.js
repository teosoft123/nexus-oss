startTest(function (t) {
  t.diag("Sanity test, loading classes on demand and verifying they were indeed loaded.");

  Ext.Direct.addProvider(NX.direct.api.REMOTING_API);

  t.ok(NX.direct.Repository, "Repository Ext.Direct is defined");

});
