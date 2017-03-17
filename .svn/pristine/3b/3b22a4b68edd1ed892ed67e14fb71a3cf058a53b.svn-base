define(['angular'], function(angular) {
    var confirm = angular.module('confirm', []);
    confirm.controller('jdConfirmCtrl', function($scope,$rootScope,$http,jdPublic,publicmodel) {
    	$scope.order = jdPublic.Order;
    	// 查询房型
    	var roomnum = $scope.order.roomCode;
    	var roomArray = $scope.order.hotelInfo.hotelRoomList;
    	for(var j = 0, length2 = roomArray.length; j < length2; j++){
    		if (roomArray[j]['roomCode'] == roomnum) {
    			$scope.roominfo = roomArray[j];
    			break;
    		}
    	}
    	// 查询房型结束
	})	
})