package org.sonatype.nexus.rapture.internal;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.nexus.configuration.application.ApplicationConfiguration;
import org.sonatype.nexus.plugin.support.FileWebResource;
import org.sonatype.nexus.web.WebResource;
import org.sonatype.nexus.web.WebResourceBundle;
import org.sonatype.sisu.goodies.common.ComponentSupport;

import static com.google.common.base.Preconditions.checkNotNull;

// FIXME: Remove this once we have nexus-extdirect-plugin integrated

/**
 * Rapture web-resources.
 *
 * @since 2.8
 */
@Named
@Singleton
public class WebResources
    extends ComponentSupport
    implements WebResourceBundle
{
  private final ApplicationConfiguration applicationConfiguration;

  @Inject
  public WebResources(final ApplicationConfiguration applicationConfiguration) {
    this.applicationConfiguration = checkNotNull(applicationConfiguration);
  }

  @Override
  public List<WebResource> getResources() {
    return Arrays.asList(
        directjngine()
    );
  }

  /**
   * FIXME: please document what this is for and why its needed.
   */
  private WebResource directjngine() {
    File file = new File(applicationConfiguration.getTemporaryDirectory(), "djn/Nexus-debug.js");
    return new FileWebResource(file, "/static/rapture/app-direct-debug.js", "application/x-javascript", false);
  }
}
