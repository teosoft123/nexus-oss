/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2007-2013 Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */

package org.sonatype.nexus.atlas.internal.analytics;

import java.io.IOException;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sonatype.sisu.goodies.common.ComponentSupport;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * REST request analytics collector.
 *
 * @since 2.8
 */
@Named
@Singleton
public class RestRequestCollector
    extends ComponentSupport
    implements Filter
{
  private final EventRecorder recorder;

  @Inject
  public RestRequestCollector(final EventRecorder recorder) {
    this.recorder = checkNotNull(recorder);
  }

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
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    HttpServletResponse httpResponse = (HttpServletResponse) response;
    EventData data = null;

    // only attempt to record details if collection is enabled
    if (recorder.isEnabled()) {
      data = new EventData("REST")
          .set("method", httpRequest.getMethod())
          .set("path", getPath(httpRequest))
          .set("userAgent", httpRequest.getHeader("User-Agent"));
    }

    try {
      chain.doFilter(request, response);
    }
    finally {
      if (data != null) {
        data.set("status", httpResponse.getStatus());
        data.set("duration", System.currentTimeMillis() - data.getTimestamp());
        recorder.record(data);
      }
    }
  }

  /**
   * Get the request path, stripping off the context path if they overlap (which they should).
   */
  private String getPath(final HttpServletRequest request) {
    String context = request.getContextPath();
    String path = request.getRequestURI();
    if (path.startsWith(context)) {
      path = path.substring(context.length(), path.length());
    }
    return path;
  }
}
