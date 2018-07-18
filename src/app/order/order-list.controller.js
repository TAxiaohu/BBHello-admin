/**
 * Created by xiaohu on 04/09/16.
 */
(function () {
  'use strict';

  angular
    .module('app.order')
    .controller('orderListController', orderListController);

  /* @ngInject */
  function orderListController($state, ngTableParams,dateFilter,OrderModelService) {
    var vm = this;
    var orderParams = {
      page: 1,
      limit: 10
    };

    vm.tableParams = new ngTableParams({
      page: orderParams.page, // show first page
      count: orderParams.limit
    }, {
      counts: [],
      getData: function ($defer, params) {
        //var type = 'type=1'
        orderParams.page = params.page();
        OrderModelService.getList(orderParams).then(function (res) {
          vm.order = res;
          params.total(res.$metadata.total);
          $defer.resolve(res);
        });
      }
    });
    vm.title = $state.current.title;
    vm.selectHospital = [];
    vm.checkAll = checkAll;
    vm.remove = remove;
    vm.gotoCreate = gotoCreate;
    vm.gotoEdit = gotoEdit;
    vm.search = search;
    vm.reset = reset;

    vm.endOpen = endOpen;
    vm.startOpen = startOpen;

    function endOpen($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.startOpened = false;
      vm.endOpened = !vm.endOpened;
    }

    function startOpen($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.endOpened = false;
      vm.startOpened = !vm.startOpened;
    }


    //搜索
    function search(params) {
      var beginTime1 = params.beginTime;
      var endTime1 = params.endTime;
      var beginTime = dateFilter(beginTime1, 'yyyy-MM-dd');
      var endTime = dateFilter(endTime1, 'yyyy-MM-dd');
      var _params = {
        outTradeNo:params.outTradeNo,
        userCellphone:params.userCellphone,
        brokerCellphone:params.brokerCellphone,
        name:params.name,
        cellphone:params.cellphone,
        goodsId:params.goodsId,
        beginTime:beginTime,
        endTime:endTime
      };
      vm.tableParams.$params.page = 1;
      orderParams = angular.extend({}, orderParams, _params);
        vm.tableParams.reload();
    }

    //重置搜索条件
    function reset() {
      vm.tableParams.$params.page = 1;
      vm.queryParams = {};
      orderParams = {
        page: 1,
        limit: 10
      };
      vm.tableParams.reload();
    }
    //跳转新增页面
    function gotoCreate() {
      $state.go('app.order.create');
    }
  //跳转编辑页面
    function gotoEdit(params) {
      $state.go('app.order.edit',{saleOrderId:params.saleOrderId});
    }

    //批量删除
    function remove(ids) {
     /* HospitalService.remove(ids).then(function (res) {
        vm.tableParams.reload();
      });*/
    }

    //全选操作
    function checkAll() {
      if (vm.isAll) {
        vm.selectHospital = vm.hospitals.map(function (item) {
          return item.hospitalId;
        });
      } else {
        vm.selectHospital = [];
      }
    }

  }
})();
