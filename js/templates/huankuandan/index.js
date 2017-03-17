define(['angular','moment','momentCN','ngMoment','js/view/huankuandan/home','js/view/huankuandan/list','js/view/huankuandan/addchakan'], function(angular) {
	var huankuandan = angular.module('mdhuankuandan', ['huankuandanhome','list','addchakan','angularMoment']);
	
    huankuandan.run(function($http){
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    });
    
    
    huankuandan.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/huankuandan/addchakan', {
                templateUrl: 'templates/huankuandan/addchakan.html'
            })
    }).controller('governCtrl',function(){
    	
    });
    angular._LoadModule('mdhuankuandan');
	return huankuandan;
});