(function () {
  'use strict';

  angular
    .module('BBHelloAdmin')
    .config(httpConfig)
    .config(toastConfig)
    .config(translateConfig)
    .config(loadingBarConfig)
    .config(modelFactoryConfig);

  /** @ngInject */
  function httpConfig($httpProvider) {
    $httpProvider.defaults.headers.delete = {'Content-Type': 'application/json'};
    $httpProvider.defaults.headers.put = {'Content-Type': 'application/json'};
    $httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};
  }

  /** @ngInject */
  function toastConfig($logProvider, toastrConfig) {

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  /** @ngInject */
  function loadingBarConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
  }

  /** @ngInject */
  function translateConfig($translateProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/i18n/',
      suffix: '.json'
    });

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    $translateProvider.preferredLanguage('en');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();

    // Enable sanitize
    $translateProvider.useSanitizeValueStrategy('sanitize');

  }

  /* @ngInject */
  function modelFactoryConfig($modelFactoryProvider, config) {
    // all models will now strip trailing slashes
    $modelFactoryProvider.defaultOptions.stripTrailingSlashes = true;

    // all models will now be prefixed by 'api'
    $modelFactoryProvider.defaultOptions.prefix = config.apiUrl;
  }
})
();
