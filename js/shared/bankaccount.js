/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {
	var app = angular.module('md.bankaccount', []);
	//组织架构
	app.directive('drbankaccount', ['$mdMedia', '$mdDialog', '$http', '$parse', 'publicmodel', function($mdMedia, $mdDialog, $http, $parse, publicmodel) {
		return {
			link: function(scope, element, attrs) {
				function bindData(event) {
					var modeldata = scope.$eval(attrs.drbankaccount);
					console.log(modeldata.model);
					$mdDialog.show({
						controller: DialogController,
						templateUrl: 'templates/shared/bankaccount.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true
					}).then(function(answer) {
						//截取传过来的ng-model
						//$parse(modeldata.model).assign(scope, answer);
						if(answer) {
							//获取值
							var parsevalue = $parse(modeldata.model)(scope);
							console.log(parsevalue);
							if(angular.isArray(parsevalue)) {
								//判断数据中是否已经存在重复
								for(var value in parsevalue) {
									if(parsevalue[value].cityId == answer.cityId) {
										return;
									}
								}
								parsevalue.push(answer);
								$parse(modeldata.model).assign(scope, parsevalue);
							} else {
								$parse(modeldata.model).assign(scope, answer);
							}
						}
					}, function() {

					});

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
						$scope.selected = [];
						$scope.getDate = function() {
							var payeeUrl = feelapplyUrl + 'cm/userCenter/listReceiver';
							var mypayee = {
								"page_number": 1,
								"page_size": 100
							};
							$http({
								method: 'POST',
								url: payeeUrl,
								data: mypayee,
								headers: {
									'x-auth-token': sessionStorage.Token
								}
							}).success(function(response) {
								console.log(response);
								//$scope.bankaccount = response;
								//if(response.code == '0000') {
								$scope.banks = response;
								//}
							}).error(function() {
								console.log("shibai");
							});

						}
						$scope.getDate("");
					}
				};
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click', bindData);
			}
		}
	}]);
	return app;
});