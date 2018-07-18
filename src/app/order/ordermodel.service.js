/**
 * Created by 小胡 on 2016/5/16.
 */
(function () {
  'use strict';

  var serviceId = 'OrderModelService';

  angular.module('app.core')
    .factory(serviceId, OrderModelService);

  /** @ngInject */
  function OrderModelService($modelFactory) {
    var model = $modelFactory('admin/order/query', {
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
