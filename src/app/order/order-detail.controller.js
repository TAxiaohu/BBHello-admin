/**
 * Created by liusong on 15/11/16.
 */
(function () {
  'use strict';

  angular
    .module('app.order')
    .controller('AdministratorDetailController', AdministratorDetailController);

  /* @ngInject */
  function AdministratorDetailController($stateParams,HospitalService) {
    var vm = this;

    vm.title = 'HospitalDetailController';

    activate();

    function activate() {
      HospitalService.getDetail($stateParams.hospitalId).then(function(res){
        console.log(res);
        vm.hospital = res;
      });
    }
  }
})();
