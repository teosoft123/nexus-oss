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
package com.director.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Copied from direct-core in order to fix url & add logging.
 *
 * @since 2.8
 * @see #getUrl()
 */
public abstract class AbstractProvider implements Provider {

  private static final Logger LOG = LoggerFactory.getLogger(AbstractProvider.class);

   private String id;
   private String namespace;
   private ProviderType type;
   private DirectConfiguration configuration;

   protected AbstractProvider(String id, String namespace, ProviderType type, DirectConfiguration configuration) {
      this.id = id;
      this.namespace = namespace;
      this.type = type;
      this.configuration = configuration;
   }

   public String getUrl() {
     String routerUrl = this.configuration.getRouterUrl();
     String providerParamName = this.configuration.getProviderParamName();
     return String.format("%s?%s=%s", routerUrl, providerParamName, this.id);
   }

   public String getId() {
      return this.id;
   }

   public String getNamespace() {
      return this.namespace;
   }

   public String getType() {
      return this.type.getTypeName();
   }

   public void process(HttpServletRequest request, HttpServletResponse response) {
      try {
         DirectContext.init(request, response, this.configuration);
         this.handleProcess();
         this.handleResponse();
      } finally {
         DirectContext.dispose();
      }
   }

   private void handleProcess() {
      try {
         this.doProcess();
      } catch(Throwable e) {
         LOG.error("Provider error, provider id " + this.id + " error executing direct request ", e);
         DirectContext.get().pushEvent(new DirectExceptionEvent(e));
      }
   }

   private void handleResponse() {
      try {
         this.formatForOutput();
      } catch(Exception e) {
         LOG.error("Provider error, provider id " + this.id + " error formatting direct request output", e);
      }
   }

   protected abstract void doProcess() throws Throwable;

   protected abstract void formatForOutput() throws IOException;
}
