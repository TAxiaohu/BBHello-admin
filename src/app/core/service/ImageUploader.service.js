/**
 * Created by liusong on 15/12/3.
 */
(function () {
  'use strict';

  var serviceId = 'UploaderService';

  angular.module('app.core')
    .factory(serviceId, UploaderService);

  /** @ngInject */
  function UploaderService() {
    var service = {
      upload: upload
    };

    return service;

    //////////////////////////

    /**
     * 图片上传
     * @param uploaderName
     * @param picArray
     * @param maxCount 图片上传最大数量`
     */
    function upload(uploadParams) {
      // FILTERS
      uploadParams.name.filters.push({
        name: 'imageFilter',
        fn: function (item/*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });
      uploadParams.name.filters.push({
        name: 'customFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
          return this.queue.length < (uploadParams.maxCount - uploadParams.pictures.length);
        }
      });
      // CALLBACKS
      uploadParams.name.onAfterAddingAll = function (addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
        uploadParams.name.uploadAll();
      };
      uploadParams.name.onBeforeUploadItem = function (item) {
        //console.info('onBeforeUploadItem', item);
      };
      uploadParams.name.onSuccessItem = function (fileItem, response, status, headers) {
        var pictureItem = {
          extType: 'PRODUCT_INTRODUCTION',
          pictureUri: uploadParams.url + response.data[0]
        };
        uploadParams.pictures.unshift(pictureItem);
      };
      uploadParams.name.onErrorItem = function (fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
      };
      uploadParams.name.onCompleteAll = function () {
        uploadParams.name.clearQueue();
        //console.info('onCompleteAll');
      };
    }

  }
})();
