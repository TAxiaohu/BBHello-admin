/**
 * Created by Administrator on 2016/3/22.
 */
(function () {
  'use strict';

  var serviceId = 'UserService';

  angular.module('app.core')
    .factory(serviceId, UserService);

  /** @ngInject */
  function UserService($modelFactory,config) {
    var model = $modelFactory('admin/appUser', {
      pk: 'userId',
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
          url:'{userId}',
          method: 'put'
        },
        getAgentUserList:{
          url:config.apiUrl + '/admin/brokercustomer/main/{userId}',
          method: 'GET',
          override: true
        }
      }
    });

    var service = {
      getList: getList,
      getDetail: getDetail,
      create: create,
      remove: remove,
      update: update,
      getAgentUser:getAgentUser
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
     * 查看经纪人录入用户
     * @param params
     * @returns {*}
     */
    function getAgentUser(params){
      return model.getAgentUserList(params);
    }

  }
})();
