define(['angular'], function(angular) {
	var passengers = angular.module('passengers', []);
	passengers.controller('passengersCtrl', function($scope, airfarePublic, jdPublic, statusPublic, publicmodel, $http, $rootScope, $timeout) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/passengers', '首页');
		$scope.query = {
			page_size: 10,
			page_number: 1
		};
		$scope.selected = [];
		//乘机人信息
		$scope.getPassengers = function() {
			var $messageUrl = ShangLvUrl + 'data/flight/getCommonPassengers.do';
			$http({
				url: $messageUrl,
				data: {
					pageSize: $scope.query.page_size,
					pageIndex: $scope.query.page_number
				}
			}).success(function(response) {
				if(response.resultFlag == 1) {
					$scope.passengers = response.data.data;
					$scope.total = response.data.total;
					console.log(response);
				} else {
					$scope.showAlert("", "提示", '访问服务器异常：' + response.resultMsg, "确定", "");

				};

			});
			$scope.promise = $timeout(function() {}, 2000);
		};
		$scope.getPassengers();

		// 乘客信息共享开始
		// 判断来源链接
		//		var from = statusPublic.selectFrom;
		//		// 初始化已经选择的乘客
		//		if(from == 0) {
		//			$scope.passengerSelected = airfarePublic.passengers;
		//		}
		//		// 接口联调开始
		//		$scope.showConfirm = false;
		//		if (publicmodel.Share.selectMode == true) {
		//			$scope.showConfirm = true;
		//          $scope.confirmSelect = function () {
		//              publicmodel.Share.data = $scope.passengerSelected;
		//              publicmodel.Share.selectMode = false;
		//              $scope.go(publicmodel.Share.fromUrl);
		//          };
		//      }
		//		// 接口联调结束
		//		// 乘客选择状态切换
		//		$scope.passengerToggle = function(item, list) {
		//			var indexid = publicFunction.arrayIndex(list, 'commPassengerId', item.commPassengerId);
		//			if(indexid > -1) {
		//				list.splice(indexid, 1);
		//			} else {
		//				list.push(item);
		//			}
		//		};
		//
		//		// 判断是否已经选择该乘客
		//		$scope.passengerExists = function(item, list) {
		//			var indexid = publicFunction.arrayIndex(list, 'commPassengerId', item.commPassengerId);
		//			return indexid > -1;
		//		};
		//
		//		// 乘客选择确认
		//		$scope.setPassengers = function() {
		//			if(from == 0) {
		//				airfarePublic.passengers = $scope.passengerSelected;
		//				$scope.go('/airfare/message');
		//			} else if(from == 1) {
		//				jdPublic.passengers = $scope.passengerSelected;
		//				$scope.go('/jiudian/order');
		//			}
		//		};

		//编辑乘客
		$scope.passengerBianji = function(passenger) {
			airfarePublic.whichPassenger = 1;
			airfarePublic.passenger = passenger;
			$scope.go('/personalCenter/addPerson', '编辑常用旅客');
			$scope.next();

		};
		//删除乘客
		$scope.passengerRemoveItem = function(item) {
			$scope.showConfirm("", "提示", "确定删除？", "删除", "点错了", RemoveItem, "");
			function RemoveItem() {
				var $passengerRemoveItemUrl = ShangLvUrl + 'data/flight/deleteCommonPassenger.do';
				$http({
						url: $passengerRemoveItemUrl,
						params: item
					})
					.success(function(response) {
						if(response.resultFlag == 1) {
							$scope.showAlert("", "提示", response.resultMsg, "确定", $scope.getPassengers);
//							$scope.getPassengers();
							console.log(response);
						} else {
							$scope.showAlert("", "提示", '访问服务器异常：' + response.resultMsg, "确定", "");

						};
					}).error(function() {
						console.log("shibai");
					});
			}
		};
		//新增乘客
		$scope.addPerson = function() {
			$scope.go('/personalCenter/addPerson', '新增常用旅客');
			$scope.next();
			airfarePublic.whichPassenger = 2;
			airfarePublic.passenger = '';
		}
	});
});