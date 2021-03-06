/**
 * Created by xiaohu on 2016/3/8.
 */
(function () {
  'use strict';

  angular
    .module('app.technology')
    .controller('technologyCreateController', technologyCreateController);

  /* @ngInject */
  function technologyCreateController($state,toastr,config,FileUploader,dateFilter,UploaderService,EditorUploaderService,ConsultingService) {
    var vm = this;
    var queue = [];
    vm.cancel = cancel;
    vm.submit = submit;
    vm.imageUpload = imageUpload;
    vm.title = $state.current.title;
    vm.delPicture1 = delPicture1;

    var uploadUrl1 = config.imageUrl;
    var uploaderImages1 = vm.uploaderImages1 = new FileUploader({
      url: uploadUrl1
    });
    vm.uplpadParams1 = {
      url: uploadUrl1,
      maxCount: 1,
      pictures: [],
      name: uploaderImages1
    };
    vm.today = new Date();

    vm.calendar = {
      opened: false,
      dateFormat: 'yyyy-MM-dd',
      dateOptions: {startingDay: 1},
      selectDate: selectDate
    };

    function selectDate($event, time) {
      $event.preventDefault();
      $event.stopPropagation();
      console.log(time);

      vm.calendar.opened = true;
    }
    //上传图片 显示图片
    activity();
    function activity(){
      UploaderService.upload(vm.uplpadParams1);
    }
    //编辑器内图片上传
    function imageUpload(files) {
      EditorUploaderService.upload(files, queue, vm.editable);
    }
    //图片删除
    function delPicture1(index) {
      swal({
        title: '确定要删除该图片吗?',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: true
      }, function () {
        vm.uplpadParams1.pictures.splice(index, 1);
      });
    }
    //发送信息
    function submit(article) {
      var releaseTime = article.publicTime;
      var publicTime = dateFilter(releaseTime, 'yyyy-MM-dd');
      var displayOrder = article.displayOrder;
      if(displayOrder == ''){
        displayOrder = 0
      }
      if (vm.uplpadParams1.pictures.length < 1) {
        return toastr.error('保存失败,图片必须上传');
      }
      var params = {
        imageUrl: vm.uplpadParams1.pictures[0].pictureUri,
        contentType:2,
        displayOrder:displayOrder,
        publicTime:publicTime
      };
      var _params = angular.extend({}, article,params);
      ConsultingService.create(_params).then(function(res){
        console.log(res);
        if(res.code === '400'){
          toastr.error('添加失败');
        }else if(res.code === '403'){
          toastr.error('你没有权限,请联系管理员');
        }else{
          $state.go('app.technology.list');
          toastr.success('添加成功');
        }
      });
    }

    function cancel() {
      $state.go('app.technology.list');
    }

  }

})();
