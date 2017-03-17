define(['angular', 'js/view/choosepassenger'], function(angular) {
	publicFunction.addStyle('train.css');
	var list = angular.module("list", []);
	list.filter('trainlistFilter', function() {
		return function(input, start) {
			start = parseInt(start, 10);
			return input.slice(start);
		}
	});
	list.filter("trainTypeFilter", ['trainPublic', function(trainPublic) {
		return function(trains) {
			var filteredTrains = new Array();
			var trainTypeFlag = false;
			console.log(trainPublic.traintypes);
			if(trainPublic.traintypes != "") {
				trainTypeFlag = true;
			}
			if(!trainTypeFlag) {
				return trains;
			}
			if(trains) {
				angular.forEach(trains, function(train) {
					if(trainTypeFlag) {
						angular.forEach(trainPublic.traintypes, function(trainType) {
							if(trainPublic.traintypes != "") {
								if(train.trainNumber.startsWith(trainType)) {
									filteredTrains.push(train);
//									trainPublic.perPage;
								}
							}
						});
					}
				});
			}
			return filteredTrains;
		}
	}]);
	list.filter("trainSeatFilter", ['trainPublic', function(trainPublic) {
		return function(trains) {
			var filteredTrains = new Array();
			var trainSeatFlag = false;
			console.log(trainPublic.trainseats);
			if(trainPublic.trainseats != "") {
				trainSeatFlag = true;
			}
			if(!trainSeatFlag) {
				return trains;
			}
			if(trains) {
				angular.forEach(trains, function(train) {
					if(trainSeatFlag) {
						angular.forEach(trainPublic.trainseats, function(trainSeat) {
							if(trainPublic.trainseats != "") {
								if(train.seatCode == trainSeat) {
									filteredTrains.push(train);
//									trainPublic.perPage;
								}
							}
						});
					}
				});
			}
			return filteredTrains;
		}
	}]);
	list.filter("trainTimeFilter", ['trainPublic', function(trainPublic) {
		return function(trains) {
			var filteredTrains = new Array();
			var trainTimeFlag = false;
			if(trainPublic.trainTimes != "") {
				trainTimeFlag = true;
			}
			if(!trainTimeFlag) {
				return trains;
			}
			if(trains) {
				angular.forEach(trains, function(train) {
					if(trainTimeFlag) {
						angular.forEach(trainPublic.trainTimes, function(trainTime) {
							if(trainPublic.trainTimes != "") {
								if(train.departureDate.substring(0, 2) >= trainTime.start && train.departureDate.substring(0, 2) <= trainTime.end) {
									filteredTrains.push(train);
									console.log(filteredTrains);
//									trainPublic.perPage;
								}
							}

						});
					}
				});
			}
			return filteredTrains;
		}
	}]);
	list.controller("trainListCrl", function($scope, $http, trainPublic, $filter, $rootScope) {
		//初始化城市
		$scope.city1 = trainPublic.orCity1;
		$scope.city2 = trainPublic.orCity2;
		//城市选择
		$scope.$watch("city1", function(newValue, oldValue) {
			trainPublic.orCity1 = newValue;
		});
		$scope.$watch("city2", function(newValue, oldValue) {
			trainPublic.orCity2 = newValue;
		});
		//初始化时间
		$scope.checkInMinDate = new Date();
		if(trainPublic.checkInDate) {
			$scope.checkInDate = new Date(trainPublic.checkInDate);
		} else {
			$scope.checkInDate = new Date();
		};
		$scope.$watch("checkInDate", function(newValue, oldValue) {
			//			alert(1);
			trainPublic.checkInDate = newValue;
		});

		//获取筛选条件
		$http.get('js/server/json/train.json').success(function(response) {
			$scope.trainTimes = response.train.trainTime;
			$scope.trainSeats = response.train.trainSeat;
			$scope.trainTypes = response.train.trainType;
		});
		//选择类型（不限）
		//时间类型
		$scope.arrTime = [];
		//座位类型
		$scope.arrSeat = [];
		//车次类型
		$scope.arrType = [];
		$scope.selected = {
			toggerChange: function(item, sel) {
				var idx = sel.indexOf(item);
				if(idx > -1) {
					sel.splice(idx, 1);
				} else {
					sel.push(item);
				}
			},
			existChange: function(item, sel) {
				return sel.indexOf(item) > -1;
			},
			clearTime: function() {
				$scope.arrTime = [];
				trainPublic.trainTimes = $scope.arrTime;
			},
			clearSeat: function() {
				$scope.arrSeat = [];
				trainPublic.trainseats = $scope.arrSeat;
			},
			clearType: function() {
				$scope.arrType = [];
				trainPublic.traintypes = $scope.arrType;
			}
		}
		trainPublic.trainTimes = $scope.arrTime;
		trainPublic.traintypes = $scope.arrType;
		trainPublic.trainseats = $scope.arrSeat;
		console.log(trainPublic.traintypes);
		console.log(trainPublic.trainseats);

		var postUrl = trainUrl + "data/trainapi/queryTrains.do";

		function queryTrainTicket() {
			$scope.listShow = false;
			$http({
				method: 'POST',
				url: postUrl,
				data: {
					"vendorNum": 100,
					"sStation": trainPublic.orCity1.text,
					"eStation": trainPublic.orCity2.text,
					"dDate": $filter('date')(trainPublic.checkInDate, "yyyy-MM-dd")
				}
			}).success(function(response) {
				$scope.listShow = true;
				console.log(trainPublic.orCity1.text);
				console.log(trainPublic.orCity2.text);
				console.log(response);
				if(response.code == "00000") {
					if(response.data) {
						$scope.trainLists = response.data;
						trainPublic.trainLists = $scope.trainLists;
						$scope.trainListLength = response.data.length;
						console.log($scope.trainLists);
						//分页
//						$scope.perPage = function() {
							$scope.itemsPerPage = 10;
							$scope.currentPage = 0;
							$scope.pageCount = Math.ceil($scope.trainListLength / $scope.itemsPerPage);
							console.log($scope.pageCount);
							$scope.firstPage = function() {
								$scope.currentPage = 0;
							}
							$scope.prevPage = function() {
								if($scope.currentPage > 0) {
									$scope.currentPage--;
								}
							}
							$scope.nextPage = function() {
								if($scope.currentPage < $scope.pageCount) {
									$scope.currentPage++;
								}
							}
							$scope.lastPage = function() {
								$scope.currentPage = $scope.pageCount - 1;
							}
							$scope.goPage = function(currentPage) {
								if(currentPage <= $scope.pageCount && currentPage > 0) {
									$scope.currentPage = currentPage - 1;
								} else {
									$scope.showAlert("", "提示", "您输入的数字页数范围内，请重新输入", "确定", "");
								}
							}
							$scope.prevPageDisabled = function() {
								return $scope.currentPage === 0 ? true : false;
							};
							$scope.nextPageDisabled = function() {
								return $scope.currentPage === $scope.pageCount - 1 ? true : false;
							}
//						}
//						$scope.perPage();
//						trainPublic.perPage = $scope.perPage();
						//分页完
					} else {
						$scope.trainLists = null;
						$scope.noTrainList = "无查询结果";
					}
				} else {
					console.log("X---x" + response.code);
				}
				//				else{
				//					$scope.trainLists = null;
				//					console.log($scope.trainLists);
				//					$scope.noTrainList = "错误代码" + response.code;
				//				}
			}).error(function() {
				return;
			})
		};
		queryTrainTicket();
		//本业搜索
		$scope.trainSerch = function() {
			var title = trainPublic.orCity1.text + '-' + trainPublic.orCity2.text;
			$rootScope.updateCrumb(title);
			queryTrainTicket();
		}

		$scope.onGoBuy = function(trainList) {
			trainPublic.selectedTrain = trainList;
			$scope.go('/train/buy', '创建订单');
		}

	});
});