define(['angular'], function(angular) {

	var orderRefunds = angular.module('orderRefunds', []);
	orderRefunds.controller('orderRefundsCtrl', function($scope, airfarePublic, $http, statusPublic) {

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
				$scope.flag = response.data.flag;
				$scope.passengers = response.data.passengers;
				$scope.ticket = response.data.ticket;
				$scope.ticketPrice = response.data.ticketPrice;
				$scope.passengersLength = response.data.passengers.length;
				$scope.depTime = response.data.ticket.depTime;
				$scope.arrTime = response.data.ticket.arrTime;
				console.log($scope.airfareOrderDetail);
				$scope.orderTime = ($scope.arrTime - $scope.depTime) / 60000;
				$scope.orderMinute = ($scope.orderTime) % 60;
				$scope.orderHours = parseInt(($scope.orderTime) / 60);
				$scope.vendorOrderNo = response.data.order.vendorOrderNo;
				$scope.supplierType = response.data.order.vendorNumber;
			}).error(function() {
				console.log("shibai");
			});

		function goOrder() {
			$scope.go('/personalCenter/myOrder')
		};
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
		//改签
		$scope.orderGaiqian = function() {
			$scope.go('/personalCenter/gaiqianDetail', '改签')
			airfarePublic.contact = $scope.contact;
			airfarePublic.ticket = $scope.ticket;
			statusPublic.listForm = 0;
		};
		//退票
		$scope.orderTuipiao = function() {
			$scope.go('/personalCenter/tuipiao', '退票')
			airfarePublic.contact = $scope.contact;
		};
		//改签详情
		$scope.gaiqianConfirm = function() {
			$scope.go('/personalCenter/gaiqianConfirm', '改签详情');
		};
		//退票详情
		$scope.tuipiaoDetail = function() {
			$scope.go('/personalCenter/tuipiaoDetail', '退票详情');
		};
	});
});