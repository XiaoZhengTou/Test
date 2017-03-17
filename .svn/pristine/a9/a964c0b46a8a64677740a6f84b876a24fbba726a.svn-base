define(['angular','moment','momentCN','ngMoment','js/view/fukuanguanli/home','js/view/fukuanguanli/list'], function(angular) {
	var govern = angular.module('govern', ['home','list','angularMoment']);
	
    govern.run(function($http){
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    });
    
    
    govern.config(function ($routeProvider, $locationProvider) {
    		$routeProvider.when('/govern/list', {
            templateUrl: 'templates/fukuanguanli/list.html'
        });
    }).controller('governCtrl',function(){
    	
    });
    angular._LoadModule('govern');
	return govern;
});