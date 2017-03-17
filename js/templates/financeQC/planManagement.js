define(['angular', 'js/templates/financeQC/planManagement.js', 'js/templates/financeQC/editPlanManagement.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
	var app = angular.module('financeQC', []);
	app.config(function($routeProvider) {
		$routeProvider.when('/financeQC/editPlanManagement', {
				templateUrl: 'templates/financeQC/editPlanManagement.html'
			}).otherwise({
				redirectTo: 'templates/financeQC/planManagement.html' 
			});
	});
	app.controller('planManagementCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});