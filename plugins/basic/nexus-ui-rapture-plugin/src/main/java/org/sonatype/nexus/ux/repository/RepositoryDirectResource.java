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

package org.sonatype.nexus.ux.repository;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.nexus.proxy.registry.RepositoryRegistry;
import org.sonatype.nexus.proxy.repository.Repository;
import org.sonatype.nexus.rapture.direct.DirectResource;
import org.sonatype.nexus.rapture.direct.Response;
import org.sonatype.nexus.ux.model.RepositoryUX;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.softwarementors.extjs.djn.config.annotations.DirectAction;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

import static org.sonatype.nexus.rapture.direct.Responses.error;
import static org.sonatype.nexus.rapture.direct.Responses.success;

/**
 * Repository Ext.Direct resource.
 *
 * @since 2.7
 */
@Named
@Singleton
@DirectAction(action = "Repository")
public class RepositoryDirectResource
    implements DirectResource
{

  private final RepositoryRegistry repositoryRegistry;

  @Inject
  public RepositoryDirectResource(final RepositoryRegistry repositoryRegistry) {
    this.repositoryRegistry = repositoryRegistry;
  }

  /**
   * Retrieve a list of available repositories.
   */
  @DirectMethod
  public Response read() {
    try {
      return success(Lists.transform(repositoryRegistry.getRepositories(), new Function<Repository, RepositoryUX>()
      {
        @Override
        public RepositoryUX apply(final Repository input) {
          return new RepositoryUX()
              .withId(input.getId())
              .withName(input.getName());
        }
      }));
    }
    catch (Exception e) {
      return error(e);
    }
  }

}
