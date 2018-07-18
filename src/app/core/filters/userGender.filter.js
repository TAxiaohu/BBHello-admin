/**
 * Created by xiaohu on 2016/3/24.
 */
(function () {
  'use strict';

  var filterId = 'UserGenderStatus';

  angular.module('app.core')
    .filter(filterId, UserGenderStatusFilter);

  /** @ngInject */
  function UserGenderStatusFilter() {
    return function (input) {
      switch (input) {
        case 0:
          input = '保密';
          break;
        case 1:
          input = '男';
          break;
        case 2:
          input = '女';
          break;
      }
      return input;
    };
  }
})();
