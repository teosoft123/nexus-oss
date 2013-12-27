startTest(function (t) {
  t.diag("Sanity test, loading classes on demand and verifying they were indeed loaded.");

  t.ok(NX.direct.capabilities.Capability, "Capability Ext.Direct is defined");
  t.ok(NX.direct.capabilities.CapabilityType, "CapabilityType Ext.Direct is defined");

});
