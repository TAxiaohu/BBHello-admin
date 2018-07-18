/**
 * Created by xiaohu on 2016/3/8.
 */
(function () {
  'use strict';

  angular
    .module('app.systemMessage')
    .controller('SystemMessageEditController', SystemMessageEditController);

  /* @ngInject */
  function SystemMessageEditController($state,$stateParams,toastr,SystemMessageService) {
    var vm = this;
    vm.cancel = cancel;
    vm.submit = submit;
    vm.title = $state.current.title;
    activate();

    function activate() {
      SystemMessageService.getDetail($stateParams.msgId).then(function(res){
        console.log(res);
        vm.systemMessage = res;
      });
    }
    //发送信息
    function submit(params) {
      SystemMessageService.update(params).then(function(res){
        if(res.code === '400'){
          toastr.error('消息修改失败');
        }else{
          $state.go('app.systemMessage.list');
          toastr.success('消息修改成功');
        }
      });
    }

    function cancel() {
      $state.go('app.systemMessage.list');
    }

  }

})();
