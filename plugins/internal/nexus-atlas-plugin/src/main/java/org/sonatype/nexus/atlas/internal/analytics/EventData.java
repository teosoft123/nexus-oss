package org.sonatype.nexus.atlas.internal.analytics;

import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import com.google.common.collect.Maps;

/**
 * Container for analytics event data.
 *
 * This does not include user/session/etc details those are applied by framework.
 *
 * @since 2.8
 */
public class EventData
{
  private long timestamp = System.currentTimeMillis();

  private static final AtomicLong counter = new AtomicLong(0);

  private static long nextSequence() {
    // FIXME: Replace with a rollover counter
    return counter.getAndIncrement();
  }

  private long sequence = nextSequence();

  private String type;

  private Map<String,Object> attributes = Maps.newHashMap();

  public long getTimestamp() {
    return timestamp;
  }

  public long getSequence() {
    return sequence;
  }

  public EventData type(final String type) {
    this.type = type;
    return this;
  }

  public String getType() {
    return type;
  }

  public EventData set(final String name, final Object value) {
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
        ", type='" + type + '\'' +
        ", attributes=" + attributes +
        '}';
  }
}
