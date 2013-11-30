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
package org.sonatype.nexus.analytics;

import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import com.google.common.collect.Maps;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Container for analytics event data.
 *
 * @since 2.8
 */
public class EventData
{
  private final long timestamp = System.currentTimeMillis();

  private static final AtomicLong counter = new AtomicLong(0);

  private static long nextSequence() {
    // FIXME: Replace with a rollover counter
    return counter.getAndIncrement();
  }

  private final long sequence = nextSequence();

  private final Object principal;

  private final Object sessionId;

  private final String type;

  private final Map<String,Object> attributes = Maps.newHashMap();

  public EventData(final String type) {
    this.type = checkNotNull(type);

    // capture in native format to avoid premature string conversion
    Object principal = null;
    Object sessionId = null;

    // capture the user and session ids if we can
    Subject subject = SecurityUtils.getSubject();
    if (subject != null) {
      principal = subject.getPrincipal();

      Session session = subject.getSession(false);
      if (session != null) {
        sessionId = session.getId();
      }
    }

    this.principal = principal;
    this.sessionId = sessionId;
  }

  public Object getPrincipal() {
    return principal;
  }

  public Object getSessionId() {
    return sessionId;
  }

  public long getTimestamp() {
    return timestamp;
  }

  public long getSequence() {
    return sequence;
  }

  public String getType() {
    return type;
  }

  public EventData set(final String name, final Object value) {
    checkNotNull(name);
    checkNotNull(value);
    attributes.put(name, value);
    return this;
  }

  public Map<String, Object> getAttributes() {
    return attributes;
  }

  @Override
  public String toString() {
    return "EventData{" +
        "timestamp=" + timestamp +
        ", sequence=" + sequence +
        ", principal=" + principal +
        ", sessionId=" + sessionId +
        ", type='" + type + '\'' +
        ", attributes=" + attributes +
        '}';
  }
}
