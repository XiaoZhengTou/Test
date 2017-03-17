define(['angular'], function(angular) {

	var telAirfareIndex = angular.module('telAirfareIndex', []);
	telAirfareIndex.controller('telAirfareIndexCtrl', function($scope, $rootScope, airfarePublic) {
		// 重置模块面包屑
		$rootScope.crumbInit('/shanglv/telAirfare', '首页');

		//数据初始化
		$scope.query = {
			page_size: 10,
			page_number: 1,
			order_code: null,
			description: null,
			order_status: null,
			apply_date_before: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
			apply_date_after: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),

		};
		$scope.selected = [];
		$scope.airfareLists = [{
			a: "shdf",
			b: "dggrrg",
			c: "sjhf",
			d: 'djfeo',
			e: 'sofoeo',
			f: "jodfho",
			g: 'jooeuoi',
			h: "jsojoaj",
			i: "skdhi"
		}, {
			a: "shdf",
			b: "dggrrg",
			c: "sjhf",
			d: 'djfeo',
			e: 'sofoeo',
			f: "jodfho",
			g: 'jooeuoi',
			h: "jsojoaj",
			i: "skdhi"
		}, {
			a: "shdf",
			b: "dggrrg",
			c: "sjhf",
			d: 'djfeo',
			e: 'sofoeo',
			f: "jodfho",
			g: 'jooeuoi',
			h: "jsojoaj",
			i: "skdhi"
		}];
		$scope.goAirfareDetail = function(airfareList) {
			airfarePublic.airfareList = airfareList;
			$scope.go('/telAirfare/airfareDetail', '机票详情');
		}
		$scope.goAddAirfare = function() {
			$scope.go('/telAirfare/addAirfare', '新增机票')
		}

	});
});