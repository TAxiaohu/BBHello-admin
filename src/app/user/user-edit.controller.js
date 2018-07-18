/**
 * Created by liusong on 15/11/17.
 */
(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('UserEditController', UserEditController);

  /* @ngInject */
  function UserEditController($state, $stateParams,toastr, UserService) {
    var vm = this;

    vm.cancel = cancel;
    vm.submit = submit;
    vm.title = $state.current.title;
    activety();

    function activety() {
      UserService.getDetail($stateParams.userId).then(function (res) {
        vm.user = res;
        vm.user.gender = res.gender + '';
        vm.user.userType = res.userType + '';
      });
    }

    //提交
    function submit(params) {
      UserService.update(params).then(function(res){
        if(res.code === '200'){
          $state.go('app.user.list');
          toastr.success('用户修改成功');
        }else{
          swal('提交失败!', res.message, 'error');
          toastr.error('保存失败');
        }
      });
    }

    //取消
    function cancel() {
      $state.go("app.user.list");
    }
  }
})();
