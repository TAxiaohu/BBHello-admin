/**
 * Created by xiaohu on 2016/5/16.
 */
(function () {
  'use strict';

  var serviceId = 'UserModelService';

  angular.module('app.core')
    .factory(serviceId, UserModelService);

  /** @ngInject */
  function UserModelService($modelFactory) {
    var model = $modelFactory('admin/appUser/search', {
      actions: {
        base: {
          afterRequest: function (response) {
            if (response.data) {
              if (response.data.items) {
                var transform = response.data.items;
                delete response.data.items;
                transform.$metadata = response.data;
                return transform;
              } else {
                return response.data;
              }
            }
          }
        }
      }
    });

    var service = {
      getList: getList
    };

    return service;

    //////////////////////////

    /**
     * 用户查询
     * @param params
     * @returns {*}
     */
    function getList(params) {
      return model.query(params);
    }
  }
})();
