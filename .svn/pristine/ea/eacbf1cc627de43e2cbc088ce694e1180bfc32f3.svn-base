define(['angular'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var mdflowApproveEC = angular.module('mdflowApproveEC', []);
	mdflowApproveEC.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	});
	mdflowApproveEC.controller('flowApproveEC', function($scope, $http, $rootScope) {
        $scope.selected = [];

    });
	return mdflowApproveEC;
});