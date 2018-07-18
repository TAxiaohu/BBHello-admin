(function () {
  'use strict';

  angular
    .module('BBHelloAdmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider) {


    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /login
    $urlRouterProvider.otherwise('/login');
    //
    // Set up the states
    $stateProvider

    //app
      .state('app', {
        url: '',
        templateUrl: 'app/main/main.html',
        abstract: true
      })
      //dashboard
   /*   .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        ncyBreadcrumb: {
          label: 'Dashboard'
        }
      })*/
      /*//管理员
      .state('app.administrator', {
        abstract: true,
        url: '/administrator',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: '管理员'
        }
      })
      //管理员列表
      .state('app.administrator.list', {
        url: '/list',
        title: '管理员列表',
        templateUrl: 'app/administrator/administrator-list.html',
        controller: 'AdministratorController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '管理员列表'
        }
      })
      //管理员详情
      .state('app.administrator.detail', {
        url: 'view',
        title: '管理员详情',
        templateUrl: 'app/administrator/administrator-detail.html',
        controller: 'AdministratorDetailController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '管理员详情',
          parent: 'app.administrator.list'
        }
      })
      //管理员创建
      .state('app.administrator.create', {
        url: '/create',
        title: '管理员添加',
        templateUrl: 'app/administrator/administrator-edit.html',
        controller: 'AdministratorCreateController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '管理员添加',
          parent: 'app.administrator.list'
        }
      })
      //管理员编辑
      .state('app.administrator.edit', {
        url: 'edit',
        title: '管理员编辑',
        templateUrl: 'app/administrator/administrator-edit.html',
        controller: 'AdministratorEditController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '管理员编辑',
          parent: 'app.administrator.list'
        }
      })*/

      //用户管理
      .state('app.user', {
        abstract: true,
        url: '/user',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: '用户管理'
        }
      })
      //用户列表
      .state('app.user.list', {
        url: '/list',
        title: '用户列表',
        templateUrl: 'app/user/user-list.html',
        controller: 'UserController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '用户列表'
        }
      })
      //用户详情
      .state('app.user.detail', {
        url: '/view/:userId',
        title: '用户详情',
        templateUrl: 'app/user/user-detail.html',
        controller: 'UserDetailController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '用户详情',
          parent: 'app.user.list'
        }
      })
      //用户创建
      .state('app.user.create', {
        url: '/create',
        title: '用户创建',
        templateUrl: 'app/user/user-edit.html',
        controller: 'UserCreateController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '用户创建',
          parent: 'app.user.list'
        }
      })
      //用户编辑
      .state('app.user.edit', {
        url: '/edit/:userId',
        title: '用户编辑',
        templateUrl: 'app/user/user-edit.html',
        controller: 'UserEditController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '用户编辑',
          parent: 'app.user.list'
        }
      })
      //成功案列
      .state('app.article', {
        abstract: true,
        url: '/article',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: '成功案列列表'
        }
      })
      //成功案列列表
      .state('app.article.list', {
        url: '/list',
        title: '成功案列列表',
        templateUrl: 'app/article/article-list.html',
        controller: 'articleListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '成功案列列表',
          parent: 'app.article'
        }
      })
      //成功案列添加
      .state('app.article.create', {
        url: '/create',
        title: '成功案列添加',
        templateUrl: 'app/article/article-edit.html',
        controller: 'articleCreateController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '成功案列添加',
          parent: 'app.article.list'
        }
      })
      //成功案列编辑
      .state('app.article.edit', {
        url: '/edit/:contentId',
        title: '成功案列编辑',
        templateUrl: 'app/article/article-edit.html',
        controller: 'articleEditController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '成功案列编辑',
          parent: 'app.article.list'
        }
      })
      //咨询
      .state('app.consulting', {
        abstract: true,
        url: '/consulting',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: '资讯列表'
        }
      })
      //咨询列表
      .state('app.consulting.list', {
        url: '/list',
        title: '热门资讯列表',
        templateUrl: 'app/consulting/consulting-list.html',
        controller: 'consultingListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '热门资讯列表',
          parent: 'app.consulting'
        }
      })
      //咨询添加
      .state('app.consulting.create', {
        url: '/create',
        title: '热门资讯添加',
        templateUrl: 'app/consulting/consulting-edit.html',
        controller: 'consultingCreateController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '热门资讯添加',
          parent: 'app.consulting.list'
        }
      })
      //咨询编辑
      .state('app.consulting.edit', {
        url: '/edit/:contentId',
        title: '热门资讯编辑',
        templateUrl: 'app/consulting/consulting-edit.html',
        controller: 'consultingEditController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '热门资讯编辑',
          parent: 'app.consulting.list'
        }
      })
      //新闻报道
      .state('app.report', {
        abstract: true,
        url: '/report',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: '新闻报道'
        }
      })
      //新闻报道列表
      .state('app.report.list', {
        url: '/list',
        title: '新闻报道列表',
        templateUrl: 'app/report/report-list.html',
        controller: 'reportListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '新闻报道列表',
          parent: 'app.report'
        }
      })
      //新闻报道添加
      .state('app.report.create', {
        url: '/create',
        title: '新闻报道添加',
        templateUrl: 'app/report/report-edit.html',
        controller: 'reportCreateController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '新闻报道添加',
          parent: 'app.report.list'
        }
      })
      //新闻报道编辑
      .state('app.report.edit', {
        url: '/edit/:contentId',
        title: '新闻报道编辑',
        templateUrl: 'app/report/report-edit.html',
        controller: 'reportEditController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '新闻报道编辑',
          parent: 'app.report.list'
        }
      })
      //试管婴儿技术
      .state('app.technology', {
        abstract: true,
        url: '/technology',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: '试管婴儿技术'
        }
      })
      //试管婴儿技术列表
      .state('app.technology.list', {
        url: '/list',
        title: '试管婴儿技术列表',
        templateUrl: 'app/technology/technology-list.html',
        controller: 'technologyListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '试管婴儿技术列表',
          parent: 'app.technology'
        }
      })
      //新闻报道添加
      .state('app.technology.create', {
        url: '/create',
        title: '试管婴儿技术添加',
        templateUrl: 'app/technology/technology-edit.html',
        controller: 'technologyCreateController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '试管婴儿技术添加',
          parent: 'app.technology.list'
        }
      })
      //新闻报道编辑
      .state('app.technology.edit', {
        url: '/edit/:contentId',
        title: '试管婴儿技术编辑',
        templateUrl: 'app/technology/technology-edit.html',
        controller: 'technologyEditController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '试管婴儿技术编辑',
          parent: 'app.technology.list'
        }
      })

      //订单
      .state('app.order', {
        abstract: true,
        url: '/order',
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: '订单管理'
        }
      })
      //订单列表
      .state('app.order.list', {
        url: '/list',
        title: '订单列表',
        templateUrl: 'app/order/order-list.html',
        controller: 'orderListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '订单列表',
          parent: 'app.order'
        }
      })
      //订单编辑
      .state('app.order.edit', {
        url: '/edit/:saleOrderId',
        title: '订单编辑',
        templateUrl: 'app/order/order-edit.html',
        controller: 'orderEditController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '订单编辑',
          parent: 'app.order.list'
        }
      })


      //错误页
      .state('error', {
        url: '/error',
        template: '<div ui-view class="fade-in-up"></div>'
      })
      //404
      .state('error.404', {
        url: '/404',
        templateUrl: 'app/core/views/utility_404.html'
      })
      //500
      .state('error.500', {
        url: '/500',
        templateUrl: 'app/core/views/utility_500.html'
      })
      //认证
      .state('auth', {
        url: '',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        abstract: true
      })
      //登录
      .state('auth.login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }

})();
