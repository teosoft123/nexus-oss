package org.sonatype.nexus.analytics.internal;

import org.sonatype.sisu.litmus.testsupport.TestSupport;

import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

/**
 * Tests for {@link CyclicCounter}.
 */
public class CyclicCounterTest
  extends TestSupport
{
  @Test
  public void cycleCounter() {
    CyclicCounter counter = new CyclicCounter(3);
    assertThat(counter.get(), is(0L));
    assertThat(counter.next(), is(1L));
    assertThat(counter.next(), is(2L));

    // cycle
    assertThat(counter.next(), is(0L));
    assertThat(counter.next(), is(1L));
    assertThat(counter.next(), is(2L));

    // cycle
    assertThat(counter.next(), is(0L));
  }

  @Test(expected=IllegalArgumentException.class)
  public void maxZero() {
    new CyclicCounter(0);
  }

  @Test(expected=IllegalArgumentException.class)
  public void maxLessThanZero() {
    new CyclicCounter(-1);
  }
}
