define(['angular','js/templates/preCertificate/importERP.js','js/templates/hexiao/preCertificateDec.js'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var hexiao = angular.module('hexiao', ['importERP']);
	hexiao.run(function($http) {

			$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
			$http.defaults.headers.common["Content-Type"] = "application/json";
		})
		.config(function($routeProvider, $locationProvider, $httpProvider) {
			$httpProvider.defaults.timeout = 5000;
			$routeProvider
				.when('/hexiao/preCertificateDec', {
					templateUrl: 'templates/hexiao/preCertificateDec.html'
				})
				.otherwise({
					redirectTo: '/hexiao/index'
				});
		})
		.controller('hexiaoCtrl', function($scope,$mdMedia,$mdToast,$mdDialog) {
		$scope.selected = [];

		$scope.queryTable = {
			appdata: [{
				'rDate': '2016-5-17',
				'company': '美的制冷设备有限公司',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'order':'12665656565',
				'money': '123.00',
				'currency': 'CNY',
				'hexiaoMoney': '500.00',
				'currentHexiaoMoney':'500.00',
				'erpState': '处理中'
			}, {
				'rDate': '2016-5-17',
				'company': '美的制冷设备有限公司',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'order':'12665656565',
				'money': '123.00',
				'currency': 'CNY',
				'hexiaoMoney': '500.00',
				'currentHexiaoMoney':'500.00',
				'erpState': '处理中'
			}, {
				'rDate': '2016-5-17',
				'company': '美的制冷设备有限公司',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'order':'12665656565',
				'money': '123.00',
				'currency': 'CNY',
				'hexiaoMoney': '500.00',
				'currentHexiaoMoney':'500.00',
				'erpState': '处理中'
			}],
			limit: 5,
			page_number: 1,
			total: 25

		};

		$scope.import = function(ev) {

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			$mdDialog.show({
					controller: 'importERPCtrl',
					templateUrl: 'templates/preCertificate/importERP.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen
				})
				.then(function(item) {
					if (item != '' && item != undefined) {
						$mdToast.show(
							$mdToast.simple()
							.textContent(item)
							.position('top right')
							.hideDelay(1500)
						);
					}
				});
		}
		$scope.goList=function(){
			$scope.go("hexiao/preCertificateDec");
		}
	})
	angular._LoadModule('hexiao');
	return hexiao;
});