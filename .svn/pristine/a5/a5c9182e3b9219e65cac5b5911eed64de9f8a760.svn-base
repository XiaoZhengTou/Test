define(['angular'], function(angular) {
	var app = angular.module('mdpayeeacccountadd', ['mdvendor']);
	app.controller('accountPayeeAddCtrl', ['$scope', '$http', '$location', '$mdDialog', '$mdMedia',
		function($scope, $http, $location, $mdDialog, $mdMedia) {
			$scope.paccount = {
				receiver: null,
				bank_name: null,
				bank_account: null,
			}
			$scope.caccount = {
				receiver: null,
				bank_name: null,
				bank_account: null,
			}
			$scope.vendor=null;
			$scope.vendorname=null;
			$scope.vendoraddress=null;
			$scope.vendorrequired=true;
			$scope.selectedIndex = 0;
			$scope.$watch('selectedIndex', function(current, old) {
				console.log(current);
			});
			//保存EMP:个人账户，PUB：对公账号
			$scope.addPayee = function() {
				var AddPayeeUrl = feelapplyUrl + 'cm/userCenter/saveReceiver';
				$scope.addPayee = {
					"cmEmsEmpReceiver": {
						// "tenant_id": "1",
						"type": !$scope.selectedIndex ? "EMP" : "PUB",
						// "operator_id": "1",
						"vendor_type": "1",
						"vendor_id": "1",
						"vendor_code": "1",
						"vendor_name": null,
						"receiver": !$scope.selectedIndex ? $scope.paccount.receiver : $scope.caccount.receiver,
						"bank_name": !$scope.selectedIndex ? $scope.paccount.bank_name : $scope.caccount.bank_name,
						"bank_account": !$scope.selectedIndex ? $scope.paccount.bank_account : $scope.caccount.bank_account,
						"bank_code": "1",
						"receiver_en": "1",
						"provice": "1",
						"city": "1",
						"bank_adress": "1",
						"card_type": !$scope.selectedIndex ? $scope.paccount.card_type : $scope.caccount.card_type,
						"id": null
					}
				};
				console.log($scope.addPayee);
				$http({
						method: 'POST',
						url: AddPayeeUrl,
						data: $scope.addPayee
					})
					.success(function(response) {
						console.log(response);
						if (response.code == "0000") {
							$location.url('/personalCenter/account');
						} else {
							response.data.code;
							$mdDialog.show($mdDialog.alert()
								.parent(angular.element(document.body))
								.clickOutsideToClose(true).title('提示信息')
								.textContent('访问服务器异常：' + response.code + response.msg).ariaLabel('提示信息').ok('确定')
							);
						}
					}).error(function() {
						console.log("shibai");
					});
			};

		}
	]);
	angular._LoadModule('mdpayeeacccountadd');
	return app;
});