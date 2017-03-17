define(['angular', 'js/view/choosepassenger'], function(angular) {
	var buy = angular.module("buy", ['muchoosepassengers']);
	buy.controller("trainBuyCrl", ['$scope', 'publicmodel', 'trainPublic', '$http', '$filter', function($scope, publicmodel, trainPublic, $http, $filter) {
		$scope.selectedtrain = trainPublic.selectedTrain;
		console.log($scope.selectedtrain);
		console.log(trainPublic.checkInDate);
		var postUrl = trainUrl + "data/trainapi/queryTrainStopInfo.do";
		function queryTrainStopInfo() {
			$http({
				method: 'POST',
				url: postUrl,
				data: {
					"vendorNum": "100",
					"trainNumber": $scope.selectedtrain.trainNumber,
					"fromStationName": $scope.selectedtrain.fromStationName,
					"toStationName": $scope.selectedtrain.toStationName,
					"departureDate": $filter('date')(trainPublic.checkInDate, "yyyy-MM-dd")
				}
			}).success(function(response) {
				console.log(response);
				if(response.code == "00000") {
					var trainStopInfo = response.data;
					var startTime = trainPublic.selectedTrain.departureDate.split(":");
					var endTime = trainPublic.selectedTrain.arrivalDate.split(":");
					$scope.startDate = new Date(trainPublic.checkInDate.getFullYear(), trainPublic.checkInDate.getMonth(), trainPublic.checkInDate.getDate(), startTime[0], startTime[1]);
					$scope.endDate = new Date(trainPublic.checkInDate.getFullYear(), trainPublic.checkInDate.getMonth(), trainPublic.checkInDate.getDate(), endTime[0], endTime[1]);
					if(response.data.usedDays > 1) {
						$scope.endDate.setDate(trainPublic.checkInDate.getDate() + trainStopInfo.usedDays - 1);
					};
					$scope.usedTime = parseInt(trainStopInfo.usedMinutes / 60) + "小时" + trainStopInfo.usedMinutes % 60 + "分钟";
					trainPublic.trainStopInfo = trainStopInfo;
					console.log(trainStopInfo);
				} else {
					$scope.showConfirm("", "提示", response.msg + '无法查询时长', "重试", "确定", queryTrainStopInfo, "");
					console.log("X---x" + response.msg);
				}
			}).error(function() {
				return;
			})
		}
		queryTrainStopInfo();

		$scope.papersType = [{
			certType: 1,
			name: '身份证'
		}, {
			certType: 2,
			name: '台湾通行证(台胞证)'
		}, {
			certType: 3,
			name: '港澳通行证'
		}, {
			certType: 4,
			name: '军人证'
		}, {
			certType: 5,
			name: '护照'
		}];
		//添加乘客
		$scope.selectedType;
		$scope.cnName = '';
		$scope.mobile = '';
		$scope.certNumber = '';
		$scope.certType = '';
		$scope.certNumberArr = [];

		$scope.addPaper = function() {
				$scope.flag = false;
				$scope.addPapers = {
					cnName: $scope.cnName,
					mobile: $scope.mobile,
					certNumber: $scope.certNumber,
					certType: $scope.selectedType
				};
				//去除重复联系人
				if($scope.cnName != "" && $scope.mobile != "" && $scope.certNumber != "") {
					if(publicmodel.Passengers.length == 0) {
						publicmodel.Passengers.push($scope.addPapers);
						$scope.certNumberArr.push($scope.certNumber);
					} else if($scope.certNumberArr.indexOf($scope.certNumber) < 0) {
						publicmodel.Passengers.push($scope.addPapers);
						$scope.certNumberArr.push($scope.certNumber);
					}
				}
			}
			//常用联系人
		$scope.passengers = publicmodel.Passengers;
		$scope.$watch('passengers', function(newValue, oldValue) {
			$scope.passengers = newValue;
			if($scope.passengers[0]) {
				$scope.PassengersCnName = $scope.passengers[0].cnName;
				$scope.PassengersMobile = $scope.passengers[0].mobile;
			}
		}, true);
		$scope.removePassenger = function(passengers) {
			$scope.passengers = passengers;
			$scope.selected = $scope.passengers[0];
			if(!$scope.passengers[0]) {
				$scope.PassengersCnName = '';
				$scope.PassengersMobile = '';
			};
		};
		$scope.getPassenger = function(item) {
			$scope.selected = item;
		};
		$scope.onGoList = function() {
			$scope.go('/train/list');
		};
		$scope.conceal = function() {
			$scope.flag = false;
		}

		//创建订单
		$scope.onGoResult = function() {
			//检验信息是否完整
//			$scope.flag = false;
//			if($scope.passengers.length == 0 || $scope.PassengersCnName == "" || $scope.PassengersMobile == "") {
//				$scope.flag = true;
//			} else {
				$scope.creatTrainOrder = function() {
					var creatTrainOrderUrl = trainUrl + "data/trainapi/createTrainOrder.do";
					var postData = new Object();
					postData.orderBaseInfo = getOrderBaseInfo();
					postData.TicketPriceInfo = getTicketPriceInfo();
					postData.contactInfo = getContactInfo();
					postData.passenegers = createPassengerList();
					postData.eaBills = createEAObject();
					$http({
						method: 'POST',
						url: creatTrainOrderUrl,
						data: postData
					}).success(function(response) {
						console.log(response);
						if(response.code == "00000") {
							//成功跳转到详情页
							if(response.data) {
								trainPublic.trainOrderNo = response.data.orderNo;
								console.log(trainPublic.trainOrderNo)
								$scope.showAlert("", "提示", response.msg, "确定", goDetail);
							}
						} else {
							$scope.showConfirm("", "提示", response.msg, "重试", "确定", $scope.creatTrainOrder, "");
						}
					}).error(function() {
						$scope.showConfirm("", "提示", response.msg, "重试", "确定", $scope.creatTrainOrder, "");
						return;
					})
					function goDetail() {
						$scope.go('/train/result','订单详情');
					};
				};
				$scope.creatTrainOrder();
//			}

		};

		function createEAObject() {
			//暂时无EMS的EA单接口，只是模拟
			var eaBills = new Array();
			var ea = new Object();
			ea.feeApplyCode = "EAxxxxx01";
			ea.budgetNodeId = 1;
			ea.budgetNodeName = "test";
			ea.availAmount = 200;
			ea.billUsedAmount = 10;
			ea.feeApplyLId = 21;
			ea.budgetHeadersId = 221;
			eaBills.push(ea);
			return eaBills;
		}

		function createPassengerList() {
			var passengers = new Array();
			var selectP = publicmodel.Passengers;
			console.log(selectP.length)
			for(var i = 0; i < selectP.length; i++) {
				var pg = new Object();
				pg.gender = selectP[i].gender;
				pg.certNumber = selectP[i].certNumber;
				pg.certType = selectP[i].certType;
				pg.passengerType = 1; //暂时个人中心无性别字段，默认填写成人
				pg.cnName = selectP[i].cnName;
				pg.mipAccount = selectP[i].mipAccount;
				pg.mobile = selectP[i].mobile;
				passengers.push(pg);
			}
			return passengers;
		}

		function getContactInfo() {
			var contactInfo = new Object();
			contactInfo.contactName = $scope.PassengersCnName;
			contactInfo.email = "li@126.com";
			contactInfo.mobile = $scope.PassengersMobile;
			contactInfo.phone = $scope.PassengersMobile;
			return contactInfo;
		}

		function getOrderBaseInfo() {
			var orderBaseInfo = new Object();
			orderBaseInfo.vendorNumber = 100;
			orderBaseInfo.payType = 1;
			orderBaseInfo.trainNumber = trainPublic.selectedTrain.trainNumber;
			orderBaseInfo.fromStationName = trainPublic.selectedTrain.fromStationName;
			orderBaseInfo.fromStationTime = $filter('date')($scope.startDate, 'yyyy-MM-dd HH:mm');
			orderBaseInfo.toStationName = trainPublic.selectedTrain.toStationName;
			orderBaseInfo.toStationTime = $filter('date')($scope.endDate, 'yyyy-MM-dd HH:mm');
			return orderBaseInfo;
		}

		function getTicketPriceInfo() {
			var ticketPriceInfo = new Object();
			ticketPriceInfo.trainNumber = trainPublic.selectedTrain.trainNumber;
			ticketPriceInfo.seatCode = trainPublic.selectedTrain.seatCode;
			ticketPriceInfo.seatPrice = trainPublic.selectedTrain.seatPrice;
			ticketPriceInfo.servicePrice = trainPublic.selectedTrain.servicePrice;
			return ticketPriceInfo;
		}

	}]);
});