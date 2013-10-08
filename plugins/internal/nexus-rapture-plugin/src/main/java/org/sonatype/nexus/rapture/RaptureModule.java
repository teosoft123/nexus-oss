package org.sonatype.nexus.rapture;

import java.util.Map;

import javax.inject.Named;

import org.sonatype.nexus.guice.FilterChainModule;
import org.sonatype.nexus.rapture.internal.DirectServlet;
import org.sonatype.nexus.rapture.internal.ResourceServlet;
import org.sonatype.nexus.web.MdcUserContextFilter;
import org.sonatype.security.web.guice.SecurityWebFilter;

import com.google.common.collect.Maps;
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

  public static final String RESOURCE_MOUNT_POINT = RAPTURE_MOUNT_POINT + "/resource";

  public static final String DIRECT_MOUNT_POINT = RAPTURE_MOUNT_POINT + "/direct";

  @Override
  protected void configure() {
    bind(SecurityWebFilter.class);

    install(new ServletModule()
    {
      @Override
      protected void configureServlets() {
        Map<String, String> directServletConfig = Maps.newHashMap();
        directServletConfig.put(GlobalParameters.PROVIDERS_URL, DIRECT_MOUNT_POINT.substring(1));
        directServletConfig.put(GlobalParameters.DEBUG, Boolean.toString(log.isDebugEnabled()));

        serve(RESOURCE_MOUNT_POINT).with(ResourceServlet.class);
        serve(DIRECT_MOUNT_POINT).with(DirectServlet.class, directServletConfig);
        filter(RAPTURE_MOUNT_POINT + "/*").through(SecurityWebFilter.class);
        filter(RAPTURE_MOUNT_POINT + "/*").through(MdcUserContextFilter.class);
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
