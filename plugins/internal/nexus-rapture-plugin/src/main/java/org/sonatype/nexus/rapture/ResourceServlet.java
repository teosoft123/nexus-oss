package org.sonatype.nexus.rapture;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sonatype.nexus.plugins.rest.NexusResourceBundle;
import org.sonatype.nexus.plugins.rest.StaticResource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * ???
 *
 * @since 2.7
 */
@Named
@Singleton
public class ResourceServlet
    extends HttpServlet
{
  private static final Logger log = LoggerFactory.getLogger(ResourceServlet.class);

  private final List<NexusResourceBundle> resourceBundles;

  @Inject
  public ResourceServlet(final List<NexusResourceBundle> resourceBundles) {
    this.resourceBundles = checkNotNull(resourceBundles);
  }

  private static enum Type
  {
    CSS("text/css"),

    JS("application/x-javascript");

    private String[] matchTypes;

    private Type(final String... matchTypes) {
      this.matchTypes = matchTypes;
    }

    public boolean matches(final StaticResource resource) {
      String contentType = resource.getContentType();
      for (String matchType : matchTypes) {
        if (matchType.equals(contentType)) {
          return true;
        }
      }
      return false;
    }
  }

  @Override
  protected void doGet(final HttpServletRequest req, final HttpServletResponse resp)
      throws ServletException, IOException
  {
    String typeName = req.getParameter("type");
    if (typeName == null) {
      resp.sendError(400, "Missing parameter 'type'");
      return;
    }
    typeName = typeName.toUpperCase(Locale.ENGLISH);
    Type type = Type.valueOf(typeName);

    // HACK: Just list matching resources now
    resp.setContentType("text/plain");
    PrintWriter writer = resp.getWriter();

    for (NexusResourceBundle bundle : resourceBundles) {
      for (StaticResource resource : bundle.getContributedResouces()) {
        if (type.matches(resource)) {
          if (resource.getPath().startsWith("/static/rapture")) {
            // TODO: Sort out how we want to deal with this and integration with wro4j
            // TODO: Also need to sort out if we only want to include plugin content, or everything?
            // TODO: ... which does have implications for debug or non-debug content
            writer.println(resource.getPath());
          }
        }
      }
    }
  }
}
