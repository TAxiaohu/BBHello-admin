/**
 * Created by PC on 15/11/18.
 */
/**
 * Created by liusong on 15/11/16.
 */
(function () {
  'use strict';

  angular
    .module('app.administrator')
    .controller('AdministratorController', AdministratorController);

  /* @ngInject */
  function AdministratorController($state, ngTableParams) {
    var vm = this;

    var hospitalParams = {
      page: 1,
      limit: 10
    };

    vm.tableParams = new ngTableParams({
      page: hospitalParams.page, // show first page
      count: hospitalParams.limit
    });
    vm.title = $state.current.title;
    vm.selectHospital = [];
    vm.checkAll = checkAll;
    vm.remove = remove;
    vm.gotoCreate = gotoCreate;
    vm.gotoEdit = gotoEdit;

    //跳转新增页面
    function gotoCreate() {
      $state.go('app.administrator.create');
    }
  //跳转新增页面
    function gotoEdit() {
      $state.go('app.administrator.edit');
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
