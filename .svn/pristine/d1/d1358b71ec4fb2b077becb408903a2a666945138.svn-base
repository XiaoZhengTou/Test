define(['angular', 'moment', 'momentCN', 'ngMoment', 'js/view/choosecitys.js'], function(angular) {

	var ticket = angular.module('ticketSearch', ['angularMoment', 'muchoosecitys']);
	ticket.controller('ticketCtrl', function($scope, $location, $filter, airfarePublic, moment, $mdDialog,$rootScope) {
		// 重置模块面包屑
        $rootScope.crumbInit('/shanglv/airfare','首页');
		//航班类型选择
		$scope.searchType = 'searchType1';
		//城市选择
		$scope.$watch("city1", function(newValue, oldValue) {
			airfarePublic.orCity1 = newValue;
		});
		$scope.$watch("city2", function(newValue, oldValue) {
			airfarePublic.orCity2 = newValue;
		});
		//切换往返城市
		$scope.changeCity = function() {
			var city = airfarePublic.orCity1;
			airfarePublic.orCity1 = airfarePublic.orCity2;
			airfarePublic.orCity2 = city;
			$scope.city1 = airfarePublic.orCity1;
			$scope.city2 = airfarePublic.orCity2;
		};
		//城市选择完
		
		//时间设置
		$scope.checkInMinDate = new Date();
		if (airfarePublic.checkInDate) {
			$scope.checkInDate = new Date(airfarePublic.checkInDate);
		} else {
			$scope.checkInDate = new Date();
		};
		$scope.$watch("checkInDate", function(newValue, oldValue) {
			airfarePublic.checkInDate = $filter('date')(newValue, "yyyy-MM-dd");
		});
//		//时间设置
//		function dateCalc(x, days) {
//			var y = moment(x).add(days, 'day');
//			return new Date(y);
//		}
//
//		function upDateRange() {
//			$scope.checkInMinDate = new Date();
//			$scope.checkOutMinDate = dateCalc($scope.checkInDate, 0);
//		}
//		if (airfarePublic.checkInDate) {
//			$scope.checkInDate = new Date(airfarePublic.checkInDate);
//		} else {
//			$scope.checkInDate = new Date();
//		}
//		if (airfarePublic.checkOutDate) {
//			$scope.checkOutDate = new Date(airfarePublic.checkOutDate);
//		} else {
//			$scope.checkOutDate = dateCalc($scope.checkInDate, 3);
//		}
//		upDateRange();
//		$scope.$watch("checkInDate", function(newValue, oldValue) {
//			airfarePublic.checkInDate = $filter('date')(newValue, "yyyy-MM-dd");
//			if ((newValue !== oldValue) && $scope.checkOutDate < $scope.checkInDate) {
//				$scope.checkOutDate = dateCalc($scope.checkInDate, 3, 'day');
//				upDateRange();
//			}
//		});
//		$scope.$watch("checkOutDate", function(newValue, oldValue) {
//			airfarePublic.checkOutDate = $filter('date')(newValue, "yyyy-MM-dd");
//			if (newValue !== oldValue) {
//				airfarePublic.checkOutDate = $filter('date')(newValue, "yyyy-MM-dd");
//			}
//		});
		//传值到list
		$scope.onGolist = function() {
			var title = airfarePublic.orCity1.text +'-'+ airfarePublic.orCity2.text;
			$scope.go('/airfare/list',title);
		};

	});
});