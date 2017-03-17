define(['angular', 'js/templates/financeQC/problemManagement.js', 'js/templates/financeQC/detailProblemManagement.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
	var app = angular.module('financeQC', []);
	app.config(function($routeProvider) {
		$routeProvider.when('/financeQC/detailProblemManagement', {
				templateUrl: 'templates/financeQC/detailProblemManagement.html'
			}).otherwise({
				redirectTo: 'templates/financeQC/problemManagement.html' 
			});
	});
	app.controller('problemManagementCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		
	
	}]);

	angular._LoadModule('financeQC');
	return app;
});