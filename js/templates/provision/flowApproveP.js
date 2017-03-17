define(['angular'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var mdflowApproveP = angular.module('mdflowApproveP', []);
	mdflowApproveP.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	});
	mdflowApproveP.controller('flowApprovePCtrl', function($scope, $http, $rootScope) {
	});
	return mdflowApproveP;
});