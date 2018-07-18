/**
 * Created by liusong on 15/11/16.
 * 认证服务
 */
(function () {
  'use strict';

  var serviceId = 'AuthService';

  angular.module('app.core')
    .factory(serviceId, AuthService);

  /** @ngInject */
  function AuthService($rootScope, $modelFactory) {

    var model = $modelFactory('admin/auth/login', {
      actions: {
        base: {
          afterRequest: function (response) {
            //do something
            /*if (response.data) {
             var transform = response.data;
             delete response.data;
             transform.$metadata = response;
             return transform;
             }*/
          }
        }
      }
    });
    var service = {
      login: login,
      logout: logout
    };

    return service;

    //////////////////////////

    function login(user) {
      return model.post(user);
    }

    function logout() {
      $rootScope.user = null;
    }

  }
})();
