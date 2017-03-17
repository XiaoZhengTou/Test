define(['angular'], function(angular) {

	var trOrderDetail = angular.module('trOrderDetail', []);
	trOrderDetail.controller('trOrderDetailCtrl', function($scope, airfarePublic, $http, statusPublic) {

		//接收订单号，请求数据
		$scope.trainOrderNo = airfarePublic.trainOrderNo;
		console.log($scope.trainOrderNo);
		var $trainOrderNo = trainUrl + 'data/trainapi/queryTrainOrderDetail.do';
		$http({
				method: 'POST',
				url: $trainOrderNo,
				params: {
					'orderNo': $scope.trainOrderNo
				}
			})
			.success(function(response) {
				console.log(response);
				if(response && $scope && response.code == '00000') {
					$scope.trainOrderDetail = response.data;
					$scope.baseInfo = response.data.baseInfo;
					$scope.contact = response.data.contact;
					$scope.ticketLists = response.data.ticketList;
					console.log($scope.baseInfo.orderStatus);
					$scope.fromStationTime = (new Date(response.data.baseInfo.fromStationTime)).valueOf();
					$scope.toStationTime = (new Date(response.data.baseInfo.toStationTime)).valueOf();
					$scope.orderTime = ($scope.toStationTime - $scope.fromStationTime) / 60000;
					$scope.orderMinute = ($scope.orderTime) % 60;
					$scope.orderHours = parseInt(($scope.orderTime) / 60);

					$scope.vendorNumber = response.data.baseInfo.vendorNumber;
					console.log($scope.vendorNumber);
				} else {
					$scope.showAlert("", "提示", response.msg, "确定", $scope.goBack);
				};

			}).error(function() {
				console.log("shibai");
			});

		//确认订单
		$scope.orderQueren = function() {
			var $orderQueren = trainUrl + 'data/trainapi/submitTrainOrder.do';
			$http({
					method: 'POST',
					url: $orderQueren,
					data: {
						'orderNo': $scope.trainOrderNo,
						'vendorNumber': $scope.vendorNumber
					}
				})
				.success(function(response) {
					console.log(response);
					if(response.code == '00000') {
						$scope.showAlert("", "提示", response.msg, "确定", $scope.goBack);
					} else {
						$scope.confirmShow("", "提示", response.msg, "确定", "重试", "", $scope.orderQueren);
					};

				}).error(function() {
					console.log("shibai");
				});

		};
		//取消订单
		$scope.orderQuxiao = function() {
			var $orderQuxiao = trainUrl + 'data/trainapi/cancelTrainOrder.do';
			$http({
					method: 'POST',
					url: $orderQuxiao,
					params: {
						'orderNo': $scope.trainOrderNo
					}
				})
				.success(function(response) {
					//					console.log()
					console.log(response);
					if(response.code == '00000') {
						$scope.showAlert("", "提示", response.msg, "确定", $scope.goBack);
					} else {
						$scope.confirmShow("", "提示", response.msg, "确定", "重试", "", $scope.orderQuxiao);
					};

				}).error(function() {
					console.log("shibai");
				});

		};
		//退票
		$scope.orderTuipiao = function() {
			$scope.go('/personalCenter/trainTuipiao',"退票");
			airfarePublic.trainBaseInfo = $scope.baseInfo;
			airfarePublic.trainContact = $scope.contact;
			airfarePublic.trainTicketLists = $scope.ticketLists;
		};

	});
});