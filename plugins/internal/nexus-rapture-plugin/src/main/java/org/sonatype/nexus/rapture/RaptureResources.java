package org.sonatype.nexus.rapture;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.nexus.plugins.rest.NexusResourceBundle;
import org.sonatype.nexus.plugins.rest.StaticResource;
import org.sonatype.sisu.goodies.template.TemplateEngine;
import org.sonatype.sisu.goodies.template.TemplateParameters;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Rapture resources.
 *
 * @since 2.7
 */
@Named
@Singleton
public class RaptureResources
    implements NexusResourceBundle
{

  private final TemplateEngine templateEngine;

  private final List<NexusResourceBundle> resourceBundles;

  @Inject
  public RaptureResources(final TemplateEngine templateEngine,
                          final List<NexusResourceBundle> resourceBundles)
  {
    this.templateEngine = checkNotNull(templateEngine);
    this.resourceBundles = checkNotNull(resourceBundles);
  }

  @Override
  public List<StaticResource> getContributedResouces() {
    return Arrays.<StaticResource>asList(
        new StaticResource()
        {
          @Override
          public String getPath() {
            return "/static/rapture/app.js";
          }

          @Override
          public String getContentType() {
            return "application/x-javascript";
          }

          @Override
          public long getSize() {
            return -1;
          }

          @Override
          public Long getLastModified() {
            return System.currentTimeMillis();
          }

          @Override
          public InputStream getInputStream() throws IOException {
            StringBuilder sb = new StringBuilder();
            for (NexusResourceBundle bundle : resourceBundles) {
              for (StaticResource resource : bundle.getContributedResouces()) {
                if (resource.getPath().startsWith("/static/rapture")
                    && resource.getPath().endsWith("Plugin.js")) {
                  if (sb.length() > 0) {
                    sb.append(",");
                  }
                  sb.append("'").append(new File(resource.getPath()).getParentFile().getName()).append("'");
                }
              }
            }
            URL template = RaptureResources.class.getResource("app.vm");
            return new ByteArrayInputStream(
                templateEngine.render(this, template, new TemplateParameters().set("plugins", sb.toString())).getBytes()
            );
          }
        }
    );
  }

}
