/**
 * Created by xiaohu on 2016/3/8.
 */
(function () {
  'use strict';

  var serviceId = 'ArticleService';

  angular.module('app.core')
    .factory(serviceId, ArticleService);

  /** @ngInject */
  function ArticleService($modelFactory) {

    var model = $modelFactory('ww/content', {
      actions: {
        base: {
          afterRequest: function (response) {
            if (response.data) {
              if (response.data.items) {
                var transform = response.data.items;
                delete response.data.items;
                transform.$metadata = response.data;
                return transform;
              } else {
                return response.data;
              }
            }
          }
        },
        deleteInformation: {
          method: 'delete'
        }
      }
    });

    var service = {
      getList: getList,
      getDetail: getDetail,
      create: create,
      remove: remove
    };

    return service;

    //////////////////////////

    /**
     * 获取资讯列表数据
     * @param params
     * @returns {*}
     */
    function getList(params) {
      return model.query(params);
    }

    /**
     * 获取资讯列表数据
     * @param params
     * @returns {*}
     */
    function getDetail(params) {
      return model.get(params);
    }

    /**
     * 批量删除资讯文章
     * @param params
     * @returns {*|{method}}
     */
    function remove(params) {
      console.log(params);
      return model.deleteInformation(params);
    }

    /**
     * 新增资讯文章
     * @param params
     * @returns {*}
     */
    function create(params) {
      return model.post(params);
    }


  }
})();
