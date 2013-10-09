# Nexus Rapture Baseapp

This module provides the baseapp muck for ExtJS 4+ pre-compiled with Sencha CMD.

Requires Sencha CMD 4+

When updating baseapp/ext need to be aware there are directories named 'target':
* ext/src/fx/target

May completely revisit this solution later.

## Regenerating

    mvn clean install -Pregenerate

If the content has changed, then the result needs to be committed:

    git commit . -m "regenerated baseapp"

