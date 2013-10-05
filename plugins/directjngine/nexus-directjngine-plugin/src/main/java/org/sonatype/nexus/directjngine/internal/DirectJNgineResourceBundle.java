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

package org.sonatype.nexus.directjngine.internal;

import java.io.File;
import java.net.MalformedURLException;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.nexus.configuration.application.ApplicationConfiguration;
import org.sonatype.nexus.directjngine.DirectJNginePlugin;
import org.sonatype.nexus.plugins.rest.DefaultStaticResource;
import org.sonatype.nexus.plugins.rest.NexusResourceBundle;
import org.sonatype.nexus.plugins.rest.StaticResource;

import com.google.common.base.Throwables;
import com.google.common.collect.Lists;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * DirectJNgine resource bundle.
 *
 * @since 2.7
 */
@Named
@Singleton
public class DirectJNgineResourceBundle
    implements NexusResourceBundle
{

  private final ApplicationConfiguration applicationConfiguration;

  @Inject
  public DirectJNgineResourceBundle(final ApplicationConfiguration applicationConfiguration) {
    this.applicationConfiguration = checkNotNull(applicationConfiguration);
  }

  @Override
  public List<StaticResource> getContributedResouces() {
    return Lists.newArrayList(
        staticResourceFor(DirectJNginePlugin.ARTIFACT_ID + "-app.js", "Nexus.js"),
        staticResourceFor(DirectJNginePlugin.ARTIFACT_ID + "-app-debug.js", "Nexus-debug.js")
    );
  }

  private StaticResource staticResourceFor(final String path, final String name) {
    try {
      File file = new File(applicationConfiguration.getTemporaryDirectory(), "djn/" + name);
      return new DefaultStaticResource(file.toURI().toURL(), "/static/js/" + path, "text/javascript");
    }
    catch (MalformedURLException e) {
      throw Throwables.propagate(e);
    }
  }

}
