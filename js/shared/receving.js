/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {
	var app = angular.module('md.receving', []);
	//组织架构
	app.directive('drreceving', ['$mdMedia', '$mdDialog', '$http', '$parse', 'publicmodel', '$filter', function($mdMedia, $mdDialog, $http, $parse, publicmodel, $filter) {
		return {
			link: function(scope, element, attrs) {
				function bindData(event) {
					var modeldata = scope.$eval(attrs.drreceving);
					console.log(modeldata.model);
					var parsevalue = $parse(modeldata.model)(scope);
					$mdDialog.show({
						controller: DialogController,
						templateUrl: 'templates/shared/receving.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true,
						fullscreen: true,
					}).then(function(answer) {
						//截取传过来的ng-model
						$parse(modeldata.model).assign(scope, answer);
						var parsevalue = $parse(modeldata.model)(scope);
						console.log(parsevalue);
					}, function() {});

					function DialogController($scope, $mdDialog,$timeout) {
						if(parsevalue) {
							$scope.selected = parsevalue;
						} else {
							$scope.selected = {};
						}
						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						$scope.answer = function(answer) {
							$mdDialog.hide(answer);
						};
						// 表格数据获取开始
						var bookmark;
						$scope.total = 0;

						// 表格数据获取结束
						$scope.query = {
							page_number: 1,
				            page_size: 10,
						};
						$scope.filter = {
							source : [
								{id:'receiver',name:'收款方名称'},
								{id:'bank_adress',name:'供应商地点'},
								{id:'vendor',name:'ERP供应商'}
							],
							value : {},
							setFilter : function(x){
								$scope.filter.value = x;
							},
				            options: {
				              debounce: 500
				            }
				        };
				        $scope.filter.value = $scope.filter.source[0];
						$scope.getData = function() {
							$scope.promise = $timeout(function () {
							}, 1000);
							var param = {
								"page_number": $scope.query.page_number,
								"page_size": $scope.query.page_size,
							};
							param[$scope.filter.value.id] = $scope.searchText; 
							$http({
								method: 'POST',
								noLoader:true,
								url: feelapplyUrl + 'cm/userCenter/listReceiver',
								data: param,
								headers: {
									'x-auth-token': sessionStorage.Token
								},
							}).success(function(data, status, headers, config) {
								$scope.recevingData = data;
								// 获取数据总数
								if (data.data.page && data.data.page.totalRow) {
									$scope.total = data.data.page.totalRow;
								}
							}).error(function(data, status, headers, config) {
								console.log(data);
							});

						}
						$scope.getData();
						// 搜索功能开始
						$scope.removeFilter = function () {
				            $scope.filter.show = false;
				            $scope.searchText = '';
				            $scope.getData();
				        };
				        $scope.$watch('searchText', function (newValue, oldValue) {
				            if(!oldValue) {
				              bookmark = $scope.query.page;
				            }
				            
				            if(newValue !== oldValue) {
				              $scope.query.page = 1;
				            }
				            
				            if(!newValue) {
				              $scope.query.page = bookmark;
				            }
				            $scope.getData();
				        });
						// 搜索功能结束
					}
				};
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click', bindData);
			}
		}
	}]);
	return app;
});