/**
 * Created by liusong on 15/11/16.
 * 鏂囦欢涓婁紶鏈嶅姟
 */
(function () {
  'use strict';

  var serviceId = 'EditorUploaderService';

  angular.module('app.core')
    .factory(serviceId, EditorUploaderService);

  /** @ngInject */
  function EditorUploaderService(FileUploader, config) {

    var uploader = new FileUploader({
      /*url: 'http://139.196.108.239/platform/image'*/
      url:config.imageUrl
    });

    uploader.filters.push({
      name: 'imageFilter',
      fn: function (item/*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    var service = {
      upload: upload
    };

    return service;

    //////////////////////////

    /**
     * 鏂囨湰缂栬緫鍣ㄥ唴涓婁紶鍥剧墖
     * @param files 鏂囦欢
     * @param queue 涓婁紶鏂囦欢闃熷垪
     * @param editable 缂栬緫鍣ㄦ湰韬�
     */
    function upload(files, queue, editable) {
      uploader.addToQueue(files, queue);
      uploader.uploadAll();
      // CALLBACKS

      uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function (fileItem) {
        console.info('onAfterAddingFile', fileItem);
      };
      uploader.onAfterAddingAll = function (addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
      };
      uploader.onBeforeUploadItem = function (item) {
        console.info('onBeforeUploadItem', item);
      };
      uploader.onProgressItem = function (fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
      };
      uploader.onProgressAll = function (progress) {
        console.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function (fileItem, response, status, headers) {
        var editor = $.summernote.eventHandler.getModule(),
          uploaded_file_name = response.data,
          file_location = config.apiUrl + '/image' + uploaded_file_name;
        editor.insertImage(editable, file_location, uploaded_file_name);
      };
      uploader.onErrorItem = function (fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
      };
      uploader.onCancelItem = function (fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
      };
      uploader.onCompleteItem = function (fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
      };
      uploader.onCompleteAll = function () {
        console.info('onCompleteAll');
      };
    }
  }
})();
