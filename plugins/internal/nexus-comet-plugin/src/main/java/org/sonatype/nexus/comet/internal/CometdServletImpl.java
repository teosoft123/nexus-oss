package org.sonatype.nexus.comet.internal;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.servlet.ServletException;

import org.cometd.server.CometdServlet;

/**
 * {@link CometdServlet} extensions.
 *
 * @since 2.7
 */
@Named
@Singleton
public class CometdServletImpl
  extends CometdServlet
{
  private final ClassLoader classLoader;

  @Inject
  public CometdServletImpl(@Named("nexus-uber") final ClassLoader classLoader) {
    this.classLoader = classLoader;
  }

  @Override
  public void init() throws ServletException {
    // Install uber-cl so that transport can be loaded
    final ClassLoader cl = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(classLoader);
    try {
      super.init();
    }
    finally {
      Thread.currentThread().setContextClassLoader(cl);
    }
  }
}
