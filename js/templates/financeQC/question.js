define(['angular','js/templates/financeQC/question.js', 'js/templates/financeQC/editQuestion.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
	var app = angular.module('financeQC', []);
	app.config(function($routeProvider) {
		$routeProvider.when('/financeQC/editQuestion', {
				templateUrl: 'templates/financeQC/editQuestion.html'
			}).otherwise({
				redirectTo: 'templates/financeQC/question.html' 
			});
	});
	app.controller('questionCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});