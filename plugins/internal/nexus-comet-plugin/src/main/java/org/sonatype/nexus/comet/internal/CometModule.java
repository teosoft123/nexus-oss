package org.sonatype.nexus.comet.internal;

import java.util.Map;

import javax.inject.Named;

import org.sonatype.security.web.guice.SecurityWebFilter;

import com.google.common.collect.ImmutableMap;
import com.google.inject.AbstractModule;
import com.google.inject.servlet.ServletModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Comet Guice module.
 *
 * @since 2.7
 */
@Named
public class CometModule
  extends AbstractModule
{
  private static final Logger log = LoggerFactory.getLogger(CometModule.class);

  private static final String MOUNT_POINT = "/service/comet";

  @Override
  protected void configure() {
    bind(SecurityWebFilter.class);

    install(new ServletModule()
    {
      @Override
      protected void configureServlets() {
        Map<String,String> params = ImmutableMap.of(
            "transports", "org.cometd.websocket.server.WebSocketTransport"
        );
        serve(MOUNT_POINT + "/*").with(CometdServletImpl.class, params);
        filter(MOUNT_POINT + "/*").through(SecurityWebFilter.class);
      }
    });

    log.info("Comet support configured");
  }
}
