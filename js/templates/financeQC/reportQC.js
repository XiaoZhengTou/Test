define(['angular', 'js/templates/financeQC/reportQC.js', 'js/templates/financeQC/detailReportQC.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
	var app = angular.module('financeQC', []);
	app.config(function($routeProvider) {
		$routeProvider.when('/financeQC/detailReportQC', {
				templateUrl: 'templates/financeQC/detailReportQC.html'
			}).otherwise({
				redirectTo: 'templates/financeQC/reportQC.html' 
			});
	});
	app.controller('reportQCCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});