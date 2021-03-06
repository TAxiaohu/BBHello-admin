'use strict';
/**
 * A set of directives for left and right sidebar.
 */
angular
  .module('app.core')
  .directive('sidebar', ['$document', '$rootScope',
    function ($document, $rootScope) {
      return {
        replace: false,
        restrict: "C",
        link: function (scope, elem, attrs) {
          var shouldCloseOnOuterClicks = true;

          if (attrs.closeOnOuterClicks == 'false' || attrs.closeOnOuterClicks == '0') {
            shouldCloseOnOuterClicks = false;
          }

          var isAncestorOrSelf = function (element, target) {
            var parent = element;

            while (parent.length > 0) {
              if (parent[0] === target[0]) {
                parent = null;
                return true;
              }
              parent = parent.parent();
            }

            parent = null;
            return false;
          };

          var closeOnOuterClicks = function (e) {

            if (!isAncestorOrSelf(angular.element(e.target), elem)) {
              $rootScope.toggle(attrs.id, 'off');
              e.preventDefault();
              return false;
            }
          };

          var clearCb1 = angular.noop();

          if (shouldCloseOnOuterClicks) {
            clearCb1 = $rootScope.$on('clip-two.toggled', function (e, id, active) {

              if (id == attrs.id) {

                if (active) {
                  setTimeout(function () {
                    $document.on('click tap', closeOnOuterClicks);
                  }, 300);
                } else {
                  $document.off('click tap', closeOnOuterClicks);
                }
              }
            });
          }

          scope.$on('$destroy', function () {
            clearCb1();
            $document.off('click tap', closeOnOuterClicks);
          });

        }
      };
    }])
  .directive('appAside', ['$window', '$rootScope', '$timeout', 'APP_MEDIAQUERY',
    function ($window, $rootScope, $timeout, mq) {
      //console.log(mq);
      var $html = $('html'), $win = $($window), _this, wrap = $('.app-aside');
      return {
        restrict: 'AC',

        link: function (scope, elem, attrs, controllers) {
          var eventObject = isTouch() ? 'click' : 'mouseenter';
          var ul = "";
          var menuTitle;
          var wrap = $('.app-aside');
          elem.on('click', 'a', function (e) {

            _this = $(this);
            if (isSidebarClosed() && !isMobile() && !_this.closest("ul").hasClass("sub-menu"))
              return;

            _this.closest("ul").find(".open").not(".active").children("ul").not(_this.next()).slideUp(200).parent('.open').removeClass("open");
            if (_this.next().is('ul') && _this.parent().toggleClass('open')) {

              _this.next().slideToggle(200, function () {
                $win.trigger("resize");

              });
              e.stopPropagation();
              e.preventDefault();
            } else {
              $rootScope.toggle('sidebar', 'off');

            }
          });
          elem.on(eventObject, 'a', function (e) {

            if (!isSidebarClosed() || isMobile())

              return;
            _this = $(this);
            console.log(_this);

            if (!_this.parent().hasClass('hover') && !_this.closest("ul").hasClass("sub-menu")) {

              wrapLeave();
              _this.parent().addClass('hover');
              menuTitle = _this.find(".item-inner").clone();
              if (_this.parent().hasClass('active')) {

                menuTitle.addClass("active");
              }
              var offset = $("#sidebar").position().top;
              var itemTop = isSidebarFixed() ? _this.parent().position().top + offset : (_this.parent().position().top);
              menuTitle.css({
                position: isSidebarFixed() ? 'fixed' : 'absolute',
                height: _this.outerHeight(),
                top: itemTop
              }).appendTo(wrap);
              if (_this.next().is('ul')) {
                ul = _this.next().clone(true);

                ul.appendTo(wrap).css({
                  top: menuTitle.position().top + _this.outerHeight(),
                  position: isSidebarFixed() ? 'fixed' : 'absolute',
                });
                if (_this.parent().position().top + _this.outerHeight() + offset + ul.height() > $win.height() && isSidebarFixed()) {
                  ul.css('bottom', 0);
                } else {
                  ul.css('bottom', 'auto');
                }

                wrap.children().first().scroll(function () {
                  if (isSidebarFixed())
                    wrapLeave();
                });

                setTimeout(function () {

                  if (!wrap.is(':empty')) {
                    $(document).on('click tap', wrapLeave);
                  }
                }, 300);

              } else {
                ul = "";
                return;
              }

            }
          });
          wrap.on('mouseleave', function (e) {

            $(document).off('click tap', wrapLeave);
            $('.hover', wrap).removeClass('hover');
            $('> .item-inner', wrap).remove();
            $('> ul', wrap).remove();

          });
          function wrapLeave() {
            wrap.trigger('mouseleave');
          }


          $rootScope.$on('$locationChangeSuccess', function () {
            var newPath;
            newPath = window.location.hash;
            angular.forEach(elem.find('.main-navigation-menu a'), function (domLink) {
              var link = angular.element(domLink);
              var menu;
              if (domLink.hash === newPath && (!isSidebarClosed() || isMobile())) {

                if (link.closest("ul").hasClass("sub-menu")) {
                  menu = link.closest("ul");
                  var activeMenu = menu;
                  menu.slideDown(200).parent().siblings().children('.sub-menu').slideUp(200, function () {
                    $(this).parent().removeClass("open");
                  });
                } else {
                  $('.sub-menu').slideUp(200, function () {
                    $(this).parent().removeClass("open");
                  });
                }

              }
              activeMenu = null;
              menu = null;
            });
          });

        }
      };

      function isTouch() {
        return $html.hasClass('touch');
      }

      function isMobile() {
        return $win.width() < mq.desktop;
      }

      function isSidebarClosed() {
        return $('.app-sidebar-closed').length;
      }

      function isSidebarFixed() {
        return $('.app-sidebar-fixed').length;
      }

    }])
  /*
   .directive('sidebarMobileToggler', ['$window', '$document', '$rootScope', '$timeout', 'APP_MEDIAQUERY',
   function($window, $document, $rootScope, $timeout, mq) {
   return {

   restrict : "C",
   link : function(scope, elem, attrs) {
   var scrollTop = 0;
   elem.on('click', function(e) {

   if ((!$('#app').hasClass('app-slide-off') && !$('#app').hasClass('app-offsidebar-open')) && $($window).width() < 992) {
   scrollTop = $($window).scrollTop();
   $('#app .main-content').css({
   position : 'absolute',
   top : 0 - scrollTop
   });
   }

   $('#app .app-content').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) {

   if ((!$('#app').hasClass('app-slide-off') && !$('#app').hasClass('app-offsidebar-open')) && $($window).width() < 992) {
   $('footer').hide();
   $('#app .main-content').css({
   position : 'relative',
   top : 'auto'
   });
   $document.scrollTop(scrollTop, 0);
   $('footer').show();
   }
   alert("ciao")
   });

   });
   }
   };

   }])*/;
