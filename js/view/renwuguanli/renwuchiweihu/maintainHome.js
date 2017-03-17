define(['angular'], function(angular) {
	var maintainHome = angular.module("maintainHome",[]);
	maintainHome.controller("maintainHomeCtrl",function($scope){
		
		
		$scope.onGoList = function(){
			$scope.go("/maintain/list")
		}
    });
	
});