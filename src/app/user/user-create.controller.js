/**
 * Created by liusong on 15/11/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('UserCreateController', UserCreateController);

  /* @ngInject */
  function UserCreateController($state) {

    var vm = this;

    vm.title = $state.current.title;
    vm.submit = submit;
    vm.cancel = cancel;

    //取消
    function cancel (){
      $state.go('app.user.list');
    }
    //提交
    function submit (){
      $state.go('app.user.list');
    }
  }
})();
