define(['angular'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('md.advancepayment.home', [])
	app.controller('advancepaymenthomectrl', ['$scope', '$http', function($scope, $http) {
		$scope.loadData = function() {
			$http({
				method: 'POST',
				url: feelapplyUrl + 'ea/feeApply/listMyFeeApply',
				data: param
			}).success(function(data, status, headers, config) {
				console.log(data);
				$scope.feeapplylist = data;
				$scope.query.limit = data.data.page.pageSize;
				$scope.query.page = data.data.page.pageNumber;
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}

	}]);
	angular._LoadModule('md.advancepayment.home');
	return app;
});