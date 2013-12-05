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

/**
 * Events panel.
 *
 * @since 2.8
 */
NX.define('Nexus.analytics.view.Events', {
  extend: 'Ext.Panel',

  mixins: [
    'Nexus.LogAwareMixin'
  ],

  requires: [
    'Nexus.analytics.Icons'
  ],

  xtype: 'nx-analytics-view-events',
  title: 'Events',
  id: 'nx-analytics-view-events',
  cls: 'nx-analytics-view-events',

  border: false,
  layout: 'fit',

  /**
   * @override
   */
  initComponent: function () {
    var me = this,
        icons = Nexus.analytics.Icons;

    Ext.apply(me, {
      items: [
        {
          xtype: 'container',
          items: [
            {
              cls: 'nx-analytics-view-events-description',
              border: false,
              html: 'TODO'
            }
          ]
        }
      ],
      
      tbar: [
        {
          xtype: 'button',
          id: 'nx-analytics-view-events-button-refresh',
          text: 'Refresh',
          tooltip: 'Refresh event data',
          iconCls: icons.get('refresh').cls
        },
        {
          xtype: 'button',
          id: 'nx-analytics-view-events-button-clear',
          text: 'Clear',
          tooltip: 'Clear all event data',
          iconCls: icons.get('clear').cls
        },
        {
          xtype: 'button',
          id: 'nx-analytics-view-events-button-export',
          text: 'Export',
          tooltip: 'Export and download event data',
          iconCls: icons.get('export').cls
        },
        '-',
        {
          xtype: 'button',
          id: 'nx-analytics-view-events-button-submit',
          text: 'Submit',
          tooltip: 'Submit event data to Sonatype',
          iconCls: icons.get('submit').cls
        }
      ]
    });

    me.constructor.superclass.initComponent.apply(me, arguments);
  }
});