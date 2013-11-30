package org.sonatype.nexus.atlas.internal.analytics;

import org.sonatype.nexus.web.MdcUserContextFilter;
import org.sonatype.security.web.guice.SecurityWebFilter;

import com.google.inject.AbstractModule;
import com.google.inject.servlet.ServletModule;

/**
 * Analytics guice module.
 *
 * @since 2.8
 */
public class AnalyticsModule
  extends AbstractModule
{
  @Override
  protected void configure()
  {
    bind(SecurityWebFilter.class);

    install(new ServletModule() {
      @Override
      protected void configureServlets() {
        // collection needs security filters applied first
        filter("/*").through(SecurityWebFilter.class);
        filter("/*").through(MdcUserContextFilter.class);

        // then capture rest api requests
        filter("/service/local/*").through(RestRequestCollector.class);
        filter("/service/siesta/*").through(RestRequestCollector.class);
      }
    });
  }
}
