/**
 * Created by xiaohu on 2016/1/15.
 */
(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('userGradeController', userGradeController);

  /* @ngInject */
  function userGradeController($http, ngTableParams, $modalInstance, config,userId) {
    console.log(userId);
    var vm = this;
    vm.exit = exit;
    vm.submit = submit;
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
        UserService.getList(UserParams).then(function (res) {
          vm.user = res;
          params.total(res.$metadata.total);
          $defer.resolve(res);

        });
      }
    });



    function submit(params) {
      console.log(params);
      var levelNum = parseInt(params);
      var promise = $http({
        method: 'PUT',
        url: config.apiUrl + '/admin/appUser/'+ userId,
        data: {
          level: levelNum
        }
      });

      promise.then(function (res) {
        console.log(res);
        if (res.data.code === '200') {
          $modalInstance.dismiss('cancel');
        } else {
          swal('asaddas!', res.message, 'error');
        }
      }).catch(function (err) {
        console.log(err);
      });
    }

    function exit() {
      $modalInstance.dismiss('cancel');
    }
  }

})();
