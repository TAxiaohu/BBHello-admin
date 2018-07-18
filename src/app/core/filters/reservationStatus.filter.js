/**
 * Created by xiaohu on 2016/4/7.
 */
(function () {
  'use strict';

  var filterId = 'reservationStatus';

  angular.module('app.core')
    .filter(filterId, reservationStatusFilter);

  /** @ngInject */
  function reservationStatusFilter() {
    return function (input) {
      switch (input) {
        case 0:
          input = '不成功';
          break;
        case 1:
          input = '成功';
          break;
      }
      return input;
    };
  }
})();
