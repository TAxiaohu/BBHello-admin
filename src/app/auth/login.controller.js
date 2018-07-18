/**
 * Created by liusong on 15/11/14.
 */
(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($state,toastr, AuthService) {
    var vm = this;
    vm.login = login;
    function login(params) {
      var userInfo = {
        username: params.username,
        password: params.password
      };

      AuthService.login(userInfo).then(function(res){
        if(res.code === '400'){
          toastr.error('登录失败,请稍后再试');
        }else if(res.code === '401'){
          toastr.error('登录失败,账号密码或错误');
        }else{
          $state.go('app.user.list');
        }
      });

    }

  }
})();
