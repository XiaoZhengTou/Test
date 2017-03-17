define(['angular'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('task.css');
    publicFunction.addStyle('airfare.css');
	var app = angular.module('financeQC', []);
	app.controller('detailReportQCCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});