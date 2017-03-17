define(['angular'], function(angular) {
    var order = angular.module('order', []);
    order.controller('jdOrderCtrl', function($scope,$http,jdPublic,jdHotil) {
    	// Pass Data From Service
    	$scope.hotil = jdHotil.getHotil();
    	$scope.picList = $scope.hotil.hotelPictureList;
    	// Pass Data From Service End
    	// Init Request Begin
    	
    	// Init Request End
    	// List Memeber Begin
    	var $memberListUrl = ShangLvUrl + 'data/flight/getCommonPassengerList.do' + ShangLvToken;
    	console.log($memberListUrl);
    	$http.get($memberListUrl).success(function(response){
            $scope.memberList = response.data;
        });
    	// List Member End
	})	
})