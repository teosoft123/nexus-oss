package org.sonatype.nexus.rapture.internal;

import javax.inject.Named;

import org.sonatype.nexus.guice.FilterChainModule;
import org.sonatype.nexus.web.internal.SecurityFilter;

import com.google.inject.AbstractModule;
import com.google.inject.servlet.ServletModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Rapture module.
 *
 * @since 2.8
 */
@Named
public class RaptureModule
    extends AbstractModule
{
  private static final Logger log = LoggerFactory.getLogger(RaptureModule.class);

  public static final String RAPTURE_MOUNT_POINT = "/service/rapture";

  @Override
  protected void configure() {
    install(new ServletModule()
    {
      @Override
      protected void configureServlets() {
        filter(RAPTURE_MOUNT_POINT + "/*").through(SecurityFilter.class);
      }
    });

    install(new FilterChainModule()
    {
      @Override
      protected void configure() {
        // FIXME: This should be anonymous content only
        addFilterChain(RAPTURE_MOUNT_POINT + "/**", "noSessionCreation,authcBasic");
      }
    });
  }
}
