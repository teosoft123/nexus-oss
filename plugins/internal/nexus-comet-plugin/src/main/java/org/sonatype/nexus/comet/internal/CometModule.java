package org.sonatype.nexus.comet.internal;

import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.security.web.guice.SecurityWebFilter;

import com.google.inject.AbstractModule;
import com.google.inject.servlet.ServletModule;
import org.cometd.server.CometdServlet;

/**
 * Comet Guice module.
 *
 * @since 2.7
 */
@Named
public class CometModule
  extends AbstractModule
{
  private static final String MOUNT_POINT = "/service/comet";

  @Override
  protected void configure() {
    install(new ServletModule() {
      @Override
      protected void configureServlets() {
        bind(CometdServlet.class).in(Singleton.class);
        serve(MOUNT_POINT + "/*").with(CometdServlet.class);
        filter(MOUNT_POINT + "/*").through(SecurityWebFilter.class);
      }
    });
  }
}
