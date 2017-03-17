define(['angular', 'js/templates/financeQC/taskGroup.js', 'js/templates/financeQC/taskGroupChildren.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
	var app = angular.module('financeQC', []);
	app.config(function($routeProvider) {
		$routeProvider.when('/financeQC/taskGroupChildren', {
				templateUrl: 'templates/financeQC/taskGroupChildren.html'
			}).otherwise({
				redirectTo: 'templates/financeQC/taskGroup.html' 
			});
	});
	app.controller('taskGroupCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});