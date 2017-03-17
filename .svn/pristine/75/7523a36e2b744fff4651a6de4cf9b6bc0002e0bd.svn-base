define(['angular','moment','momentCN','ngMoment'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('airfare.css');
	publicFunction.addStyle('task.css');
	var app = angular.module('financeQC', ['angularMoment']);
	app.run(function($http){
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
   });
	app.controller('editQuestionClassCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		$scope.createTime = new Date();
		$scope.stopTime = new Date();
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});