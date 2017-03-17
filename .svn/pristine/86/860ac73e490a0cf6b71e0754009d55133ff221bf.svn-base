define(['angular', 'js/shared/choosestation.js'], function(angular) {
	var home = angular.module("home", ['mdTrainStation']);
	home.controller("trainHomeCrl", function($scope, $http, $rootScope, $filter, trainPublic) {

		// 重置模块面包屑
		$rootScope.crumbInit('/train', '首页');
		//选择城市
		if(trainPublic.orCity1) {
			$scope.city1 = trainPublic.orCity1;
		} else {
			trainPublic.orCity1 = $scope.city1 = {
				"letter": "B",
				"header": 0,
				"text": "北京",
				"isHot": 1,
				"stationId": 3
			};
		}
		if(trainPublic.orCity2) {
			$scope.city2 = trainPublic.orCity2;
		} else {
			trainPublic.orCity2 = $scope.city2 = {
				"letter": "G",
				"header": 0,
				"text": "广州",
				"isHot": 1,
				"stationId": 30
			};
		};
		$scope.$watch("city1", function(newValue, oldValue) {
			trainPublic.orCity1 = newValue;
		});
		$scope.$watch("city2", function(newValue, oldValue) {
			trainPublic.orCity2 = newValue;
		});
		//切换往返城市
		$scope.changeCity = function() {
			var city = trainPublic.orCity1;
			trainPublic.orCity1 = trainPublic.orCity2;
			trainPublic.orCity2 = city;
			$scope.city1 = trainPublic.orCity1;
			$scope.city2 = trainPublic.orCity2;
		};

		//选择时间
		$scope.checkInMinDate = new Date();
		if(trainPublic.checkInDate) {
			$scope.checkInDate = new Date(trainPublic.checkInDate);
		} else {
			$scope.checkInDate = new Date();
		};
		$scope.$watch("checkInDate", function(newValue, oldValue) {
			trainPublic.checkInDate = newValue;
		});

		$scope.onGolist = function() {
			var txt = trainPublic.orCity1.text + "-" + trainPublic.orCity2.text;
			$scope.go('/train/list', txt);
		};

	});

});