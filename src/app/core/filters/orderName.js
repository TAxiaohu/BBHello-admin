/**
 * Created by Administrator on 2016/4/11.
 */
(function () {
  'use strict';

  var filterId = 'orderNameType';

  angular.module('app.core')
    .filter(filterId, orderNameTypeFilter);

  /** @ngInject */
  function orderNameTypeFilter() {
    return function (input) {
      switch (input) {
        case 1:
          input = '生育专项旅游体检套餐';
          break;
        case 2:
          input = '单次试管婴儿套餐';
          break;
        case 3:
          input = '两次试管婴儿套餐';
          break;
        case 4:
          input = '乐生备孕营99元套餐';
          break;
      }
      return input;
    };
  }
})();
