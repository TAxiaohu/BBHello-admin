/**
 * Created by xiaohu on 2016/3/8.
 */
(function () {
  'use strict';

  angular
    .module('app.consulting')
    .controller('consultingListController', consultingListController);

  /* @ngInject */
  function consultingListController($state, toastr,ngTableParams,dateFilter,ConsultingService) {
    var vm = this;

    vm.title = $state.current.title;

    var consultingParams = {
      page: 1,
      limit: 10,
      type:0
    };

    vm.tableParams = new ngTableParams({
      page: consultingParams.page, // show first page
      count: consultingParams.limit
    }, {
      counts: [],
      getData: function ($defer, params) {
        //var type = 'type=1'
        consultingParams.page = params.page();
        ConsultingService.getList(consultingParams).then(function (res) {
          vm.consulting = res;
          params.total(res.$metadata.total);
          $defer.resolve(res);
        });
      }
    });

    vm.selectInfomation = [];
    vm.checkAll = checkAll;
    vm.batchRemove = batchRemove;
    vm.gotoCreate = gotoCreate;
    vm.gotoEdit = gotoEdit;
    vm.gotoRemove = gotoRemove;
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
        title:params.title,
        publicStatus:params.publicStatus,
        beginTime:beginTime,
        endTime:endTime
      };
      vm.tableParams.$params.page = 1;
      consultingParams = angular.extend({}, consultingParams, _params);
      vm.tableParams.reload();
    }
    //重置搜索条件
    function reset(){
      vm.tableParams.$params.page = 1;
      vm.queryParams={};
      consultingParams = {
        page: 1,
        limit: 10,
        type:'0'
      };
      vm.tableParams.reload();
    }
    //跳转新增页面
    function gotoCreate() {
      $state.go('app.consulting.create');
    }
    //删除
    function gotoRemove(params){
      swal({
        title: '确定要删除吗?',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: true
      }, function () {
        ConsultingService.remove([params.contentId]).then(function (res) {
          if (res.code === '200') {
            vm.tableParams.reload();
            toastr.success('资讯已删除');
          } else {
            toastr.error('删除失败');
          }
        });
      });
    }
    //批量删除
    function batchRemove(ids) {
      swal({
        title: '确定要删除吗?',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: true
      }, function () {
        ConsultingService.remove(ids).then(function (res) {
          if (res.code === '200') {
            vm.tableParams.reload();
            toastr.success('删除成功');
          } else {
            toastr.error('删除失败');
          }
        });
      });
    }

    //全选操作
    function checkAll() {
      if (vm.isAll) {
        vm.selectDealer = vm.consulting.map(function (item) {
          return item.contentId;
        });
      } else {
        vm.selectDealer = [];
      }
    }

    //跳转编辑页面
    function gotoEdit(params) {
      $state.go('app.consulting.edit', {contentId: params.contentId});
    }

  }
})();
