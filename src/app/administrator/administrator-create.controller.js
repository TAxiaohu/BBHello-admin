/**
 * Created by liusong on 15/11/16.
 */
(function () {
  'use strict';

  angular
    .module('app.administrator')
    .controller('AdministratorCreateController', AdministratorCreateController);

  /* @ngInject */
  function AdministratorCreateController($state) {
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
