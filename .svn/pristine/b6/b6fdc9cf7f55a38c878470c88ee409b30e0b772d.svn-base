define(['angular',"js/templates/preCertificate/importERP.js","js/templates/hexiao/preCertificateDec.js"], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var preCertificate = angular.module('preCertificate', ['importERP']);
	preCertificate.run(function($http) {

			$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
			$http.defaults.headers.common["Content-Type"] = "application/json";
		})
		.config(function($routeProvider, $locationProvider, $httpProvider) {
			$httpProvider.defaults.timeout = 5000;
			$routeProvider
				.when('/preCertificate/preCertificateDec', {
					templateUrl: 'templates/hexiao/preCertificateDec.html'
				})
				.otherwise({
					redirectTo: '/preCertificate/index'
				});
		})
		.controller('preCertificateCtrl', function($scope,$mdMedia,$mdToast,$mdDialog) {
		$scope.selected = [];
		$scope.queryTable = {
			appdata: [{
				'sumDate': '2016-5-17',
				'certificateNum': '1566565656',
				'company': '美的制冷设备有限公司',
				'money': '123.00',
				'currency': 'CNY',
				'dec': '工程部张三报销材料款',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'certificateState': '有效',
				'erpState': '处理中'
			}, {
				'sumDate': '2016-5-17',
				'certificateNum': '1566565656',
				'company': '美的制冷设备有限公司',
				'money': '123.00',
				'currency': 'CNY',
				'dec': '工程部张三报销材料款',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'certificateState': '有效',
				'erpState': '处理中'
			}, {
				'sumDate': '2016-5-17',
				'certificateNum': '1566565656',
				'company': '美的制冷设备有限公司',
				'money': '123.00',
				'currency': 'CNY',
				'dec': '工程部张三报销材料款',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'certificateState': '有效',
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
			$scope.go("preCertificate/preCertificateDec");
		}
	})
	angular._LoadModule('preCertificate');
	return preCertificate;
});