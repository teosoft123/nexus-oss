startTest(function (t) {
  t.diag("Sanity test, loading classes on demand and verifying they were indeed loaded.");

  t.ok(NX.direct.repository.Repository, "Repository Ext.Direct is defined");

});
