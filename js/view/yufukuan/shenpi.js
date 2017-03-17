define(['angular'], function(angular) {
    var shenpi = angular.module('shenpi', ['angularMoment']);
    shenpi.controller('yfkShenpiCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
    	// 初始化选择项开始
        $scope.shenpi = "Hello";
	});
})