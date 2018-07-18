(function () {
  'use strict';

  angular
    .module('BBHelloAdmin', [
      'app.config',
      'app.core',
      'app.auth',
      /*'app.dashboard',*/
      'app.user',
      /*'app.administrator',*/
      'app.article',
      'app.consulting',
      'app.report',
       'app.technology',
      'app.order'
    ]);

})();
