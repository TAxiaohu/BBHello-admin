/* global malarkey:false, moment:false */
(function () {
  'use strict';

  angular
    .module('BBHelloAdmin')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('APP_MEDIAQUERY', {
      'desktopXL': 1200,
      'desktop': 992,
      'tablet': 768,
      'mobile': 480
    });

})();
