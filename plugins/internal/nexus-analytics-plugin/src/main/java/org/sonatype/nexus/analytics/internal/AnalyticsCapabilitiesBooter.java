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
package org.sonatype.nexus.analytics.internal;

import java.util.UUID;

import javax.inject.Named;

import org.sonatype.nexus.plugins.capabilities.CapabilityRegistry;
import org.sonatype.nexus.plugins.capabilities.support.CapabilityBooterSupport;

import com.google.common.collect.ImmutableMap;
import org.eclipse.sisu.EagerSingleton;

/**
 * Automatically creates bootstrap capabilities if needed on startup.
 *
 * @since 2.8
 */
@Named
@EagerSingleton
public class AnalyticsCapabilitiesBooter
    extends CapabilityBooterSupport
{
  @Override
  protected void boot(final CapabilityRegistry registry) throws Exception {
    // automatically add collection capability (disabled w/ random salt)
    maybeAddCapability(registry, CollectionCapabilityDescriptor.TYPE, false, null,
        ImmutableMap.of(CollectionCapabilityConfiguration.SALT, randomSalt()));
  }

  /**
   * Generate a new random salt.
   */
  private String randomSalt() {
    // TODO: sort out if this is random enough
    return UUID.randomUUID().toString();
  }
}
