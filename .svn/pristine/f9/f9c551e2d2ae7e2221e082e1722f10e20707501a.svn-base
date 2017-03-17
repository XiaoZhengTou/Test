define(['angular', 'js/view/telAirfare/index.js', 'js/view/telAirfare/addAirfare.js', 'js/view/telAirfare/phoneYzm.js', 'js/view/telAirfare/airfareDetail.js', 'js/view/telAirfare/tuipiao.js', 'js/view/telAirfare/gaiqian.js'], function(angular) {
	//	add public.css
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('telAirfare.css');

	var telAirfare = angular.module('telAirfare', ['telAirfareIndex', 'addAirfare', 'phoneYzm','airfareDetail','tuipiao','gaiqian']);
	telAirfare.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	});
	telAirfare.config(function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/telAirfare/addAirfare', {
			templateUrl: 'templates/telAirfare/addAirfare.html'
		}).
		when('/telAirfare/phoneYzm', {
			templateUrl: 'templates/telAirfare/phoneYzm.html'
		}).
		when('/telAirfare/airfareDetail', {
			templateUrl: 'templates/telAirfare/airfareDetail.html'
		}).
		when('/telAirfare/tuipiao', {
			templateUrl: 'templates/telAirfare/tuipiao.html'
		}).
		when('/telAirfare/gaiqian', {
			templateUrl: 'templates/telAirfare/gaiqian.html'
		}).
		otherwise({
			redirectTo: 'shanglv/airfare'
		});
	}).controller('telAirfareCtrl', function($scope, $http, $location, airfarePublic, $mdDialog, $filter) {
		//退票改签原因
		$scope.reasons = [
			'行程改变',
			'下单时选错日期/航班',
			'下单时填错乘机人/联系人信息',
			'在其他渠道发现更优惠的机票',
			'航班延误或取消，航班时刻变更',
			'其他'
		];
		//弹出提示框
		$scope.showConfirm = function(ev, title, content, ok, cancel, okFunction, cacelFunction) {
			var confirm = $mdDialog.confirm()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
				.cancel(cancel);
			$mdDialog.show(confirm).then(function() {
				if(okFunction) {
					okFunction();
				}
			}, function() {
				if(cacelFunction) {
					cacelFunction();
				}
			});
		};
		$scope.showAlert = function(ev, title, content, ok, okFunction) {
			var alert = $mdDialog.alert()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
			$mdDialog.show(alert).then(function() {
				if(okFunction) {
					okFunction();
				}
			});
		};
	});
	telAirfare.filter('getSeatNum', function() {
		return function(seatNum) {
			switch(seatNum) {
				case 'A':
					return '>9';
				case seatNum:
					return seatNum;
			}
		}
	});
	telAirfare.filter('getCertType', function() {
		return function(certType) {
			switch(certType) {
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
	angular._LoadModule('telAirfare');
	console.log('telAirfare loaded');
	return telAirfare;

});