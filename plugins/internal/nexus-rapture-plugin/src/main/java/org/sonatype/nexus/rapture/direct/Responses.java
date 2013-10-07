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

package org.sonatype.nexus.rapture.direct;

import java.util.List;

import org.sonatype.configuration.validation.InvalidConfigurationException;
import org.sonatype.configuration.validation.ValidationMessage;

/**
 * Ext.Direct response builder.
 *
 * @since 2.7
 */
public class Responses
{

  public static Response success() {
    return new Response(true);
  }

  public static ErrorResponse error(final Throwable cause) {
    return new ErrorResponse(cause);
  }

  public static ValidationResponse invalid(final InvalidConfigurationException cause) {
    return new ValidationResponse(cause.getValidationResponse().getValidationErrors());
  }

  public static ValidationResponse invalid(final List<ValidationMessage> messages) {
    return new ValidationResponse(messages);
  }

  public static <T> IdResponse<T> id(T id) {
    return new IdResponse<>(id);
  }

  public static <E> ListResponse<E> list(List<E> entities) {
    return new ListResponse<>(entities);
  }

}
