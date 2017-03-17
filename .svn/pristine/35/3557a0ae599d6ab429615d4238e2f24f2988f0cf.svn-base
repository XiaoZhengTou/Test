define(['angular'], function(angular) {

	var detail = angular.module('detail', []);
	detail.controller('detailCtrl', ["$scope", "airfarePublic", "$rootScope", "$http", function($scope, airfarePublic, $rootScope, $http) {
		//接收订单号，请求数据
		$scope.RefundsOrderNo = airfarePublic.orderNo;
		console.log($scope.RefundsOrderNo);
		var $orderRefunds = ShangLvUrl + 'data/flight/getOrdersByOrderNo.do?';
		$http({
				//				method:'POST',
				url: $orderRefunds,
				params: {
					'orderNo': $scope.RefundsOrderNo
				}
			})
			.success(function(response) {
				$scope.airfareOrderDetail = response.data;
				$scope.contact = response.data.contact;
				$scope.order = response.data.order;
				//				$scope.flag = response.data.flag;
				$scope.passengers = response.data.passengers;
				$scope.ticket = response.data.ticket;
				$scope.ticketPrice = response.data.ticketPrice;
				//				$scope.passengersLength = response.data.passengers.length;
				//				$scope.depTime = response.data.ticket.depTime;
				//				$scope.arrTime = response.data.ticket.arrTime;
				console.log($scope.airfareOrderDetail);
				//			    $scope.orderTime = ($scope.arrTime - $scope.depTime)/60000;
				//			    $scope.orderMinute = ($scope.orderTime)%60;
				//				$scope.orderHours = parseInt(($scope.orderTime)/60);
				$scope.vendorOrderNo = response.data.order.vendorOrderNo;
				$scope.supplierType = response.data.order.vendorNumber;
			}).error(function() {
				console.log("shibai");
			});

		//确认订单
		$scope.orderQueren = function() {
			var $orderQueren = ShangLvUrl + 'data/flight/confirm.do';
			$http({
					method: 'POST',
					url: $orderQueren,
					data: {
						'orderNo': $scope.RefundsOrderNo,
						'vendorOrderNo': $scope.vendorOrderNo,
						'supplierType': $scope.supplierType
					}
				})
				.success(function(response) {
					if(response.resultFlag == "1") {
						console.log(response);
						$scope.showAlert("", "提示", response.resultMsg, "确定", goOrder);
						return;
					} else {
						$scope.showConfirm("", "提示", response.resultMsg, "重试", "确定", $scope.orderQueren, "");
						return;
					}

				}).error(function() {
					console.log("shibai");
				});
		};

		function goOrder() {
			$scope.go('/personalCenter/myOrder')
		};
		//取消订单
		$scope.orderQuxiao = function() {
			var $orderQuxiao = ShangLvUrl + 'data/flight/cancel.do';
			$http({
					//						method:'POST',
					url: $orderQuxiao,
					params: {
						'orderNo': $scope.RefundsOrderNo
					}
				})
				.success(function(response) {
					if(response.resultFlag == "1") {
						console.log(response);
						$scope.showAlert("", "提示", response.resultMsg, "确定", goOrder);
						return;
					} else {
						$scope.showConfirm("", "提示", response.resultMsg, "重试", "确定", $scope.orderQuxiao, "");
						return;
					}
				}).error(function() {
					console.log("shibai");
				});
		};

	}]);
});