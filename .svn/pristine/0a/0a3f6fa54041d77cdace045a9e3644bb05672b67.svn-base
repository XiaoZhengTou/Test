define(['angular','js/templates/financeQC/taskProcessing.js','js/templates/financeQC/editTaskProcessing.js'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('financeQC', []);
	app.run(function($http) {

		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
		$http.defaults.headers.common["Content-Type"] = "application/json";
	});
	app.config(function($routeProvider){
		$routeProvider.when('/financeQC/editTaskProcessing', {
			templateUrl: 'templates/financeQC/editTaskProcessing.html'
		}).otherwise({
			redirectTo: 'templates/financeQC/taskProcessing.html'
		});
	});
	app.controller('taskProcessingCtrl', function($scope, baseconfig , $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog) {
//		alert(225);


	});
	angular._LoadModule('financeQC');
	return app;
});