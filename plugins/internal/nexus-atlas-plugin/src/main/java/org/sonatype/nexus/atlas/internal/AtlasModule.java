package org.sonatype.nexus.atlas.internal;

import javax.inject.Named;

import org.sonatype.nexus.atlas.internal.analytics.AnalyticsModule;

import com.google.inject.AbstractModule;

/**
 * Atlas guice module.
 *
 * @since 2.8
 */
@Named
public class AtlasModule
  extends AbstractModule
{
  @Override
  protected void configure() {
    install(new AnalyticsModule());
  }
}
