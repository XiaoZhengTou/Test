define(['angular'], function(angular) {
    var orderList = angular.module('orderList', []);
    orderList.controller('jdOrderListCtrl', function($scope,$http,jdPublic) {
        // Request Init Begin
        var pageSize = "&pageSize=5";
        var $getOrderUrl = ShangLvUrl + 'data/hotel/order_list.do' + ShangLvToken + pageSize;
        console.log($getOrderUrl);
        $scope.orderList = [];
        $http.get($getOrderUrl).success(function(response){
            $scope.orderList = response.data.data;
        });
    	// Request Init End
        // 1:待提交,2:已作废,3:预订中, 4:已订房, 5:已成交, 6:已取消,7:预订失败
        $scope.payedList = function (item) {
            return item.orderStatus === 1;
        };
        $scope.pendingList = function (item) {
            return item.orderStatus === 7;
        };
        $scope.refoundList = function (item) {
            return item.orderStatus === 6;
        };
	})	
})