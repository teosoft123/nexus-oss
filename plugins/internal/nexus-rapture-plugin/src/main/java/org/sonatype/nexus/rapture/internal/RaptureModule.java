package org.sonatype.nexus.rapture.internal;

import java.util.Map;

import javax.inject.Named;

import org.sonatype.nexus.guice.FilterChainModule;
import org.sonatype.nexus.web.internal.SecurityFilter;

import com.google.common.collect.ImmutableMap;
import com.google.inject.AbstractModule;
import com.google.inject.servlet.ServletModule;
import com.softwarementors.extjs.djn.servlet.DirectJNgineServlet.GlobalParameters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Rapture module.
 *
 * @since 2.7
 */
@Named
public class RaptureModule
    extends AbstractModule
{
  private static final Logger log = LoggerFactory.getLogger(RaptureModule.class);

  public static final String RAPTURE_MOUNT_POINT = "/service/rapture";

  public static final String DIRECT_MOUNT_POINT = RAPTURE_MOUNT_POINT + "/direct";

  @Override
  protected void configure() {
    install(new ServletModule()
    {
      @Override
      protected void configureServlets() {
        Map<String, String> directServletConfig = ImmutableMap.of(
            GlobalParameters.PROVIDERS_URL, DIRECT_MOUNT_POINT.substring(1),
            GlobalParameters.DEBUG, Boolean.toString(log.isDebugEnabled())
        );
        serve(DIRECT_MOUNT_POINT).with(DirectServlet.class, directServletConfig);

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
