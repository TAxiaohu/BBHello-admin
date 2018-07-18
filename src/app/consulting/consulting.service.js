/**
 * Created by xiaohu on 2016/3/8.
 */
(function () {
  'use strict';

  var serviceId = 'ConsultingService';

  angular.module('app.core')
    .factory(serviceId, ConsultingService);

  /** @ngInject */
  function ConsultingService($modelFactory) {
    var model = $modelFactory('admin/content', {
      pk: 'contentId',
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
        },
        deleteStores: {
          method: 'delete'
        },
        updateStores:{
          url:'{contentId}',
          method: 'put'
        },
        updateStoresAuditStatus:{
          url:'{contentId}',
          method: 'put'
        }
      }
    });

    var service = {
      getList: getList,
      getDetail: getDetail,
      create: create,
      remove: remove,
      update: update,
      updateAuditStatus:updateAuditStatus
    };

    return service;

    //////////////////////////

    /**
     * 获取技师列表数据
     * @param params
     * @returns {*}
     */
    function getList(params) {
      return model.query(params);
    }

    /**
     * 获取技师详情
     * @param params
     * @returns {*}
     */
    function getDetail(params) {
      return model.get(params);
    }

    /**
     * 删除产品
     * @param params
     * @returns {*|{method}}
     */
    function remove(params) {
      return model.deleteStores(params);
    }

    /**
     * 新增用户
     * @param params
     * @returns {*}
     */
    function create(params) {
      return model.post(params);
    }

    /**
     * 编辑
     * @param params
     * @returns {*}
     */
    function update(params){
      return model.updateStores(params);
    }
    /**
     * 审核
     * @param params
     * @returns {*}
     */
    function updateAuditStatus(params){
      return model.updateStoresAuditStatus(params);
    }

  }
})();
