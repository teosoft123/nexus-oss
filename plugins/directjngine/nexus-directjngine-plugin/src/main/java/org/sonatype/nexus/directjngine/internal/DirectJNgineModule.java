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

package org.sonatype.nexus.directjngine.internal;

import java.io.File;
import java.lang.annotation.Annotation;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.servlet.ServletConfig;

import org.sonatype.guice.bean.locators.BeanLocator;
import org.sonatype.inject.BeanEntry;
import org.sonatype.nexus.configuration.application.ApplicationConfiguration;
import org.sonatype.nexus.directjngine.DirectResource;
import org.sonatype.nexus.guice.FilterChainModule;
import org.sonatype.nexus.web.MdcUserContextFilter;
import org.sonatype.security.web.guice.SecurityWebFilter;

import com.google.common.base.Function;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.inject.AbstractModule;
import com.google.inject.Key;
import com.google.inject.servlet.ServletModule;
import com.softwarementors.extjs.djn.config.ApiConfiguration;
import com.softwarementors.extjs.djn.servlet.DirectJNgineServlet;
import com.softwarementors.extjs.djn.servlet.DirectJNgineServlet.GlobalParameters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * DirectJNgine plugin module.
 *
 * @since 2.7
 */
@Named
@Singleton
public class DirectJNgineModule
    extends AbstractModule
{

  private static final Logger log = LoggerFactory.getLogger(DirectJNgineModule.class);

  public static final String SERVICE_NAME = "direct";

  public static final String MOUNT_POINT = "/service/" + SERVICE_NAME;

  public static final String SKIP_MODULE_CONFIGURATION = DirectJNgineModule.class.getName() + ".skip";

  @Override
  protected void configure() {
    // HACK: avoid configuration of this module in cases as it is not wanted. e.g. automatically discovered by sisu
    if (!Boolean.getBoolean(SKIP_MODULE_CONFIGURATION)) {
      doConfigure();
    }
  }

  private void doConfigure() {
    // FIXME: Sort this out... nexus-restlet1x-plugin should not have anything to do with this plugin

    // We need to import some components from nexus-restlet1x-plugin for SecurityWebFilter, but its use is
    // hidden behind guice-servlet muck. We therefore bind it explicitly here so it will get seen by Sisu.
    // It would have been preferable to use "requireBinding(SecurityWebFilter.class)" to import the
    // SecurityWebFilter instance from nexus-restlet1x-plugin, but guice-servlet only wants to see filters
    // bound directly as singletons in this Injector (odd limitation). An alternative would have been to
    // requireBinding's for SecuritySystem and FilterChainResolver, which are the filter's dependencies.

    bind(SecurityWebFilter.class);

    install(new ServletModule()
    {
      @Override
      protected void configureServlets() {
        Map<String, String> config = Maps.newHashMap();
        config.put(GlobalParameters.PROVIDERS_URL, "service/direct");
        config.put(GlobalParameters.DEBUG, Boolean.toString(log.isDebugEnabled()));

        serve(MOUNT_POINT).with(NexusDirectJNgineServlet.class, config);

        filter(MOUNT_POINT).through(SecurityWebFilter.class);
        filter(MOUNT_POINT).through(MdcUserContextFilter.class);
      }
    });

    install(new FilterChainModule()
    {
      @Override
      protected void configure() {
        addFilterChain(MOUNT_POINT, "noSessionCreation,authcBasic");
      }

    });
  }

  @Named
  @Singleton
  public static class NexusDirectJNgineServlet
      extends DirectJNgineServlet
  {

    private final ApplicationConfiguration applicationConfiguration;

    private final BeanLocator beanLocator;

    @Inject
    public NexusDirectJNgineServlet(final ApplicationConfiguration applicationConfiguration,
                                    final BeanLocator beanLocator)
    {
      this.applicationConfiguration = checkNotNull(applicationConfiguration);
      this.beanLocator = checkNotNull(beanLocator);
    }

    @Override
    protected List<ApiConfiguration> createApiConfigurationsFromServletConfigurationApi(
        final ServletConfig configuration)
    {
      File apiFile = new File(applicationConfiguration.getTemporaryDirectory(), "djn/Nexus.js");
      final Iterable<BeanEntry<Annotation, DirectResource>> entries = beanLocator.locate(Key.get(DirectResource.class));
      List<Class<?>> apiClasses = Lists.newArrayList(
          Iterables.transform(entries, new Function<BeanEntry<Annotation, DirectResource>, Class<?>>()
          {
            @Nullable
            @Override
            public Class<?> apply(final BeanEntry<Annotation, DirectResource> input) {
              return input.getImplementationClass();
            }
          })
      );
      return Lists.newArrayList(
          new ApiConfiguration(
              "nexus",
              apiFile.getName(),
              apiFile.getAbsolutePath(),
              "Nexus.direct",
              "",
              apiClasses
          )
      );
    }
  }

}
