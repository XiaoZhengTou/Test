define(['angular', 'moment', 'momentCN', 'ngMoment'], function(angular) {
	var myOrder = angular.module('myOrder', ['angularMoment']);
	myOrder.controller('myOrderCtrl', function($scope, $http, airfarePublic, moment, $filter, $rootScope, $routeParams) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/myOrder', '首页');

		// 来源处理开始
		$scope.OrderStates = [
			'机票',
			'酒店',
			'火车票'
		];
		//其他页面返回
		if(airfarePublic.OrderState) {
			$scope.OrderState = airfarePublic.OrderState;
			switch($scope.OrderState) {
				case '机票':
					setTime(getMyOrdersData);
					getMyOrdersData();
					break;
				case '酒店':
					setTime(getjdOrdersData);
					getjdOrdersData();
					break;
				case '火车票':
					setTime(getTrainOrdersData);
					getTrainOrdersData();
					break;
			}
		} else {
			$scope.OrderState = '机票';
			setTime(getMyOrdersData);
			getMyOrdersData();
		};
		// 来源处理结束
		//改变订单类型
		$scope.changeStates = function() {
			switch($scope.OrderState) {
				case '机票':
					setTime(getMyOrdersData);
					getMyOrdersData();
					break;
				case '酒店':
					setTime(getjdOrdersData);
					getjdOrdersData();
					break;
				case '火车票':
					setTime(getTrainOrdersData);
					getTrainOrdersData();
					break;
			}
		};
		//共享设置开始
		//数据初始化
		function setTime(fun) {
			$scope.pageSizes = [
				'5',
				'10',
				'15'
			];
			$scope.selPage = 1;
			$scope.pageSize = $scope.pageSize ? $scope.pageSize : 5;
			$scope.orderType = $scope.orderType ? $scope.orderType : '';

			$scope.time = 'morth';
			$scope.tab = 0;
			$scope.checkInDateo = new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate());
			$scope.checkOutDateo = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
			$scope.getNewData = function() {
				$scope.time = null;
				$scope.tab = -1;
			};
			//搜索
			$scope.myOrderSearch = function() {
				$scope.selPage = 1;
				fun();
			};
			//按时间段搜索订单
			$scope.orderStrs = [{
				time: 'morth',
				name: '最近一个月'
			}, {
				time: 'morths',
				name: '三个月'
			}, {
				time: 'year',
				name: '一年'
			}, {
				time: 'all',
				name: '全部'
			}];
			$scope.getOrderStr = function(orderStr, index) {
				$scope.time = orderStr.time;
				switch($scope.time) {
					case 'morth':
						$scope.checkInDateo = new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate());
						$scope.checkOutDateo = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
						break;
					case 'morths':
						$scope.checkInDateo = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() - 2) + '-' + new Date().getDate());
						$scope.checkOutDateo = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
						break;
					case 'year':
						$scope.checkInDateo = new Date((new Date().getFullYear() - 1) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
						$scope.checkOutDateo = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
						break;
					case 'all':
						$scope.checkInDate = '';
						$scope.checkOutDate = '';
						$scope.checkInDateo = null;
						$scope.checkOutDateo = null;
						break;
				};
				console.log($scope.checkInDateo);
				console.log($scope.checkOutDateo);
				$scope.tab = index;
				console.log($scope.time);
				//搜索
				$scope.myOrderSearch = function() {
					$scope.selPage = 1;
					fun();
				};
			}
		};
		setTime(getMyOrdersData);
		//设置页脚
		function setyejiao(totalPage, totalAmount) {
			if($scope.selPage >= totalPage) {
				$scope.selectedPage = totalAmount;
			} else {
				$scope.selectedPage = $scope.selPage * $scope.pageSize;
			};

			$scope.selectedLeftPage = ($scope.selPage - 1) * $scope.pageSize + 1;
			//初始化页脚颜色
			if($scope.selPage <= 1) {
				$scope.selectLeftPage = false;
			} else {
				$scope.selectLeftPage = true;
			}
			if($scope.selPage < totalPage) {
				$scope.selectRightPage = true;
			} else {
				$scope.selectRightPage = false;
			};
		};
		//订单类型
		function setIndex(getData) {
			$scope.getIndex = function(a) {
				$scope.orderType = a;
				$scope.selPage = 1;
				if(a) {
					getData();
				}
			};
		};
		//选择每页显示数
		function setPageSize(getData) {
			$scope.getPageSize = function(pageSize) {
				$scope.selPage = 1;
				$scope.pageSize = pageSize;
				getData();
			};
		};
		//前一页
		function setpageLeft(getData) {
			$scope.pageLeft = function() {
				$scope.selPage--;
				if($scope.selPage < 1) {
					$scope.selPage = 1;
				} else if($scope.selPage == 1) {
					$scope.selectLeftPage = false;
					$scope.selectRightPage = true;
					getData();
				} else if($scope.selPage > 1) {
					$scope.selectLeftPage = true;
					$scope.selectRightPage = true;
					getData();
				};

			};
		};
		//后一页
		function setpageRight(getData, totalPage) {
			$scope.pageRight = function() {
				$scope.selPage++;
				if($scope.selPage < totalPage) {
					getData();
					$scope.selectLeftPage = true;
					$scope.selectRightPage = true;
				} else if($scope.selPage == totalPage) {
					getData();
					$scope.selectLeftPage = true;
					$scope.selectRightPage = false;
				} else if($scope.selPage > totalPage) {
					$scope.selPage = totalPage;
				};
			};
		};
		//共享设置结束
		//机票订单开始
		function getMyOrdersData() {
			$scope.checkInDate = $filter('date')($scope.checkInDateo, "yyyy-MM-dd");
			$scope.checkOutDate = $filter('date')($scope.checkOutDateo, "yyyy-MM-dd");
			//订单类型
			setIndex(getMyOrdersData);
			var $myAirfareUrl = ShangLvUrl + 'data/flight/myOrdersData.do';
			$scope.myOrder = {
				pageIndex: $scope.selPage,
				pageSize: $scope.pageSize,
				orderStr: $scope.time,
				orderType: $scope.orderType,
				orderStartDate: $scope.checkInDate,
				orderEndDate: $scope.checkOutDate
			};
			$http({
					url: $myAirfareUrl,
					params: $scope.myOrder
				})
				.success(function(response) {
					console.log(response);
					console.log($scope.myOrder);
					if(response.resultFlag == 1) {
						$scope.totalAmount = response.data.total;
						$scope.totalPage = response.data.info.totalPage;
						$scope.airfareOrders = response.data.data;
						console.log($scope.airfareOrders);
						//设置页脚
						setyejiao($scope.totalPage, $scope.totalAmount);
						//前一页
						setpageLeft(getMyOrdersData);
						//后一页
						setpageRight(getMyOrdersData, $scope.totalPage);
						//选择每页显示数
						setPageSize(getMyOrdersData);
					} else {
						$scope.showAlert("", "提示", response.resultMsg, "确定", "");
					}
				}).error(function() {
					console.log("shibai");
				});
		};

		//进入机票订单详情
		$scope.airfareOrderDetail = function(airfareOrder) {
			airfarePublic.OrderState = $scope.OrderState;
			airfarePublic.orderNo = airfareOrder.orderNo;
			$scope.go('/personalCenter/orderRefunds', '订单详情');
			console.log(airfarePublic.orderNo);
		};
		//机票订单完

		//酒店订单
		function getjdOrdersData() {
			$scope.checkInDate = $filter('date')($scope.checkInDateo, "yyyy-MM-dd");
			$scope.checkOutDate = $filter('date')($scope.checkOutDateo, "yyyy-MM-dd");
			//订单类型
			setIndex(getjdOrdersData);
			var $jiudianOrderUrl = ShangLvUrl + 'data/hotel/order_list.do';
			$scope.myJdOrder = {
				pageIndex: $scope.selPage,
				pageSize: $scope.pageSize,
				orderStr: $scope.time,
				orderType: $scope.orderType,
				orderStartDate: $scope.checkInDate,
				orderEndDate: $scope.checkOutDate
			};
			console.log($scope.myJdOrder);
			$http({
					url: $jiudianOrderUrl,
					data: $scope.myJdOrder
				})
				.success(function(response) {
					console.log(response);
					console.log($scope.myJdOrder);
					if(response.resultFlag == 1) {
						$scope.hotelOrders = response.data.data;
						$scope.jdtotalAmount = response.data.total;
						$scope.jdtotalPage = response.data.info.totalPage;
						//设置页脚
						setyejiao($scope.jdtotalPage, $scope.jdtotalAmount);
						//前一页
						setpageLeft(getjdOrdersData);
						//后一页
						setpageRight(getjdOrdersData, $scope.jdtotalPage);
						//选择每页显示数
						setPageSize(getjdOrdersData);
						//住宿时间
						if($scope.hotelOrders) {
							for(var i = 0; i < $scope.hotelOrders.length; i++) {
								$scope.hotelcheckInDate = $scope.hotelOrders[i].checkInDate;
								$scope.hotelcheckOutDate = $scope.hotelOrders[i].checkOutDate;
								$scope.orderTime = Math.floor(($scope.hotelcheckOutDate - $scope.hotelcheckInDate) / 1000 / 60 / 60 / 24);
							}
						};
					} else {
						$scope.showAlert("", "提示", response.resultMsg, "确定", "");
					}
				}).error(function() {
					console.log("shibai");
				});
		};

		//进入酒店订单详情
		$scope.hotelOrderDetail = function(hotelOrder) {
			airfarePublic.OrderState = $scope.OrderState;
			airfarePublic.jdOrderNo = hotelOrder.orderNo;
			$scope.go('/personalCenter/jdOrderDetail', '订单详情');
		};
		//酒店订单完

		//火车票订单
		function getTrainOrdersData() {
			$scope.checkInDate = $filter('date')($scope.checkInDateo, "yyyy-MM-dd");
			$scope.checkOutDate = $filter('date')($scope.checkOutDateo, "yyyy-MM-dd");
			//订单类型
			setIndex(getTrainOrdersData);
			var $myTrainUrl = trainUrl + 'data/trainapi/queryTrainOrderList.do';
			$scope.myTrainOrder = {
				'pageNumber': $scope.selPage,
				'pageSize': $scope.pageSize,
				'orderType': $scope.orderType ? $scope.orderType : 0,
				'startDate': $scope.checkInDate,
				'endDate': $scope.checkOutDate
//									'orderStr': $scope.time,
			};
			$http({
					method: 'POST',
					url: $myTrainUrl,
					data: $scope.myTrainOrder
				})
				.success(function(response) {
					console.log($myTrainUrl);
					console.log(response);
					console.log($scope.myTrainOrder);
					if(response && response.data && response.code == '00000') {
						$scope.trTotalAmount = response.data.totalRow;
						$scope.trTotalPage = response.data.totalPage;
						var trainOrderList = response.data.trainOrderList;
						if(trainOrderList) {
							for(var i = 0; i < trainOrderList.length; i++) {
								trainOrderList[i].startTrainDate = (new Date(trainOrderList[i].fromStationTime)).valueOf();
								trainOrderList[i].endTrainDate = (new Date(trainOrderList[i].toStationTime)).valueOf();
							}
						}
						$scope.trainorders = response.data.trainOrderList;
						//设置页脚
						setyejiao($scope.trTotalPage, $scope.trTotalAmount);
						//前一页
						setpageLeft(getTrainOrdersData);
						//后一页
						setpageRight(getTrainOrdersData, $scope.trTotalPage);
						//选择每页显示数
						setPageSize(getTrainOrdersData);
					} else {
						$scope.showAlert("", "提示", response.msg, "确定", "");
					}
				}).error(function() {
					console.log("shibai");
				});
		};

		//进入火车票订单详情
		$scope.trainOrderDetail = function(trainorder) {
			airfarePublic.OrderState = $scope.OrderState;
			airfarePublic.trainOrderNo = trainorder.orderNo;
			$scope.go('/personalCenter/trOrderDetail', '订单详情');
			console.log(airfarePublic.trainOrderNo);
		};
		//火车票订单完

	});
});