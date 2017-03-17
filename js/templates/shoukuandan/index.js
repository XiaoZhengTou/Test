define(['angular','moment','momentCN','ngMoment','js/view/shoukuandan/home','js/view/shoukuandan/list','js/view/shoukuandan/first'], function(angular) {
	var govern = angular.module('govern', ['home','list','firstlist','angularMoment']);
	
    govern.run(function($http){
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    });
    
    
    govern.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/govern/list', {
                templateUrl: 'templates/shoukuandan/list.html'
            }).when('/goFirst/list', {
            templateUrl: 'templates/shoukuandan/first.html'
        });
    }).controller('governCtrl',function(){
    	
    });
    angular._LoadModule('govern');
	return govern;
});