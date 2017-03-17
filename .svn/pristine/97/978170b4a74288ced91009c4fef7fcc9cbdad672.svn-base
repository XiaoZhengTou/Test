define(['angular','moment','momentCN','ngMoment','js/view/yufukuan/home','js/view/yufukuan/add','js/view/yufukuan/shenpi','js/view/yufukuan/view'], function (angular) {
    var yufukuan = angular.module('yufukuan', ['home','add','shenpi','view']);
    yufukuan.run(function($http){
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    }).config(function ($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.defaults.timeout = 5000;
        $routeProvider
            .when('/duigong/yufukuan/add', {
                templateUrl: 'templates/yufukuan/add.html'
            })
            .when('/duigong/yufukuan/shenpi', {
                templateUrl: 'templates/yufukuan/shenpi.html'
            })
            .when('/duigong/yufukuan/view', {
                templateUrl: 'templates/yufukuan/view.html'
            })
            .otherwise({
                redirectTo: '/duigong/yufukuan'
        });
    })
    .controller('yfkCtrl',function($scope,moment,jhkPublic,$filter,publicmodel){
        $scope.date = new Date();
        // 代码
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
                }else {
                    element.parent().children().removeClass('active');
                    element.addClass('active');
                }
            })
        },
    }
    });
    angular._LoadModule('yufukuan');
    return yufukuan;
});