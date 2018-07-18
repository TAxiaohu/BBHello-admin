/**
 * Created by liusong on 15/11/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('UserDetailController', UserDetailController);

  /* @ngInject */
  function UserDetailController($stateParams, $state, UserService) {
    var vm = this;

    vm.back = back;
    vm.title = $state.current.title;

    activate();
    function activate() {
      var dataArray = [];
      var customerParam;
      UserService.getDetail($stateParams.userId).then(function (res) {
        vm.user = res;
        switch (res.level) {
          case 0:
            vm.user.level = '普通用户';
          break;
          case 1:
            vm.user.level = '普通经纪人';
          break;
          case 2:
            vm.user.level = '金牌经纪人';
          break;
        }
      });
      UserService.getAgentUser({userId:$stateParams.userId}).then(function(res){
        vm.agent = res;
        vm.agentU = res[0];
      });
    }

    function back(){
      $state.go('app.user.list');
    }
  }
})();
