/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2007-2013 Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */

package org.sonatype.nexus.testsuite.directjngine;

import java.io.File;

import org.junit.Test;

/**
 * @since 2.7
 */
public class DirectJNgineSanityIT
    extends DirectJNgineITSupport
{

  public DirectJNgineSanityIT(final String nexusBundleCoordinates) {
    super(nexusBundleCoordinates);
  }

  @Test
  public void appJsAreGenerated() throws Exception {
    File nexusJs = new File(testIndex().getDirectory("downloads"), "nexus-directjngine-plugin-app.js");
    utilities().download("static/js/nexus-directjngine-plugin-app.js", nexusJs);

    File nexusDebugJs = new File(testIndex().getDirectory("downloads"), "nexus-directjngine-plugin-app-debug.js");
    utilities().download("static/js/nexus-directjngine-plugin-app-debug.js", nexusJs);
  }

}
