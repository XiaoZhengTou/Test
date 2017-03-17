
define(['angular'], function(angular) {

    var add = angular.module('approval_process', ['angularMoment']);
     add.controller('nextCtrl',function($scope,$rootScope,$http){
		$scope.approvers = [
			{'id':'1','node':'N1','role':'预算会计','approver':'张三','ways':'审批','node_statu':'未审'},
			{'id':'2','node':'N2','role':'预算会计','approver':'张三','ways':'审批','node_statu':'未审'}
		];
	});
})
