/**
 * Created by xiaohu on 2016/1/22.
 */
(function () {
  'use strict';

  var filterId = 'userStatus';

  angular.module('app.core')
    .filter(filterId, userStatusFilter);

  /** @ngInject */
  function userStatusFilter() {
    return function (input) {
      switch (input) {
        case 'INVALID':
          input = '已冻结';
          break;
        case 'NORMAL':
          input = '正常';
          break;
        case 'DELETED':
          input = '已删除';
          break;
        case ' UNKNOWN':
          input = '未知';
          break;
      }
      return input;
    };
  }
})();
