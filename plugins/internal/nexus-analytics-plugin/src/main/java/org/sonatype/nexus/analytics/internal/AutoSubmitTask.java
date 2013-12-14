package org.sonatype.nexus.analytics.internal;

import javax.inject.Named;

import org.sonatype.nexus.scheduling.NexusTaskSupport;

/**
 * Event automatic submission task.
 *
 * @since 2.8
 */
@Named
public class AutoSubmitTask
  extends NexusTaskSupport
{
  // TODO: Sort out if we need a descriptor for this bugger or not?

  @Override
  protected String getMessage() {
    return "Submitting analytics events";
  }

  @Override
  protected void execute() throws Exception {
    // TODO
  }
}
