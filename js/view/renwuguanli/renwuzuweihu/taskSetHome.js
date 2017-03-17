define(['angular'], function(angular) {
	var taskSetHome = angular.module("taskSetHome",[]);
	taskSetHome.controller("taskSetCtrl",function($scope){
		
		
		$scope.onGoList = function(){
			$scope.go("/taskSet/list")
		}
    });
	
});