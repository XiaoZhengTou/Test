define(['angular', 'js/server/json/airCitys', 'js/server/json/hotelCitys', ], function(angular) {
	var app = angular.module('muchoosecitys', ['mdAirCitys', 'mdHotelCitys']);
	app.directive('drchoosecitys', ['$mdDialog', 'airCitys', 'hotelCitys', '$parse', function($mdDialog, airCitys, hotelCitys, $parse) {
		return {
			restrict: 'A',
			//templateUrl:'view/choosecitys.html',
			//replace: true,
			link: function($scope, element, attrs) {
				//console.log(element);

				function openDialog(event) {
					//获取指令的属性，比转换类型
					var modeldata = $scope.$eval(attrs.drchoosecitys);

					function DialogController($scope, $mdDialog) {
						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						$scope.answer = function(answer) {
							//根据传过来的ng-model进行赋值
							$mdDialog.hide(answer);
						};
						if(modeldata.data == 'hotel') {
							$scope.citys = hotelCitys.citys;
						} else {
							$scope.citys = airCitys.citys;
						}
						$scope.search = null;
						$scope.onSearch = function(search) {

							if(search == '') {
								$scope.search = null;
							}
							console.log(search);
						};
					}
					$mdDialog.show({
							controller: DialogController,
							templateUrl: 'templates/shared/choosecitys.html',
							parent: angular.element(document.body),
							targetEvent: event,
							clickOutsideToClose: true
						})
						.then(function(answer) {
							//$parse(modeldata.model).assign($scope,answer);

							if(answer) {
								//获取值
								var parsevalue = $parse(modeldata.model)($scope);
								console.log(parsevalue);
								if(angular.isArray(parsevalue)) {
									//判断数据中是否已经存在重复
									for(var value in parsevalue) {
										if(parsevalue[value].cityId == answer.cityId) {
											return;
										}
									}
									parsevalue.push(answer);
									$parse(modeldata.model).assign($scope, parsevalue);
								} else {
									$parse(modeldata.model).assign($scope, answer);
								}
							}
						}, function() {
							$scope.status = 'You cancelled the dialog.';
						});
				}
				//element[0].bind('click', openDialog, false);
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click', openDialog);
			}
		}
	}]);
	app.directive('drChoosecitysext', ['$mdDialog', 'airCitys', 'hotelCitys', '$parse', function($mdDialog, airCitys, hotelCitys, $parse) {
		return {
			scope: {
				citylist: '='
			},
			restrict: 'A',
			link: function($scope, element, attrs) {
				//console.log(element);
				function openDialog() {
					//获取指令的属性，比转换类型
					function DialogController($scope, $mdDialog) {
						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						$scope.answer = function(answer) {
							//根据传过来的ng-model进行赋值
							$mdDialog.hide(answer);
						};
						if($scope.datasource == 'hotel') {
							$scope.citys = hotelCitys.citys;
						} else {
							$scope.citys = airCitys.citys;
						}
						$scope.search = null;
						$scope.onSearch = function(search) {
							if(search == '') {
								$scope.search = null;
							}
							console.log(search);
						};
					}
					$mdDialog.show({
							controller: DialogController,
							templateUrl: 'templates/shared/choosecitys.html',
							parent: angular.element(document.body),
							//targetEvent: event,
							clickOutsideToClose: true
						})
						.then(function(answer) {
							if(answer && $scope.citylist && angular.isArray($scope.citylist)) {
								for(var i in $scope.citylist) {
									if($scope.citylist[i].cityId == answer.cityId) {
										return;
									}
								}
								$scope.citylist.push(answer);
							} else {
								$scope.citylist = answer;
							}
							console.log($scope.citylist);
						}, function() {
							$scope.status = 'You cancelled the dialog.';
						});
				};
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click', openDialog);
			}
		}
	}]);
	return app;
});