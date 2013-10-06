package org.sonatype.nexus.rapture;

import javax.inject.Named;

import org.sonatype.nexus.guice.FilterChainModule;
import org.sonatype.nexus.web.MdcUserContextFilter;
import org.sonatype.security.web.guice.SecurityWebFilter;

import com.google.inject.AbstractModule;
import com.google.inject.servlet.ServletModule;

/**
 * Rapture module.
 *
 * @since 2.7
 */
@Named
public class RaptureModule
    extends AbstractModule
{
  public static final String RESOURCE_MOUNT_POINT = "/service/rapture/resource";

  @Override
  protected void configure() {
    bind(SecurityWebFilter.class);

    install(new ServletModule()
    {
      @Override
      protected void configureServlets() {
        serve(RESOURCE_MOUNT_POINT).with(ResourceServlet.class);
        filter(RESOURCE_MOUNT_POINT).through(SecurityWebFilter.class);
        filter(RESOURCE_MOUNT_POINT).through(MdcUserContextFilter.class);
      }
    });

    install(new FilterChainModule()
    {
      @Override
      protected void configure() {
        // FIXME: This should be anonymous content only
        addFilterChain(RESOURCE_MOUNT_POINT, "noSessionCreation,authcBasic");
      }
    });
  }
}
