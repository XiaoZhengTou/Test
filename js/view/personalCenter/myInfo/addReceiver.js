define(['angular'], function(angular) {
    
	var addReceiver = angular.module('addReceiver', []);
	addReceiver.controller('addReceiverCtrl', function($scope,airfarePublic) {
		var states = airfarePublic.whichReceiver;
		console.log(states);
		if(states == 1){
			$scope.addReceiverTop = "编辑收货人";
		}else if(states == 2){
			$scope.addReceiverTop = "新增收货人";
		};
		$scope.receiver = airfarePublic.receiver;
	
	});
});