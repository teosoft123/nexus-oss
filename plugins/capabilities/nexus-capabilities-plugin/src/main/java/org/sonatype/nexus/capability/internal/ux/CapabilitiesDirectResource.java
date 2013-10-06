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

package org.sonatype.nexus.capability.internal.ux;

import java.util.Collection;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.ws.rs.PathParam;

import org.sonatype.configuration.validation.InvalidConfigurationException;
import org.sonatype.nexus.capabilities.model.CapabilityStatusXO;
import org.sonatype.nexus.capabilities.model.CapabilityXO;
import org.sonatype.nexus.directjngine.DirectResource;
import org.sonatype.nexus.plugins.capabilities.CapabilityNotFoundException;
import org.sonatype.nexus.plugins.capabilities.CapabilityReference;
import org.sonatype.nexus.plugins.capabilities.CapabilityRegistry;
import org.sonatype.nexus.plugins.capabilities.internal.rest.CapabilitiesResource;
import org.sonatype.nexus.plugins.capabilities.support.CapabilityReferenceFilterBuilder;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.softwarementors.extjs.djn.config.annotations.DirectAction;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.sonatype.nexus.plugins.capabilities.CapabilityIdentity.capabilityIdentity;
import static org.sonatype.nexus.plugins.capabilities.CapabilityType.capabilityType;

/**
 * Capabilities Ext.Direct resource.
 *
 * @since 2.7
 */
@Named
@Singleton
@DirectAction(action = "Capabilities")
public class CapabilitiesDirectResource
    implements DirectResource
{

  private final CapabilityRegistry capabilityRegistry;

  @Inject
  public CapabilitiesDirectResource(final CapabilityRegistry capabilityRegistry) {
    this.capabilityRegistry = checkNotNull(capabilityRegistry);
  }

  /**
   * Retrieve a list of all capabilities currently configured in nexus.
   */
  @DirectMethod
  public Response get() {
    try {
      final Collection<? extends CapabilityReference> references = capabilityRegistry.get(
          CapabilityReferenceFilterBuilder.capabilities()
      );
      return new SuccessfulListResponse(
          Lists.transform(Lists.newArrayList(references), new Function<CapabilityReference, CapabilityStatusXO>()
          {
            @Nullable
            @Override
            public CapabilityStatusXO apply(@Nullable final CapabilityReference input) {
              if (input == null) {
                return null;
              }
              return CapabilitiesResource.asCapabilityStatus(input);
            }
          })
      ).shouldRefresh();
    }
    catch (Exception e) {
      return new ErrorResponse(e);
    }
  }

  /**
   * Add a new capability.
   */
  @DirectMethod
  public Response create(final CapabilityXO capability) {
    try {
      return new SuccessfulIdResponse(
          capabilityRegistry.add(
              capabilityType(capability.getTypeId()),
              capability.isEnabled(),
              capability.getNotes(),
              CapabilitiesResource.asMap(capability.getProperties())
          ).context().id().toString()
      ).shouldRefresh();
    }
    catch (InvalidConfigurationException e) {
      return new InvalidResponse(e.getValidationResponse().getValidationErrors());
    }
    catch (Exception e) {
      return new ErrorResponse(e);
    }
  }

  /**
   * Update the configuration of an existing capability.
   */
  @DirectMethod
  public Response update(final CapabilityXO capability) {
    try {
      return new SuccessfulIdResponse(
          capabilityRegistry.update(
              capabilityIdentity(capability.getId()),
              capability.isEnabled(),
              capability.getNotes(),
              CapabilitiesResource.asMap(capability.getProperties())
          ).context().id().toString()
      ).shouldRefresh();
    }
    catch (InvalidConfigurationException e) {
      return new InvalidResponse(e.getValidationResponse().getValidationErrors());
    }
    catch (CapabilityNotFoundException e) {
      return new ErrorResponse(e).shouldRefresh();
    }
    catch (Exception e) {
      return new ErrorResponse(e);
    }
  }

  /**
   * Delete an existing capability.
   */
  @DirectMethod
  public Response delete(final String id) {
    try {
      capabilityRegistry.remove(capabilityIdentity(id));
      return new Response(true);
    }
    catch (CapabilityNotFoundException e) {
      return new ErrorResponse(e).shouldRefresh();
    }
    catch (Exception e) {
      return new ErrorResponse(e);
    }
  }

  /**
   * Enable an existing capability.
   */
  @DirectMethod
  public Response enable(final String id) {
    try {
      capabilityRegistry.enable(capabilityIdentity(id));
      return new Response(true);
    }
    catch (CapabilityNotFoundException e) {
      return new ErrorResponse(e).shouldRefresh();
    }
    catch (Exception e) {
      return new ErrorResponse(e);
    }
  }

  /**
   * Disable an existing capability.
   */
  @DirectMethod
  public Response disable(final @PathParam("id") String id) {
    try {
      capabilityRegistry.disable(capabilityIdentity(id));
      return new Response(true);
    }
    catch (CapabilityNotFoundException e) {
      return new ErrorResponse(e).shouldRefresh();
    }
    catch (Exception e) {
      return new ErrorResponse(e);
    }
  }

}
