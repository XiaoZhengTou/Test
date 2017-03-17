define(['angular', 'js/templates/financeQC/problemSelection.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('airfare.css');
	publicFunction.addStyle('task.css');
	var app = angular.module('financeQC', []);
	app.config(function($routeProvider){
		$routeProvider.when('/financeQC/problemSelection', {
			templateUrl: 'templates/financeQC/problemSelection.html'
		}).otherwise({
			redirectTo: 'templates/financeQC/taskProcessing.html'
		});
	});
	app.controller('operationCtrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, filter, $mdDialog){
		
		//确认弹出框
		var alert;
	    $scope.showAlert = showAlert;
	    // Internal method
	    function showAlert() {
	      alert = $mdDialog.alert({
	        title: '温馨提示：',
	        textContent: '提交成功',
	        ok: 'Close'
	      });
	      $mdDialog
	        .show( alert )
	        .finally(function() {
	          alert = undefined;
	        });
	    }
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});