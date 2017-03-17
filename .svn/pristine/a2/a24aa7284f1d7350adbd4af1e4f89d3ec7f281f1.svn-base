define(['angular','js/templates/financeQC/questionClass.js', 'js/templates/financeQC/editQuestionClass.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
	var app = angular.module('financeQC', []);
	app.config(function($routeProvider) {
		$routeProvider.when('/financeQC/editQuestionClass', {
				templateUrl: 'templates/financeQC/editQuestionClass.html'
			}).otherwise({
				redirectTo: 'templates/financeQC/questionClass.html' 
			});
	});
	app.controller('questionClassCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		$scope.data = new Date();
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});