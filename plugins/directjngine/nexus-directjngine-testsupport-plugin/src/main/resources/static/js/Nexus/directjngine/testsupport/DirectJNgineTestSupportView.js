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
/*global NX, Ext, Nexus, Sonatype*/

/**
 * DirectJNgine Test Support master/detail view.
 *
 * @since 2.7
 */
NX.define('Nexus.directjngine.testsupport.DirectJNgineTestSupportView', {
  extend: 'Ext.Panel',

  mixins: [
    'Nexus.LogAwareMixin'
  ],

  /**
   * @override
   */
  initComponent: function () {
    var self = this;

    self.userName = NX.create('Ext.form.TextField', {
      label: 'Name'
    });

    Ext.apply(self, {
      title: 'DirectJNgine',
      items: [
        {
          xtype: "button",
          text: "System clock",
          handler: function () {
            SystemClock.getTime(function (result) {
              alert(result);
            });
          }
        },
        {
          xtype: "button",
          text: "Get Nexus Temp dir",
          handler: function () {
            Info.getTempDir(function (result) {
              alert(result);
            });
          }
        },
        {
          xtype: 'container',
          layout: 'column',
          items: [
            self.userName,
            {
              xtype: "button",
              text: "Get full name",
              handler: function () {
                Info.getUser(self.userName.getValue(), function (result, e) {
                  if (e.serverException) {
                    alert(e.serverException.exception.message)
                  }
                  else {
                    alert(result.firstName + ' ' + result.lastName);
                  }
                });
              }
            }
          ]
        }
      ]
    });

    self.constructor.superclass.initComponent.apply(self, arguments);
  }

});