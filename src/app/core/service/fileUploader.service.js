/**
 * Created by liusong on 16/1/18.
 */
(function () {
  'use strict';

  var serviceId = 'FileUploaderService';

  angular.module('app.core')
    .factory(serviceId, FileUploaderService);

  /** @ngInject */
  function FileUploaderService($q) {


    var service = {
      uploadFile: uploadFile
    };

    return service;

    //////////////////////////

    function uploadFile(uploadParams) {

      // FILTERS
      uploadParams.name.filters.push({
        name: 'fileFilter',
        fn: function (item/*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          console.log('111');
          return '|vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel|'.indexOf(type) !== -1;
        }

      });


      // CALLBACKS
      var deferred = $q.defer();

      uploadParams.name.onSuccessItem = function (fileItem, response, status, headers) {
        deferred.resolve(response);
      };
      uploadParams.name.onErrorItem = function (fileItem, response, status, headers) {
        deferred.reject({
          code: fileItem._xhr.status,
          message: fileItem._xhr.statusText
        });
      };
      uploadParams.name.onCompleteAll = function () {
        uploadParams.name.clearQueue();
      };

      return deferred.promise;
    }


  }
})();
