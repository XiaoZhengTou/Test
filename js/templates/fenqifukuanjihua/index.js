define(['angular', 'moment', 'momentCN', 'ngMoment', 'js/view/fenqifukuanjihua/home','js/view/fenqifukuanjihua/add','js/view/fenqifukuanjihua/next'], function(angular) {

    var  pay= angular.module('by_stages_pay_money', ['query_contract','add_contract',
        'approval_process']);

    pay.run(function($http) {
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
    })
        .config(function($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.timeout = 5000;
            $routeProvider
                .when('/fenqifukuanjihua/add/:obj',{
                    templateUrl: 'templates/fenqifukuanjihua/add.html'
                }).when('/fenqifukuanjihua/add',{
                    templateUrl: 'templates/fenqifukuanjihua/add.html'
                }).when('/fenqifukuanjihua/ad_next',{
                	templateUrl: 'templates/fenqifukuanjihua/next.html'
                }).when('/fenqifukuanjihua/contract-detail/:obj',{
                    templateUrl: 'templates/fenqifukuanjihua/contract-detail.html'
                }).otherwise({
                    redirectTo: '/fenqifukuanjihua/index'
                });
        })
        .controller('fqfkCtrl', function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
        });

    angular._LoadModule('by_stages_pay_money');
    return pay;

});
