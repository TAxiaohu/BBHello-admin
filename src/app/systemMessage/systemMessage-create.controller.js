/**
 * Created by xiaohu on 2016/3/8.
 */
(function () {
  'use strict';

  angular
    .module('app.systemMessage')
    .controller('SystemMessageCreateController', SystemMessageCreateController);

  /* @ngInject */
  function SystemMessageCreateController($state,toastr,SystemMessageService) {
    var vm = this;
    vm.cancel = cancel;
    vm.submit = submit;
    vm.title = $state.current.title;

    //发送信息
      function submit(params) {
          SystemMessageService.create(params).then(function(res){
            if(res.code === '400'){
              toastr.error('消息添加失败');
            }else{
              $state.go('app.systemMessage.list');
              toastr.success('消息添加成功');
            }
          });
      }
    function cancel() {
      $state.go('app.systemMessage.list');
    }

  }

})();
