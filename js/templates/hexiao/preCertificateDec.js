define(['angular','js/templates/preCertificate/importERP.js','js/templates/preCertificate/writeOff.js'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var preCertificateDec = angular.module('preCertificateDec', ['importERP','writeOff']);
	preCertificateDec.controller('preCertificateDecCtrl', function($scope,$mdMedia,$mdToast,$mdDialog) {
		$scope.selected = [];

		$scope.queryTable = {
			appdata: [{
				'rDate': '2016-5-17',
				'company': '美的制冷设备有限公司',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'money': '123.00',
				'currency': 'CNY',
				'hexiaoMoney': '500.00',
				'currentHexiaoMoney':'500.00'
			}, {
				'rDate': '2016-5-17',
				'company': '美的制冷设备有限公司',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'money': '123.00',
				'currency': 'CNY',
				'hexiaoMoney': '500.00',
				'currentHexiaoMoney':'500.00'
			}, {
				'rDate': '2016-5-17',
				'company': '美的制冷设备有限公司',
				'supplier': '尚弘工业材料有限公司',
				'supplierAddress': '广州',
				'money': '123.00',
				'currency': 'CNY',
				'hexiaoMoney': '500.00',
				'currentHexiaoMoney':'500.00'
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
		$scope.writeOff = function(ev) {

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			$mdDialog.show({
					controller: 'writeOffCtrl',
					templateUrl: 'templates/preCertificate/writeOff.html',
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
		
	})
	angular._LoadModule('preCertificateDec');
	return preCertificateDec;
});