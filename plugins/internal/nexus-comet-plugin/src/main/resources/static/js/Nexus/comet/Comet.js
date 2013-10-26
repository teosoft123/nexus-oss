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
 * ???
 *
 * @since 2.7
 */
NX.define('Nexus.comet.Comet', {
  singleton: true,

  requirejs: [
    'org/cometd',
    'org/cometd/AckExtension',
    'org/cometd/ReloadExtension',
    'org/cometd/TimeStampExtension',
    'org/cometd/TimeSyncExtension'
  ],

  mixins: [
    'Nexus.LogAwareMixin'
  ],

  /**
   * @private
   */
  cometd: undefined,

  /**
   * @public
   */
  init: function () {
    var me = this,
        url,
        cometd;

    me.logDebug('Initializing');

    url = Sonatype.config.host + Sonatype.config.contextPath + '/service/comet/'; // trailing slash is important
    me.logDebug('URL: ' + url);

    cometd = new org.cometd.Cometd('default');
    cometd.registerTransport('websocket', new org.cometd.WebSocketTransport());

    // TODO: Look into how to provide longpolling transports, IIUC needs some more integration
    // TODO: https://code.google.com/p/ext-cometd/source/browse/trunk/src/main/webapp/js/ext-cometd/ext-cometd.js
    //if (org.cometd.WebSocket) {
    //  cometd.registerTransport('websocket', new org.cometd.WebSocketTransport());
    //}
    //cometd.registerTransport('long-polling', new org.cometd.LongPollingTransport());
    //cometd.registerTransport('callback-polling', new org.cometd.CallbackPollingTransport());

    cometd.configure({
      url: url,
      logLevel: 'debug'
    });

    cometd.addListener('/meta/handshake', function (message)
    {
      if (message.successful) {
        me.logDebug('SUCCESS');
      }
      else {
        me.logDebug('FAILURE');
      }
    });

    cometd.handshake({
      // TODO: what goes here?
    });

    me.cometd = cometd;

    me.logDebug('Initialized');
  }
});