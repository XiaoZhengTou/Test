/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {

	var app = angular.module('md.eachoose', []);
	//组织架构
	app.directive('dreachoose', ['$mdMedia', '$mdDialog', '$http', '$parse', 'publicmodel', '$filter', function($mdMedia, $mdDialog, $http, $parse, publicmodel, $filter) {
		return {
			link: function(scope, element, attrs) {
				function bindData(event) {
					var modeldata = scope.$eval(attrs.dreachoose);
					console.log(modeldata.model);
					var parsevalue = $parse(modeldata.model)(scope);
					$mdDialog.show({
						controller: DialogController,
						templateUrl: 'templates/shared/feeapply.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: true
					}).then(function(answer) {
						//截取传过来的ng-model
						$parse(modeldata.model).assign(scope, answer);
						var parsevalue = $parse(modeldata.model)(scope);
						console.log(parsevalue);
					}, function() {});

					function DialogController($scope, $mdDialog) {
						if(parsevalue) {
							$scope.selected = parsevalue;
						} else {
							$scope.selected = [];
						}

						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						$scope.answer = function(answer) {

							$mdDialog.hide($scope.selected);
						};

						$scope.query = {
							order: 'name',
							limit: 10,
							page: 1,
							reason_desc: null,
							apply_name: null,
							begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
							end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
							order_status: null,
							fee_apply_code: null
						};
						$scope.getDate = function() {
							var param = {
								"page_number": $scope.query.page,
								"page_size": $scope.query.limit,
								"query_param": {
									"reason_desc": $scope.query.reason_desc,
									"apply_name": $scope.query.apply_name,
									"begin_date": $filter('date')($scope.query.begin_date, 'yyyy-MM-dd'),
									"end_date": $filter('date')($scope.query.end_date, 'yyyy-MM-dd'),
									"order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
									"fee_apply_code": $scope.query.fee_apply_code,
									"eco_type_id": null,
									"fee_type_id": null
								}
							};
							console.log(param);
							$http({
								method: 'POST',
								url: feelapplyUrl + 'ea/feeApply/selectAvaliableFeeApply',
								data: param,
								headers: {
									'x-auth-token': sessionStorage.Token
								}
							}).success(function(data, status, headers, config) {
								console.log(data);
								$scope.feeapplylist = data;
								//								if(data.code == "0000") {
								//									
								//									$scope.query.limit = data.data.page.pageSize;
								//									$scope.query.page = data.data.page.pageNumber;
								//								}

							}).error(function(data, status, headers, config) {
								console.log(data);
							});

						}
						$scope.getDate();
						$scope.getDesserts = function() {
							console.log($scope.query);
							$scope.getDate();
						};
					}
				};
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click', bindData);
			}
		}
	}]);
	return app;
});