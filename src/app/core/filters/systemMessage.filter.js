/**
 * Created by Administrator on 2016/3/30.
 */
(function () {
    'use strict';

    var filterId = 'systemMessageType';

    angular.module('app.core')
        .filter(filterId, systemMessageTypeFilter);

    /** @ngInject */
    function systemMessageTypeFilter() {
        return function (input) {
            switch (input) {
                case 0:
                    input = '未发布';
                    break;
                case 1:
                    input = '已发布';
                    break;
            }
            return input;
        };
    }
})();
