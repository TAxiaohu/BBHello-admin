/**
 * Created by xiaohu on 2016/3/8.
 */
(function () {
  'use strict';

  angular
    .module('app.systemMessage')
    .controller('SystemMessageListController', SystemMessageListController);

  /* @ngInject */
  function SystemMessageListController($state,toastr, ngTableParams,SystemMessageService) {
    var vm = this;

    var systemMessageParams = {
      page: 1,
      limit: 10
    };

    vm.tableParams = new ngTableParams({
      page: systemMessageParams.page, // show first page
      count: systemMessageParams.limit
    }, {
      counts: [],
      getData: function ($defer, params) {
        //var type = 'type=1'
        systemMessageParams.page = params.page();
        SystemMessageService.getList(systemMessageParams).then(function (res) {
          vm.systemMessage = res;
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
    vm.title = $state.current.title;
    vm.search = search;
    vm.reset = reset;

    //搜索
    function search(params) {
      vm.tableParams.$params.page = 1;
      systemMessageParams = angular.extend({}, systemMessageParams, params);
      vm.tableParams.reload();
    }
    //重置搜索条件
    function reset(){
      vm.tableParams.$params.page = 1;
      vm.queryParams={};
      systemMessageParams = {
        page: 1,
        limit: 10
      };
      vm.tableParams.reload();
    }
    //跳转新增页面
    function gotoCreate() {
      $state.go('app.systemMessage.create');
    }
    //删除
    function gotoRemove(params){
      swal({
        title: '确定要删除吗?',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: true
      }, function () {
        SystemMessageService.remove([params.msgId]).then(function (res) {
          console.log(res);
          if (res.code === '200') {
            vm.tableParams.reload();
            toastr.success('消息已删除');
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
        SystemMessageService.remove(ids).then(function (res) {
          console.log(res);
          if (res.code === '200') {
            vm.tableParams.reload();
            toastr.success('消息已删除');
          } else {
            toastr.error('删除失败');
          }
        });
      });
    }

    //全选操作
    function checkAll() {
      if (vm.isAll) {
        vm.selectInfomation = vm.systemMessage.map(function (item) {
          return item.msgId;
        });
      } else {
        vm.selectInfomation = [];
      }
    }

    //跳转编辑页面
    function gotoEdit(params) {
      $state.go('app.systemMessage.edit', {msgId: params.msgId});
    }

  }
})();
