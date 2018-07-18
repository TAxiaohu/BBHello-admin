(function () {
  'use strict';

  angular
    .module('BBHelloAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, $stateParams) {



    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
      name: '51二胎', // name of your project
      author: '51二胎', // author's name or company name
      description: '51二胎', // brief description
      version: '1.0', // current version
      year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
      isMobile: (function () {// true if the browser is a mobile device
        var check = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          check = true;
        }
        return check;
      })(),
      layout: {
        isNavbarFixed: true, //true if you want to initialize the template with fixed header
        isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
        isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
        isFooterFixed: false, // true if you want to initialize the template with fixed footer
        theme: 'theme-1', // indicate the theme chosen for your project
        logo: 'assets/images/logo.png' // relative path of the project logo
        //logo: 'assets/images/jinrong-logo.png' // relative path of the project logo
      }
    };
    $rootScope.user = {
      name: 'Peter',
      job: 'ng-Dev',
      picture: 'app/img/user/02.jpg'
    };
  }

})();
