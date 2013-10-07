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

package org.sonatype.nexus.capability.direct;

import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.nexus.capabilities.model.CapabilityTypeXO;
import org.sonatype.nexus.capabilities.model.FormFieldXO;
import org.sonatype.nexus.formfields.FormField;
import org.sonatype.nexus.formfields.Selectable;
import org.sonatype.nexus.plugins.capabilities.CapabilityDescriptor;
import org.sonatype.nexus.plugins.capabilities.CapabilityDescriptorRegistry;
import org.sonatype.nexus.rapture.direct.DirectResource;
import org.sonatype.nexus.rapture.direct.Response;
import org.sonatype.sisu.goodies.common.ComponentSupport;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.softwarementors.extjs.djn.config.annotations.DirectAction;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

import static org.sonatype.nexus.rapture.direct.Responses.error;
import static org.sonatype.nexus.rapture.direct.Responses.list;

/**
 * Capabilities Types Ext.Direct resource.
 *
 * @since 2.7
 */
@Named
@Singleton
@DirectAction(action = "CapabilityTypes")
public class CapabilityTypesDirectResource
    extends ComponentSupport
    implements DirectResource
{

  private final CapabilityDescriptorRegistry capabilityDescriptorRegistry;

  @Inject
  public CapabilityTypesDirectResource(final CapabilityDescriptorRegistry capabilityDescriptorRegistry) {
    this.capabilityDescriptorRegistry = capabilityDescriptorRegistry;
  }

  /**
   * Retrieve a list of capability types available.
   */
  @DirectMethod
  public Response get() {
    try {
      final List<CapabilityTypeXO> types = Lists.newArrayList();
      final CapabilityDescriptor[] descriptors = capabilityDescriptorRegistry.getAll();

      if (descriptors != null) {
        for (final CapabilityDescriptor descriptor : descriptors) {
          if (descriptor.isExposed()) {

            CapabilityTypeXO type = new CapabilityTypeXO()
                .withId(descriptor.type().toString())
                .withName(descriptor.name())
                .withAbout(descriptor.about());

            types.add(type);

            if (descriptor.formFields() != null) {
              type.withFormFields(Lists.transform(descriptor.formFields(), new Function<FormField, FormFieldXO>()
              {
                @Nullable
                @Override
                public FormFieldXO apply(@Nullable final FormField input) {
                  if (input == null) {
                    return null;
                  }

                  FormFieldXO formField = new FormFieldXO()
                      .withId(input.getId())
                      .withType(input.getType())
                      .withLabel(input.getLabel())
                      .withHelpText(input.getHelpText())
                      .withRequired(input.isRequired())
                      .withRegexValidation(input.getRegexValidation());

                  if (input.getInitialValue() != null) {
                    formField.setInitialValue(input.getInitialValue().toString());
                  }

                  if (input instanceof Selectable) {
                    formField
                        .withStorePath(((Selectable) input).getStorePath())
                        .withStoreRoot(((Selectable) input).getStoreRoot())
                        .withIdMapping(((Selectable) input).getIdMapping())
                        .withNameMapping(((Selectable) input).getNameMapping());
                  }

                  return formField;
                }
              }));
            }
          }
        }
      }

      return list(types);
    }
    catch (Exception e) {
      return error(e);
    }
  }

}
