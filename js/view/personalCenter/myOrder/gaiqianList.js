define(['angular'], function(angular) {
	publicFunction.addStyle('airfare.css');
	var gaiqianList = angular.module('gaiqianList', []);
	gaiqianList.controller('gaiqianListCtrl', function($scope, $http, $timeout, $filter, airfarePublic, $rootScope, statusPublic) {
		//接收航班信息
		$scope.ticket = airfarePublic.ticket;
//		console.log($scope.ticket);
		//时间设置
		$scope.checkInDate = new Date($scope.ticket.depDate);
		$scope.checkInMinDate = new Date();
//		console.log($scope.checkInDate);
		//航班信息
		$scope.airfareList = {
			lists: []
		};
		$scope.airlineName = [];
		$scope.airlineCode = [];
		var $listUrl = ShangLvUrl + 'data/flight/getFlights.do';

		function getList() {
			$scope.listShow = false;
			$scope.myList = {
				'departureCity': $scope.ticket.orgCityCode,
				'arrivalCity': $scope.ticket.desCityCode,
				'departureDate': $scope.checkInDate,
				'tripType': '1',
				'tripNum': '0'
			};
			console.log($scope.myList);
			$http({
					method: 'POST',
					url: $listUrl,
					data: $scope.myList
				})
				.success(function(response) {
					$scope.listShow = true;
					$scope.airfareList.lists = response.data.dtos;
					$scope.key = response.data.key;
//					console.log($scope.airfareList.lists);
					console.log(response);
					if(response.resultFlag == "1") {
						//遍历
						for(var i = 0; i < $scope.airfareList.lists.length; i++) {
							$scope.airlineName.push($scope.airfareList.lists[i].airlineName);
							$scope.airlineCode.push($scope.airfareList.lists[i].airlineCode);
							//经停
							//							console.log($scope.airfareList.lists[i].stopNumber);
							var flightNo = '&flightNo=' + $scope.airfareList.lists[i].flightNo;
							var depTime = '&depTime=' + ($scope.airfareList.lists[i].depDate + " " + $scope.airfareList.lists[i].depTime);
							var supplierType = '&supplierType=' + $scope.airfareList.lists[i].supplierType;
							var $stopUrl = ShangLvUrl + 'data/flight/stopItems.do?' + flightNo + depTime + supplierType;
							//							console.log($stopUrl);
							if($scope.airfareList.lists[i].stopNumber > 0) {
								$http.get($stopUrl).success(function(response) {
									$scope.stopCity = response.cityName[i];
									//									console.log(response);
								}).error(function() {
									console.log("shibai");
								});
							}

						};

						//去重
						Array.prototype.del = function(a) {
							var a = {},
								c = [],
								l = this.length;
							for(var i = 0; i < l; i++) {
								var b = this[i];
								var d = (typeof b) + b;
								if(a[d] === undefined) {
									c.push(b);
									a[d] = 1;
								}
							}
							return c;
						};
						$scope.airlineName = $scope.airlineName.del();
						$scope.airlineCode = $scope.airlineCode.del();
//						console.log($scope.airlineName);
//						console.log($scope.airlineCode);
						if($scope.airfareList.lists == "" || $scope.airfareList.lists == null) {
							$scope.showConfirm("", "提示", "抱歉，没有此次航班信息", "重选", "重试", "", getList);
							return;
						};
					} else {
						$scope.showConfirm("", "提示", response.resultMsg, "重试", "确定", getList, "");
						return;
					};
				})
				.error(function() {
					console.log("shibai");
				});
		};
		getList();
		//本页搜索
		$scope.sousuo = function() {
			$scope.selectTime = '';
			$scope.planeCon = '';
			getList();
		};
		//预订
		$scope.yuDingEconomie = function(fightList, economie) {
			statusPublic.listForm = 1;
			airfarePublic.fightList = fightList;
			airfarePublic.fightListDetail = economie;
			$scope.go('/personalCenter/gaiqianDetail');
		};
		$scope.yuDingBusines = function(fightList, busines) {
			statusPublic.listForm = 1;
			airfarePublic.fightList = fightList;
			airfarePublic.fightListDetail = busines;
			$scope.go('/personalCenter/gaiqianDetail');
		};
		$scope.yuDingHead = function(fightList, head) {
			statusPublic.listForm = 1;
			airfarePublic.fightList = fightList;
			airfarePublic.fightListDetail = head;
			$scope.go('/personalCenter/gaiqianDetail');
		};
		$scope.yuDingOfficial = function(fightList, official) {
			statusPublic.listForm = 1;
			airfarePublic.fightList = fightList;
			airfarePublic.fightListDetail = official;
			$scope.go('/personalCenter/gaiqianDetail');
		}
		//时间排序
		var orderBy = $filter('orderBy');
		$scope.startTimeZao = function(reverse) {
			$scope.airfareList.lists = orderBy($scope.airfareList.lists, "depTime", reverse);
			$scope.startTimeZaoActive = true;
			$scope.startTimeWanActive = false;
		};
		$scope.startTimeWan = function(reverse) {
			$scope.airfareList.lists = orderBy($scope.airfareList.lists, "depTime", !reverse);
			$scope.startTimeWanActive = true;
			$scope.startTimeZaoActive = false;
		};
		//价格排序
		$scope.priceGao = function(reverse) {
			$scope.airfareList.lists = orderBy($scope.airfareList.lists, "allLowest", reverse);
			$scope.priceGaoActive = true;
			$scope.priceDiActive = false;
		};
		$scope.priceDi = function(reverse) {
			$scope.airfareList.lists = orderBy($scope.airfareList.lists, "allLowest", !reverse);
			$scope.priceDiActive = true;
			$scope.priceGaoActive = false;
		};
		//	筛选
		$scope.selectTimes = [{
			name: "上午 00:00-11:59",
			value: "[0-12]"
		}, {
			name: "下午 12:00-17:59",
			value: "[12-18]"
		}, {
			name: "晚上 18:00-23:59",
			value: "[18-24]"
		}];
		//时间
		$scope.getSelectTime = function(time) {
			function getTimeOrder() {
				var $key = time.value;
				var params = new Object();
				var airDate = new Array();
				airDate.push($key);
				params.key = $scope.key;
				params.airDate = airDate;
				var $timeUrl = ShangLvUrl + 'data/flight/filterFlights.do';
				$http({
					url: $timeUrl,
					params: params
				}).success(function(response) {
					if(response.resultFlag == "1") {
						$scope.airfareList.lists = response.data;
						if((!$scope.airfareList.lists) || ($scope.airfareList.lists.length < 1)) {
							$scope.showConfirm("", "提示", "抱歉，没有此时间段航班信息", "确定", "重试", "", getTimeOrder);
							return;
						};
					} else {
						$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", getTimeOrder);
					};

				}).error(function() {
					console.log("shibai");
					$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", getTimeOrder);
					return;
				});
			};
			getTimeOrder();
		};
		//航班
		$scope.getPlane = function(plane, index) {
			function getPlaneOrder() {
				plane = $scope.airlineCode[index];
				console.log(plane);
				var params = new Object();
				var airlines = new Array();
				airlines.push(plane);
				params.key = $scope.key
				params.airlines = airlines;
				var $timeUrl = ShangLvUrl + 'data/flight/filterFlights.do';
				$http({
					url: $timeUrl,
					params: params
				}).success(function(response) {
					if(response.resultFlag == "1") {
						$scope.airfareList.lists = response.data;
						if((!$scope.airfareList.lists) || ($scope.airfareList.lists.length < 1)) {
							$scope.showConfirm("", "提示", "抱歉，没有此次航班信息", "确定", "重试", "", getPlaneOrder);
							return;
						};
					} else {
						$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", getPlaneOrder);
					};
				}).error(function() {
					console.log("shibai");
					$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", getPlaneOrder);
					return;
				});
			};
			getPlaneOrder();

		};
		//不限
		$scope.buxian = function() {
			getList();
		};
		//退改签详情
		$scope.tuigaiShow = function(x, event) {
			$scope.refundChange = true;
			$scope.refundChangeInfo = x.refundChangeInfo;
			console.log($scope.refundChangeInfo);
			pageX = window.screen.width - event.clientX - window.screen.width * 0.3;
			pageY = event.clientY + document.getElementById("container").scrollTop - 130;
			angular.element(document.getElementById("refundChangeInfo")).css({
				"right": pageX + "px"
			});
			angular.element(document.getElementById("refundChangeInfo")).css({
				"top": pageY + "px"
			});
		};
		$scope.tuigaiHide = function() {
			$scope.refundChange = false;
		};

	});
});