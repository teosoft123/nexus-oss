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

package org.sonatype.nexus.directjngine.testsupport;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.nexus.configuration.application.ApplicationConfiguration;
import org.sonatype.nexus.directjngine.DirectResource;
import org.sonatype.security.SecuritySystem;
import org.sonatype.security.usermanagement.User;
import org.sonatype.security.usermanagement.UserNotFoundException;

import com.softwarementors.extjs.djn.config.annotations.DirectAction;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import org.apache.shiro.authz.annotation.RequiresPermissions;

/**
 * @since 2.7
 */
@Named
@Singleton
@DirectAction(action = "Info")
public class NexusInfo
    implements DirectResource
{

  private final ApplicationConfiguration applicationConfiguration;

  private final SecuritySystem securitySystem;

  @Inject
  public NexusInfo(final ApplicationConfiguration applicationConfiguration,
                   final SecuritySystem securitySystem)
  {
    this.applicationConfiguration = applicationConfiguration;
    this.securitySystem = securitySystem;
  }

  @DirectMethod
  public String getTempDir() {
    return applicationConfiguration.getTemporaryDirectory().getAbsolutePath();
  }

  @DirectMethod
  @RequiresPermissions("nexus:users")
  public User getUser(String userId) throws UserNotFoundException {
    return securitySystem.getUser(userId);
  }

}
