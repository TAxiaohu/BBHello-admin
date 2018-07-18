/**
 * Created by xiaohu on 2016/4/10.
 */
(function () {
  'use strict';

  var filterId = 'orderSatus';

  angular.module('app.core')
    .filter(filterId, orderSatusFilter);

  /** @ngInject */
  function orderSatusFilter() {
    return function (input) {
      switch (input) {
        case 0:
          input = '未支付订金';
          break;
        case 1:
          input = '已支付订金';
          break;
      }
      return input;
    };
  }
})();
