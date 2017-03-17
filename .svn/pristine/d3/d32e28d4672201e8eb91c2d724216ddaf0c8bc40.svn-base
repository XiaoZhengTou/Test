define(['angular','js/view/renwuguanli/paidanguize/home','js/view/renwuguanli/paidanguize/orderList','js/view/renwuguanli/renwuchiweihu/maintainHome','js/view/renwuguanli/renwuchiweihu/maintainList','js/view/renwuguanli/renwuzuweihu/taskSetHome','js/view/renwuguanli/renwuzuweihu/taskSetList','js/view/renwuguanli/renwuchifenzu/taskPoolHome','js/view/renwuguanli/renwuchifenzu/taskPoolList','js/view/renwuguanli/renwuzupaidan/taskSendHome'], function(angular) {
	var task = angular.module('task', ['home' , 'orderList' , 'maintainHome' , 'maintainList' , 'taskSetHome' , 'taskSetList' , 'taskPoolHome' , 'taskPoolList' , 'taskSendHome' ]);
    task.run(function($http){
    	//	add public.css
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    });
    publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
    publicFunction.addStyle('md-data-table.min.css');
    task.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/task/list', {
                templateUrl: 'templates/renwuguanli/paidanguize/orderList.html'
            }).when('/maintain/list', {
                templateUrl: 'templates/renwuguanli/renwuchiweihu/maintainList.html'
            }).when('/taskSet/list', {
                templateUrl: 'templates/renwuguanli/renwuzuweihu/taskSetList.html'
            }).when('/taskPool/list', {
                templateUrl: 'templates/renwuguanli/renwuchifenzu/taskPoolList.html'
            });
    })
    task.controller('taskManCtrl',function($scope){
    	
    });
    angular._LoadModule('task');
	return task;
});