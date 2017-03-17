define(['angular','moment','momentCN','ngMoment','js/view/jiekuan/home','js/view/jiekuan/add','js/view/jiekuan/shenpi','js/view/jiekuan/view'], function (angular) {
    var jiekuan = angular.module('jiekuan', ['home','add','shenpi','view']);
    jiekuan.run(function($http){
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    }).config(function ($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.defaults.timeout = 5000;
        $routeProvider
            .when('/jiehuankuan/jiekuan/add', {
                templateUrl: 'templates/jiekuan/add.html'
            })
            .when('/jiehuankuan/jiekuan/shenpi', {
                templateUrl: 'templates/jiekuan/shenpi.html'
            })
            .when('/jiehuankuan/jiekuan/view', {
                templateUrl: 'templates/jiekuan/view.html'
            })
            .otherwise({
                redirectTo: '/jiehuankuan/jiekuan'
        });
    })
    .controller('jkCtrl',function($scope,moment,jhkPublic,$filter,publicmodel){
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
    angular._LoadModule('jiekuan');
    return jiekuan;
});