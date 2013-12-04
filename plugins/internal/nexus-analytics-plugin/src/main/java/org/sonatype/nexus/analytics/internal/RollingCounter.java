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
package org.sonatype.nexus.analytics.internal;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Rolling counter.
 *
 * @since 2.8
 */
public class RollingCounter
{
  private final long initial;

  private final long max;

  private final AtomicLong value;

  public RollingCounter(final long initial, final long max) {
    this.initial = initial;
    this.max = max;
    this.value = new AtomicLong(initial);
  }

  public long next() {
    // FIXME: Sort out if there is a better way to do this w/o a sync block
    synchronized (value) {
      long result = value.getAndIncrement();
      if (result == max) {
        value.set(initial);
      }
      return result;
    }
  }
}
