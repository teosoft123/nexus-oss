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

import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.sonatype.nexus.capability.support.CapabilitySupport;
import org.sonatype.nexus.plugins.capabilities.Condition;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Analytics collection capability.
 *
 * @since 2.8
 */
@Named(CollectionCapabilityDescriptor.TYPE_ID)
public class CollectionCapability
    extends CapabilitySupport<CollectionCapabilityConfiguration>
{
  private final EventRecorderImpl recorder;

  @Inject
  public CollectionCapability(final EventRecorderImpl recorder) {
    this.recorder = checkNotNull(recorder);
  }

  @Override
  protected CollectionCapabilityConfiguration createConfig(final Map<String, String> properties) throws Exception {
    return new CollectionCapabilityConfiguration(properties);
  }

  @Override
  public Condition activationCondition() {
    return conditions().capabilities().passivateCapabilityDuringUpdate();
  }

  @Override
  protected void onActivate(final CollectionCapabilityConfiguration config) throws Exception {
    recorder.setEnabled(true);
  }

  @Override
  protected void onPassivate(final CollectionCapabilityConfiguration config) throws Exception {
    recorder.setEnabled(false);
  }
}
