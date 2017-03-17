define(['angular', 'moment', 'momentCN', 'ngMoment'], function(angular) {

    var  gathering= angular.module('gathering_order', []);

    gathering.run(function($http) {
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
    })
        .config(function($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.timeout = 5000;
            $routeProvider
                .when('/fenqifukuanjihua/add/:obj',{
                    templateUrl: 'templates/fenqifukuanjihua/add.html'
                }).otherwise({
                redirectTo: '/fenqifukuanjihua/index'
            });
        })
        .controller('shoukuandan', function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
        });

    angular._LoadModule('gathering_order');
    return gathering;

});

