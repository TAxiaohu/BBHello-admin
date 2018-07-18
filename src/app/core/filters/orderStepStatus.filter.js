/**
 * Created by xiaohu on 2016/4/10.
 */
(function () {
  'use strict';

  var filterId = 'orderJourneyType';

  angular.module('app.core')
    .filter(filterId, orderJourneyTypeFilter);

  /** @ngInject */
  function orderJourneyTypeFilter() {
    return function (input) {
      switch (input) {
        case 0:
          input = '初始化';
          break;
        case 1:
          input = '进行中';
          break;
        case 2:
          input = '成功';
          break;
        case 3:
          input = '跳过';
          break;
      }
      return input;
    };
  }
})();
