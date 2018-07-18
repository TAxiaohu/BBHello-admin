/**
 * Created by hu on 2016/4/9.
 */
(function () {
  'use strict';

  var serviceId = 'OrderService';

  angular.module('app.core')
    .factory(serviceId, OrderService);

  /** @ngInject */
  function OrderService($modelFactory,config) {
    var model = $modelFactory('admin/order', {
      pk: 'saleOrderId',
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
          url:'{saleOrderId}',
          method: 'put'
        },
        updateStoresAuditStatus:{
          url:'{contentId}',
          method: 'put'
        },
        getOrderJourney:{
          url:config.apiUrl + '/admin/journey/main/' + '{saleOrderId}',
          method: 'GET',
          override: true
        },
        queryOrder:{
          url:config.apiUrl + '/admin/order',
          method: 'GET',
          override: true
        },
        createOrderJourney:{
          url:config.apiUrl + '/admin/journey',
          method: 'POST',
          override: true
        },
        UpdateOrderJourney:{
          url:config.apiUrl + '/admin/journey',
          method: 'PUT',
          override: true
        },
        orderExperienceImg:{
          url:config.apiUrl + '/photo/data/'+'{saleOrderId}',
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
      updateAuditStatus:updateAuditStatus,
      getJourney:getJourney,
      createStep:createStep,
      updateStep:updateStep,
      getOrderImg:getOrderImg,
      getqueryOrder:getqueryOrder
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

    /**
     * 获取订单行程
     * @param params
     * @returns {*}
     */
    function getJourney(params){
      return model.getOrderJourney(params);
    }
    /**
     * 创建订单行程
     * @param params
     * @returns {*}
     */
    function createStep(params){
      return model.createOrderJourney(params);
    }
    /**
     * 编辑订单详情
     * @param params
     * @returns {*}
     */
    function updateStep(params){
      return model.UpdateOrderJourney(params);
    }

    /**
     * 获取订单体验列表图片
     * @param params
     * @returns {*}
     */
    function getOrderImg(params){
      return model.orderExperienceImg(params);
    }
    /**
     * 获取订单搜索
     * @param params
     * @returns {*}
     */
    function getqueryOrder(params){
      return model.orderExperienceImg(params);
    }

  }
})();
