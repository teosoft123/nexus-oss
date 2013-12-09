startTest(function (t) {
  t.diag("Sanity test, loading classes on demand and verifying they were indeed loaded.");

  Ext.Direct.addProvider(NX.direct.api.REMOTING_API);

  t.requireOk('NX.repository.app.PluginConfig');
  t.requireOk('NX.repository.controller.Repositories');
  t.requireOk('NX.repository.model.RepositoryInfo');
  t.requireOk('NX.repository.store.RepositoryInfox');

});
