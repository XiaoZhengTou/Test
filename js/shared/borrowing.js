/**
 * Created by decheng on 2016/9/1
 */
define(['angular'], function(angular) {
	var app = angular.module('md.borrowing', []);
	//组织架构
	app.directive('drborrowing', ['$mdMedia', '$mdDialog', '$http', '$parse', 'publicmodel', '$filter', function($mdMedia, $mdDialog, $http, $parse, publicmodel, $filter) {
		return {
			link: function(scope, element, attrs) {
				function bindData(event) {
					var modeldata = scope.$eval(attrs.drborrowing);
					console.log(modeldata.model);
					var parsevalue = $parse(modeldata.model)(scope);
					$mdDialog.show({
						controller: DialogController,
						templateUrl: 'templates/shared/borrowing.html',
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
				            page_size: 10
						};
						$scope.filter = {
							source : [
								{id:'loan_info_code',name:'借款单号'},
								{id:'reason_desc',name:'贷款说明'},
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
								"query_param":{}
							};
							param.query_param[$scope.filter.value.id] = $scope.searchText; 
							$http({
								method: 'POST',
								noLoader:true,
								//url: feelapplyUrl + '',
								url: 'http://10.16.30.74:8080/smart-expense-web/lm/loan/listMyLoan',
								data: param,
								headers: {
									'x-auth-token': sessionStorage.Token
								}
							}).success(function(data, status, headers, config) {
								console.log(data);
								$scope.borrowingData = data;
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
				           if($scope.searchText!=undefined){
				           		$scope.getData();
				           }
				            
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