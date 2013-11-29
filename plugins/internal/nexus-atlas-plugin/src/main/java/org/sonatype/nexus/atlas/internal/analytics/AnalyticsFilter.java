package org.sonatype.nexus.atlas.internal.analytics;

import java.io.IOException;

import javax.inject.Named;
import javax.inject.Singleton;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.sonatype.sisu.goodies.common.ComponentSupport;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

// TODO: Rename to RestApiRecorder?

/**
 * Analytics servlet filter.
 *
 * @since 2.8
 */
@Named
@Singleton
public class AnalyticsFilter
  extends ComponentSupport
  implements Filter
{
  @Override
  public void init(final FilterConfig config) throws ServletException {
    // nop
  }

  @Override
  public void destroy() {
    // nop
  }

  @Override
  public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
      throws IOException, ServletException
  {
    record((HttpServletRequest) request);

    chain.doFilter(request, response);
  }

  private void record(final HttpServletRequest request) throws IOException, ServletException {
    log.info("Content: {}", request.getContextPath());
    log.info("METHOD: {}", request.getMethod());
    log.info("URI: {}", request.getRequestURI());
    log.info("Parameters: {}", request.getParameterMap());
    log.info("UA: {}", request.getHeader("User-Agent"));

    Subject subject = SecurityUtils.getSubject();
    log.info("Subject: {}", subject);

    if (subject != null) {
      log.info("Principal: {}", subject.getPrincipal());

      Session session = subject.getSession(false);
      if (session != null) {
        log.info("Session: {}", session.getId());
      }
    }

    //System.out.println("\n\n");
    //new Throwable().printStackTrace();
    //System.out.println("\n\n");
  }
}
