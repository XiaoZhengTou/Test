define(['angular'], function(angular) {

	var jdOrderDetail = angular.module('jdOrderDetail', []);
	jdOrderDetail.controller('jdOrderDetailCtrl', function($scope, airfarePublic, $http) {
		function goOrder() {
			$scope.go('/personalCenter/myOrder')
		};
		//接收订单信息
		$scope.orderNo = airfarePublic.jdOrderNo;
		console.log($scope.orderNo);
		var orderData = ShangLvUrl + 'data/hotel/queryby_orderno.do?';
		$http({
				url: orderData,
				params: {
					'orderNo': $scope.orderNo
				}
			})
			.success(function(response) {
				console.log(response);
				$scope.order = response.data;
				$scope.contactInfo = response.data.contactInfo;
				$scope.hotelInfo = response.data.hotelInfo;
				$scope.hotelRoomList = response.data.hotelInfo.hotelRoomList;
				$scope.passengerList = response.data.passengerList;
				
				$scope.vendor = response.data.vendor;
				$scope.supplierType = response.data.vendorNumber;
			}).error(function() {
				console.log("shibai");
			});

		//取消订单
		$scope.orderQuxiao = function() {
			$scope.showConfirm("", "提示","确定要取消订单吗？", "确定", "点错了", quxiao, "");
			function quxiao() {
				var $orderQuxiao = ShangLvUrl + 'data/hotel/cancel.do';
				$http({
						method:'POST',
						url: $orderQuxiao,
						data: {
							'orderNo': $scope.orderNo
						}
					})
					.success(function(response) {
						if(response.resultFlag == "1") {
							console.log(response);
							$scope.showAlert("", "提示", response.resultMsg, "确定", goOrder);
						} else {
							$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", quxiao);
						};

					}).error(function() {
						console.log("shibai");
					});
			};
		};
		//确认订单
		$scope.orderQueren = function() {
			var $orderQueren = ShangLvUrl + 'data/hotel/confirm_order.do';
			$http({
					method: 'POST',
					url: $orderQueren,
					data: {
						'orderNo': $scope.orderNo
//						,
//						'vendor': $scope.vendor,
//						'supplierType': $scope.supplierType
					}
				})
				.success(function(response) {
						console.log(response);
					if(response.resultFlag == "1") {
						$scope.showAlert("", "提示", response.resultMsg, "确定", goOrder);
					} else {
						$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", $scope.orderQueren);
					};

				}).error(function() {
					console.log("shibai");
				});

		};
	});
});