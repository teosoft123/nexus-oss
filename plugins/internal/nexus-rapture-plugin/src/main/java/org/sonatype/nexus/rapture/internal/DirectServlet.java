package org.sonatype.nexus.rapture.internal;

import java.io.File;
import java.lang.annotation.Annotation;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.servlet.ServletConfig;

import org.sonatype.guice.bean.locators.BeanLocator;
import org.sonatype.inject.BeanEntry;
import org.sonatype.nexus.configuration.application.ApplicationConfiguration;
import org.sonatype.nexus.rapture.direct.DirectResource;

import com.google.common.base.Function;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.inject.Key;
import com.softwarementors.extjs.djn.api.RegisteredMethod;
import com.softwarementors.extjs.djn.config.ApiConfiguration;
import com.softwarementors.extjs.djn.router.dispatcher.Dispatcher;
import com.softwarementors.extjs.djn.servlet.DirectJNgineServlet;
import com.softwarementors.extjs.djn.servlet.ssm.SsmDispatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * ???
 *
 * @since 2.7
 */
@Named
@Singleton
public class DirectServlet
    extends DirectJNgineServlet
{

  private static final Logger log = LoggerFactory.getLogger(DirectServlet.class);

  private final ApplicationConfiguration applicationConfiguration;

  private final BeanLocator beanLocator;

  @Inject
  public DirectServlet(final ApplicationConfiguration applicationConfiguration,
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
            "NX.direct",
            "",
            apiClasses
        )
    );
  }

  @Override
  protected Dispatcher createDispatcher(final Class<? extends Dispatcher> cls) {
    return new SsmDispatcher()
    {
      @Override
      protected Object createInvokeInstanceForMethodWithDefaultConstructor(final RegisteredMethod method)
          throws Exception
      {
        log.debug(
            "Creating instance of action class '{}' mapped to '{}",
            method.getActionClass().getName(), method.getActionName()
        );
        Iterable<BeanEntry<Annotation, Object>> actionInstance = beanLocator.locate(
            Key.get((Class) method.getActionClass())
        );
        return actionInstance.iterator().next().getValue();
      }
    };
  }

}
