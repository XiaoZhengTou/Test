define(['angular', 'moment', 'momentCN', 'ngMoment', 'js/view/fukuan/home', 'js/view/fukuan/add'], function(angular) {
    var fukuan = angular.module('fukuan', ['home', 'add']);
    fukuan.run(function($http) {
            $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
            $http.defaults.headers.common["Content-Type"] = "application/json";
        }).config(function($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.timeout = 5000;
            $routeProvider
                .when('/duigong/fukuan/add', {
                    templateUrl: 'templates/fukuan/add.html'
                })
                .when('/duigong/fukuan/shenpi', {
                    templateUrl: 'templates/fukuan/shenpi.html'
                })
                .when('/duigong/fukuan/view', {
                    templateUrl: 'templates/fukuan/view.html'
                })
                .otherwise({
                    redirectTo: '/duigong/fukuan'
                });
        })
        .controller('fkCtrl', function($scope, moment, jhkPublic, $filter, publicmodel, $mdToast) {
            $scope.date = new Date();
            // 代码
            // 提示框开始
            var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            function sanitizePosition() {
                var current = $scope.toastPosition;
                if (current.bottom && last.top) current.top = false;
                if (current.top && last.bottom) current.bottom = false;
                if (current.right && last.left) current.left = false;
                if (current.left && last.right) current.right = false;
                last = angular.extend({}, current);
            }
            $scope.toastPosition = angular.extend({}, last);
            $scope.getToastPosition = function() {
                sanitizePosition();
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) {
                        return $scope.toastPosition[pos];
                    })
                    .join(' ');
            };
            $scope.showSimpleToast = function(text, time) {
                var pinTo = $scope.getToastPosition();
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(text)
                    .position(pinTo)
                    .hideDelay(time)
                );
            };
            // 提示框结束
        }).directive('switch', function() {
            return {
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        element.parent().children().removeClass('active');
                        element.addClass('active');
                    })
                },
            }
        }).directive('switchOnly', function() {
            return {
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        if (element.hasClass('active')) {
                            element.removeClass('active');
                        } else {
                            element.parent().children().removeClass('active');
                            element.addClass('active');
                        }
                    })
                },
            }
        });
    angular._LoadModule('fukuan');
    return fukuan;
});