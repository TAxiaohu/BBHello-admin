/**
 * Created by liusong on 15/11/17.
 */
(function () {
  'use strict';

  angular
    .module('app.order')
    .controller('orderEditController', orderEditController);

  /* @ngInject */
  function orderEditController($http,$state, $stateParams, toastr,OrderService,config) {
    var vm = this;
    vm.nextStep = nextStep;
    vm.back = back;
    vm.submit = submit;
    vm.title = $state.current.title;
    activity();
    function activity() {
      var dataAtty = [];
      var dataAttys = [];
      OrderService.getDetail($stateParams.saleOrderId).then(function (res) {
        vm.order = res;
        switch (res.goodsId){
          case 0:
            vm.order.goodsId = '尊享套餐';
            break;
          case 1:
            vm.order.goodsId = '豪华套餐';
            break;
          case 2:
            vm.order.goodsId = '至尊套餐';
            break;
        }
      });
      OrderService.getOrderImg({saleOrderId:$stateParams.saleOrderId}).then(function(res){
        vm.imgs = res;
      });

      //行程列表
      OrderService.getJourney({saleOrderId: $stateParams.saleOrderId}).then(function (res) {
        vm.orderJourney = res;
        var orderJourneyArray = [
          {stepName:'创建订单',stepStatus:2,stepId:0,remark:''},{stepName:'体检报告',stepStatus:1,stepId:1,remark:''},
          {stepName:'支付定金',stepStatus:1,stepId:2,remark:''},{stepName:'医院确认',stepStatus:1,stepId:3,remark:''},
          {stepName:'专家确认',stepStatus:1,stepId:4,remark:''},{stepName:'行程确认',stepStatus:1,stepId:5,remark:''},
          {stepName:'办理签证',stepStatus:1,stepId:6,remark:''},{stepName:'直航泰国',stepStatus:1,stepId:7,remark:''},
          {stepName:'入住酒店',stepStatus:1,stepId:8,remark:''},{stepName:'支付全款',stepStatus:1,stepId:9,remark:''},
          {stepName:'办理入院',stepStatus:1,stepId:10,remark:''},{stepName:'进行手术',stepStatus:1,stepId:11,remark:''},
          {stepName:'验孕确认',stepStatus:1,stepId:12,remark:''},{stepName:'启程回国',stepStatus:1,stepId:13,remark:''},
          {stepName:'孕期辅导',stepStatus:1,stepId:14,remark:''}
        ];

        if(res[0]){dataAtty.push(res[0]);dataAttys.push(res[0]);}
        if(res[1]){dataAtty.push(res[1]);dataAttys.push(res[1]);}
        if(res[2]){dataAtty.push(res[2]);dataAttys.push(res[2]);}
        if(res[3]){dataAtty.push(res[3]);dataAttys.push(res[3]);}
        if(res[4]){dataAtty.push(res[4]);dataAttys.push(res[4]);}
        if(res[5]){dataAtty.push(res[5]);dataAttys.push(res[5]);}
        if(res[6]){dataAtty.push(res[6]);dataAttys.push(res[6]);}
        if(res[7]){dataAtty.push(res[7]);dataAttys.push(res[7]);}
        if(res[8]){dataAtty.push(res[8]);dataAttys.push(res[8]);}
        if(res[9]){dataAtty.push(res[9]);dataAttys.push(res[9]);}
        if(res[10]){dataAtty.push(res[10]);dataAttys.push(res[10]);}
        if(res[11]){dataAtty.push(res[11]);dataAttys.push(res[11]);}
        if(res[12]){dataAtty.push(res[12]);dataAttys.push(res[12]);}
        if(res[13]){dataAtty.push(res[13]);dataAttys.push(res[13]);}
        if(res[14]){dataAtty.push(res[14]);dataAttys.push(res[14]);}
        dataAtty = dataAtty.reverse();
        var journeyLength = dataAtty.length;
        var journeyArrList = orderJourneyArray.slice(journeyLength);
        if(journeyArrList[0]){dataAtty.push(journeyArrList[0]);}
        if(journeyArrList[1]){dataAtty.push(journeyArrList[1]);}
        if(journeyArrList[2]){dataAtty.push(journeyArrList[2]);}
        if(journeyArrList[3]){dataAtty.push(journeyArrList[3]);}
        if(journeyArrList[4]){dataAtty.push(journeyArrList[4]);}
        if(journeyArrList[5]){dataAtty.push(journeyArrList[5]);}
        if(journeyArrList[6]){dataAtty.push(journeyArrList[6]);}
        if(journeyArrList[7]){dataAtty.push(journeyArrList[7]);}
        if(journeyArrList[8]){dataAtty.push(journeyArrList[8]);}
        if(journeyArrList[9]){dataAtty.push(journeyArrList[9]);}
        if(journeyArrList[10]){dataAtty.push(journeyArrList[10]);}
        if(journeyArrList[11]){dataAtty.push(journeyArrList[11]);}
        if(journeyArrList[12]){dataAtty.push(journeyArrList[12]);}
        if(journeyArrList[13]){dataAtty.push(journeyArrList[13]);}
        if(journeyArrList[14]){dataAtty.push(journeyArrList[14]);}
        var dataAttysNum = dataAttys[0];
        vm.stepId = dataAttysNum.stepId;
        vm.dataArry = dataAtty;
    });
    }
    //完成
    function nextStep(params,remark){
      var stepId = params.stepId;
      var journeyId = params.journeyId;
      swal({
        title: '确定要完成吗?',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: true
      }, function () {
        var promise = $http({
          method: 'PUT',
          url: config.apiUrl+'/admin/journey/' + journeyId,
          data: {
            stepStatus:2,
            remark:remark
          }
        });
        promise.then(function(res){
         /* if(stepId === 14){
            console.log(11);
            vm.stepId = 15;
          }*/
          if(res.code === '400'){
            toastr.error('行程确认失败');
          }else if(res.code === '401'){
            toastr.error('请重新登陆');
          }else{
            activity();
          }
        });

      });
    }
    //取消
    function back() {
      $state.go('app.order.list');
    }

    //提交
    function submit() {
      $state.go('app.order.list');
    }

  }
})();
