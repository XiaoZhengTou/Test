define(['angular'], function(angular) {
	var app = angular.module('mdpayeeacccountedit', []);
	app.run(function($http) {

	});
	app.config(function($routeProvider, $locationProvider) {

	}).controller('accountPayeeEditCtrl', ['$scope', '$http', '$location', '$mdDialog', '$mdMedia', '$routeParams',
		function($scope, $http, $location, $mdDialog, $mdMedia, $routeParams) {
			if ($routeParams.obj) {
				var obj = angular.fromJson($routeParams.obj);
				$scope.account = obj;
				$scope.editPayee = function() {
					var AddPayeeUrl = feelapplyUrl + 'cm/userCenter/saveReceiver';
					console.log($scope.account);
					$scope.addPayee = {
						"cmEmsEmpReceiver": $scope.account,
					};
					$http({
							method: 'POST',
							url: AddPayeeUrl,
							data: $scope.addPayee
						})
						.success(function(response) {
							if (response.code == "0000") {
								$location.url('/personalCenter/account');
							} else {
								response.data.code;
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.body))
									.clickOutsideToClose(true)
									.title('提示信息')
									.textContent('访问服务器异常：' + response.code + response.msg)
									.ariaLabel('提示信息')
									.ok('确定')
								);
							}
						}).error(function() {
							console.log("shibai");
						});
				}

			}
		}
	]);
	angular._LoadModule('mdpayeeacccountedit');
	return app;
});