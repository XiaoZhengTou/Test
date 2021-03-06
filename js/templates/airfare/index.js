define(['angular', 'js/view/airfare/search', 'js/view/airfare/list', 'js/view/airfare/detail', 'js/view/airfare/message', 'js/view/airfare/EA_list'], function(angular) {
	//	add public.css
	publicFunction.addStyle('airfare.css');

	var airfare = angular.module('airfare', ['ticketSearch', 'list', 'detail', 'message', 'EA_list']);
	airfare.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	});
	airfare.config(function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/airfare/list', {
			templateUrl: 'templates/airfare/list.html'
		}).
		when('/airfare/detail', {
			templateUrl: 'templates/airfare/detail.html'
		}).
		when('/airfare/message', {
			templateUrl: 'templates/airfare/message.html'
		}).
		when('/airfare/EA_list', {
			templateUrl: 'templates/airfare/EA_list.html'
		}).
		otherwise({
			redirectTo: 'shanglv/airfare'
		});
	}).controller('airfareCtrl', function($scope, $http, $location, airfarePublic, $mdDialog, $filter) {
		//城市选择
		if (airfarePublic.orCity1) {
			$scope.city1 = airfarePublic.orCity1;
		} else {
			airfarePublic.orCity1 = $scope.city1 = {
				code: "8a88b3ce4ef2ded8014ef2e0e4a20033",
				countryName: "中国",
				flightCityCode: "CAN",
				header: false,
				hotCityFlag: null,
				letter: "G",
				py: "Guangzhou",
				stateName: null,
				text: "广州"
			};
		}
		if (airfarePublic.orCity2) {
			$scope.city2 = airfarePublic.orCity2;
		} else {
			airfarePublic.orCity2 = $scope.city2 = {
				code: "8a88b3ce4ef2ded8014ef2e0e4d10085",
				countryName: "中国",
				flightCityCode: "111",
				header: false,
				hotCityFlag: null,
				letter: "S",
				py: "ShangHai",
				stateName: null,
				text: "上海"
			};
		};
		//城市选择完
		//日期选择
		$scope.checkInDate = airfarePublic.checkInDate;
		
		// 弹出提示框
		$scope.showConfirm = function(ev, title, content, ok, cancel, okFunction, cacelFunction) {
			var confirm = $mdDialog.confirm()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
				.cancel(cancel);
			$mdDialog.show(confirm).then(function() {
				if (okFunction) {
					okFunction();
				}
			}, function() {
				if (cacelFunction) {
					cacelFunction();
				}
			});
		};
		$scope.showAlert = function(ev, title, content, ok,okFunction) {
			var alert = $mdDialog.alert()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
			$mdDialog.show(alert).then(function() {
				if (okFunction) {
					okFunction();
				}
			});
		};
//		$scope.tijiaoAlert = function(event) {
//			$mdDialog.show({
//				scope: $scope,
//				preserveScope: true,
//				template: '<div class="airfareTijiaoAlert">' +
//					'	正在提交中...' +
//					'</div>',
//			});
//		};
		// 弹出提示框结束
	});
	airfare.filter('getOrderStatus', function() {
		return function(orderStatus) {
			switch(orderStatus) {
				case 1:
					return '待支付';
				case 2:
					return '出票中';
				case 3:
					return '已出票';
				case 4:
					return '已取消';
				case 5:
					return '出票失败';
				default:
					return '未知';
			}
		}
	});
	airfare.filter('getVendor', function() {
		return function(vendorNum) {
			switch (vendorNum) {
				case 100:
					return '美亚';
				case 200:
					return '携程';
				case 300:
					return '一起飞';
				default:
					return '未知';
			}
		}
	});
	airfare.filter('getSeatNum', function() {
		return function(seatNum) {
			switch (seatNum) {
				case 'A':
					return '>9';
				case seatNum:
					return seatNum;
			}
		}
	});
	airfare.filter('getCertType', function() {
		return function(certType) {
			switch (certType) {
				case 1:
					return '身份证';
				case 2:
					return '台湾通行证(台胞证)';
				case 3:
					return '港澳通行证';
				case 4:
					return '回乡证';
				case 5:
					return '护照';
				default:
					return '身份证';
			}
		}
	});
	airfare.filter('parseInt', function() {
		return function(hours) {
			return parseInt(hours)
		}
	});
	//		airfare.directive('whenScrolled', function() { 
	//		  return function(scope, elm, attr) { 
	//		    var raw = elm[0]; 
	//		    elm.bind('scroll', function() { 
	//		      if (raw.scrollTop+raw.offsetHeight >= raw.scrollHeight) { 
	//		        scope.$apply(attr.whenScrolled); 
	//		      } 
	//		    }); 
	//		  }; 
	//		});
	angular._LoadModule('airfare');
	console.log('airfare loaded');
	return airfare;

});