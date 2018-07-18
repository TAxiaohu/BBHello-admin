/**
 * Created by xiaohu on 2016/4/7.
 */
(function () {
  'use strict';

  var filterId = 'UserTypeStatus';

  angular.module('app.core')
    .filter(filterId, UserTypeStatusFilter);

  /** @ngInject */
  function UserTypeStatusFilter() {
    return function (input) {
      switch (input) {
        case '0':
          input = '普通用户 ';
          break;
        case '1':
          input = '普通经纪人';
          break;
        case '2':
          input = '金牌经纪人';
          break;
      }
      return input;
    };
  }
})();
