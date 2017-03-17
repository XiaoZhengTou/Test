define(['angular'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var mdflowApprove = angular.module('mdflowApprove', []);
	mdflowApprove.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	});
	mdflowApprove.controller('flowApproveCtrl', function($scope, $http, $rootScope) {
	});
	return mdflowApprove;
});