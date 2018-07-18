/**
 * Created by liusong on 15/11/17.
 */
(function () {
  'use strict';

  angular
    .module('app.administrator')
    .controller('AdministratorEditController', AdministratorEditController);

  /* @ngInject */
  function AdministratorEditController($state) {
    var vm = this;
    vm.cancel = cancel;
    vm.submit = submit;

    vm.title = $state.current.title;

    //取消
    function cancel (){
      $state.go('app.administrator.list');
    }
    //提交
    function submit (){
      $state.go('app.administrator.list');
    }

  }
})();
