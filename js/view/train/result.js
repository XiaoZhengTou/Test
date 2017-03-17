define(['angular'], function(angular) {
	var result = angular.module("result",[]);
	result.controller("trainResultCrl",['$scope','trainPublic','publicmodel','$http',function($scope,trainPublic,publicmodel,$http){
	//初始化城市
	$scope.city1 = trainPublic.orCity1;
	$scope.city2 = trainPublic.orCity2;
	//接收订单信息
	$scope.trainOrderNo = trainPublic.trainOrderNo;
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
					$scope.fromStationTime = new Date(response.data.baseInfo.fromStationTime);
					$scope.fromStationTime = $scope.fromStationTime.valueOf();
					$scope.toStationTime = new Date(response.data.baseInfo.toStationTime);
					$scope.toStationTime = $scope.toStationTime.valueOf();
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
						$scope.showConfirm("", "提示", response.msg, "确定", "重试", "", $scope.orderQueren);
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
						$scope.showConfirm("", "提示", response.msg, "确定", "重试", "", $scope.orderQuxiao);
					};

				}).error(function() {
					console.log("shibai");
				});

		};
		
		
	
	//获取乘课信息
	$scope.orderInfo = publicmodel.Passengers;
	
	//获取联系人信息
	if($scope.orderInfo.length>0){
		$scope.PassengersCnName = $scope.orderInfo[0].cnName;
		$scope.PassengersMobile = $scope.orderInfo[0].mobile;
	};	
	
	$scope.goBack = function(){
		$scope.go('/train')
	}
//	$scope.onGoAffirm = function(){
//		$scope.go('/home')
//	}
	}]);
});