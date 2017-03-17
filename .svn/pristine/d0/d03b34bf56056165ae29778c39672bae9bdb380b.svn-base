define(['angular',
	'js/templates/personalCenter/account/add.js',
	'js/templates/personalCenter/account/edit.js',
	'js/templates/personalCenter/account/banks.js',
	'js/shared/organization.js',
	'js/shared/vendor.js'
], function(angular) {
	var app = angular.module('mdpayeeacccount', ['mdpayeeacccountedit', 'mdpayeeacccountadd', 'mdpayeeacccountbank', 'mdorganization']);
	app.run(function($http) {

	});
	app.filter('banks', function() {
		return function(status) {
			switch(status) {
				case '中国农业银行':
					return 'img/bank/zgny.gif';
				case '中国邮政':
					return 'img/bank/zgyz.gif';
				case '平安银行':
					return 'img/bank/zgyz.gif';
				case '兴业银行':
					return 'img/bank/fjxy.gif';
				case '中国银行':
					return 'img/bank/zgyh.gif';
				case '中国工商银行':
					return 'img/bank/zggs.gif';
				case '上海银行':
					return 'img/bank/shyh.gif';
				case '民生银行':
					return 'img/bank/zgms.gif';
				case '光大银行':
					return 'img/bank/zggd.gif';
				case '华夏银行':
					return 'img/bank/hxyh.gif';
				case '广州市商业银行':
					return 'img/bank/gzssy.gif';
				case '农村信用社':
					return 'img/bank/ncxys.gif';
				case '中国建设银行':
					return 'img/bank/zgjs.gif';
				case '广东发展银行':
					return 'img/bank/gdfz.gif';
				case '招商银行':
					return 'img/bank/zsyh.gif';
				case '上海浦东发展银行':
					return 'img/bank/shpdfz.gif';
				case '中信银行':
					return 'img/bank/zxsy.gif';
				default:
					return 'img/bank/zgyh.gif';
			}
		}

	});
	app.config(function($routeProvider, $locationProvider) {
		$routeProvider.when('/personalCenter/accountedit/:obj', {
			templateUrl: 'templates/personalCenter/account/edit.html'
		}).when('/personalCenter/accountadd', {
			templateUrl: 'templates/personalCenter/account/add.html'
		});
	}).controller('payeeAccountCtrl', ['$scope', '$http', '$location', '$mdDialog', '$mdMedia',
		function($scope, $http, $location, $mdDialog, $mdMedia) {

			$scope.query = {
				order: 'name',
				limit: 100,
				page: 1
			};
			//加载数据函数
			$scope.loadData = function() {
					var payeeUrl = feelapplyUrl + 'cm/userCenter/listReceiver';
					$scope.mypayee = {
						"page_number": $scope.query.page,
						"page_size": $scope.query.limit
					};
					$http({
							method: 'POST',
							url: payeeUrl,
							data: $scope.mypayee,
							headers: {
								'x-auth-token': sessionStorage.Token
							},
						})
						.success(function(response) {
							if(response.code == '0000') {
								$scope.payees = response.data.dataList;
							} else {
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

							console.log(response);
						}).error(function() {
							console.log("shibai");
						});
				}
				//加载数据
			$scope.loadData();
			//删除
			$scope.onDelete = function(ev, item) {
					var confirm = $mdDialog.confirm()
						.title('提示')
						.textContent('确定删除？')
						.ariaLabel('提示')
						.targetEvent(ev)
						.ok('删除')
						.cancel('取消');
					$mdDialog.show(confirm).then(function() {
						console.log(item.id);
						//选择删除后执行删除操作
						var $payeeRemoveItemUrl = feelapplyUrl + 'cm/userCenter/deleteReceiver';
						$http({
								method: 'POST',
								url: $payeeRemoveItemUrl,
								data: {
									"id": item.id
								}
							})
							.success(function(response) {
								console.log(response);
								if(response.code == "0000") {
									$scope.loadData();
								} else {
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
					}, function() {
						$scope.status = 'You decided to keep your debt.';
					});
				}
				//
			$scope.onEdit = function(ev, item) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

				function DialogController($scope, $mdDialog) {
					$scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
					$scope.answer = function(answer) {
						$mdDialog.hide(answer);
					};
				}
				$mdDialog.show({
						controller: DialogController,
						templateUrl: 'templates/personalCenter/account/edit.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: true,
						fullscreen: useFullScreen
					})
					.then(function(answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function() {
						$scope.status = 'You cancelled the dialog.';
					});
			}

			$scope.onSetDefaultAccount = function(payee) {
				var urls = feelapplyUrl + 'cm/userCenter/setDefaultReceiver';
				$http({
						method: 'POST',
						url: urls,
						data: {
							"id": payee.id
						}
					})
					.success(function(response) {
						console.log(response);
						if(response.code == "0000") {
							$scope.loadData();
						} else {
							$mdDialog.show(
								$mdDialog.alert()
								.parent(angular.element(document.body))
								.clickOutsideToClose(true)
								.title('提示信息')
								.textContent('操作异常：' + response.code + response.msg)
								.ariaLabel('提示信息')
								.ok('确定')
							);
						}
					}).error(function() {
						console.log("错误");
					});
			};
		}
	]);
	angular._LoadModule('mdpayeeacccount');
	return app;
});