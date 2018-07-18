/**
 * Created by liusong on 15/11/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('UserController', UserController);

  /* @ngInject */
  function UserController($state, toastr, ngTableParams,UserService,UserModelService) {
    var vm = this;

    var UserParams = {
      page: 1,
      limit: 10
    };

    vm.tableParams = new ngTableParams({
      page: UserParams.page, // show first page
      count: UserParams.limit
    }, {
      counts: [],
      getData: function ($defer, params) {
        //var type = 'type=1'
        UserParams.page = params.page();
        UserModelService.getList(UserParams).then(function (res) {
          vm.user = res;
          params.total(res.$metadata.total);
          $defer.resolve(res);

        });
      }
    });

    vm.selectDoctor = [];
    vm.checkAll = checkAll;
    vm.remove = remove;
    vm.gotoCreate = gotoCreate;
    vm.gotoUp = gotoUp;
    vm.gotoTop = gotoTop;
    vm.gotoFrozen = gotoFrozen;
    vm.thaw = thaw;
    vm.gotoDetail = gotoDetail;
    vm.title = $state.current.title;
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
    function search(params){
      vm.tableParams.$params.page = 1;
      UserParams = angular.extend({}, UserParams, params);
      vm.tableParams.reload();
    }
    //清空搜索条件
    function reset(){
      vm.tableParams.$params.page = 1;
      vm.queryParams={};
      UserParams = {
        page: 1,
        limit: 10
      };
      vm.tableParams.reload();
    }
    //跳转新增页面
    function gotoCreate() {
      $state.go('app.user.create');
    }
    //升级
    function gotoUp(params) {
      var level = params.level;
      var levelNum;
      if(level === '2'){
        toastr.error('该用户等级已经是最高!');
        return;
      }else if(level === '1'){
        levelNum = '2'
      }else if(level === '0'){
        levelNum = '1'
      }
      var userId = params.userId;
      var _params = {
        userId:userId,
        level:levelNum
      };
      UserService.update(_params).then(function(res){
        vm.tableParams.$params.page = 1;
        vm.queryParams={};
        UserParams = {
          page: 1,
          limit: 10
        };
        vm.tableParams.reload();
      })
    }

    //降级
    function gotoTop(params) {
      var level = params.level;
      var userId = params.userId;
      var levelNum;
      if(level === '0'){
        toastr.error('该用户等级已经是最低!');
        return;
      }else if(level === '1'){
        levelNum = '0';
      }else if(level === '2'){
        levelNum = '1';
      }
      var _params = {
        userId:userId,
        level:levelNum
      };
      UserService.update(_params).then(function(res){
        vm.tableParams.$params.page = 1;
        vm.queryParams={};
        UserParams = {
          page: 1,
          limit: 10
        };
        vm.tableParams.reload();
      });
      if(userId){

      }
    }
  function gotoFrozen(params){
    var _params = {
      userId:params.userId,
      status:'INVALID'
    };
    UserService.update(_params).then(function(res){
      vm.tableParams.$params.page = 1;
      vm.queryParams={};
      UserParams = {
        page: 1,
        limit: 10
      };
      vm.tableParams.reload();
    })
  }
    function thaw(params){
      var _params = {
        userId:params.userId,
        status:'NORMAL'
      };
      UserService.update(_params).then(function(res){
        vm.tableParams.$params.page = 1;
        vm.queryParams={};
        UserParams = {
          page: 1,
          limit: 10
        };
        vm.tableParams.reload();
      })
    }

    //跳转详情页面
    function gotoDetail(params) {
      $state.go('app.user.detail',{userId:params.userId});
    }

    //批量删除
    function remove(ids) {
      DoctorService.remove(ids).then(function (res) {
        vm.tableParams.reload();
      });
    }

    //全选操作
    function checkAll() {
      if (vm.isAll) {
        vm.selectDoctor = vm.user.map(function (item) {
          return item.userId;
        });
      } else {
        vm.selectDoctor = [];
      }
    }

  }
})();
