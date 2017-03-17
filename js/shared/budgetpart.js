/**
 * Created by decheng on 2016/6/24.
 */
define(['angular'], function(angular) {
	var app = angular.module('mdbudgetpart', []);
	//预算部门
	app.directive('drBudgetorg', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'E',
			replace: true,
			//priority: 9999,
			template: '<div>' +
				'<md-input-container class="md-block">' +
				//'<label>{{titlename}}</label>' +
				'<md-select placeholder="{{titlename}}" ng-model="remodel" required>' +
				'<md-option ng-selected="orgselectitem==item.busi_org_id" ng-value="item" ng-repeat="item in orgitem.info">{{item.busi_org_name}}</md-option>' +
				'</md-select>' +
				'</md-input-container>' +
				'</div>',
			scope: {
				'remodel': '=',
				'titlename': '@',
				'orgselectitem':'@'
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					console.log($scope.selectitem);
					$http({
						method: 'post',
						url: feelapplyUrl + '/bm/EmsBmBudgetNode/getBusiOrg',
						data: {
							budget_headers_id: $scope.budget_headers_id,
							page_number: 1,
							page_size: 10000
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.orgitem = data.data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
				$scope.loaditem();

			},
			link: function(scope, element, attrs) {
				console.log("this is a mdorg directive");
				//angular.element(element[0]).bind("click",scope.loaditem);

			}
		}
	}]);
	//预算科目
	app.directive('drBudgetnode', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'E',
			replace: true,
			//priority: 9999,
			template: '<div>' +
				'<md-input-container class="md-block" flex-gt-sm>' +
				//				'<label>{{titlename}}</label>' +
				'<md-select md-on-open="changeOrg(busiorgid)"  placeholder="{{titlename}}" ng-model="remodel" required>' +
				'<md-option ng-selected="nodeselectitem==item.fee_type_id" ng-value="item" ng-repeat="item in feetypeitem.info">{{item.fee_type_name}}</md-option>' +
				'</md-select>' +
				'</md-input-container>' +
				'</div>',
			scope: {
				'remodel': '=',
				'busiorgid': '=',
				'titlename': '@',
				'nodeselectitem':'@'
			},
			controller: function($scope) {
				//改变预算部时预算科目清空
				$scope.changeOrg = function(data) {
					console.log(data);
					if(data) {
						$http({
							method: 'post',
							url: feelapplyUrl + 'bm/EmsBmBudgetNode/getFeeType',
							data: {
								busi_org_id: data,
								page_number: 1,
								page_size: 10000
							},
							headers: {
								'x-auth-token': sessionStorage.Token
							}
						}).success(function(data, status, headers, config) {
							console.log(data);
							$scope.feetypeitem = data.data;
						}).error(function(data, status, headers, config) {
							console.log(data);
						});
					}

				};
				$scope.$watch('busiorgid',function(newValue,oldValue){
					console.log('newValue');
					console.log(newValue);
					$scope.changeOrg(newValue);
				});
			},
			link: function(scope, element, attrs) {
				console.log("this is a mdorg directive");
			}
		}
	}]);

	//预算单元
	app.directive('drBudgetunit', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'E',
			replace: true,
			//priority: 9999,
			template: '<div>' +
				'<md-input-container class="md-block" flex-gt-sm>' +
				//				'<label>{{titlename}}</label>' +
				'<md-select md-on-open="changeFeetype(busiorgid,feetypeid)" placeholder="{{titlename}}" ng-model="remodel" required>' +
				'<md-option ng-selected="unitselectitem==item.budget_headers_id" ng-value="item" ng-repeat="item in budgetnodeitem.info">{{item.budget_node_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			scope: {
				'remodel': '=',
				'titlename': '@',
				'busiorgid': '=',
				'feetypeid': '=',
				'unitselectitem':'@'
			},
			controller: function($scope) {
				//改变预算科目时清空预算单元
				$scope.changeFeetype = function(busiorgid, feetypeid) {
					if(busiorgid && feetypeid) {
						$http({
							method: 'post',
							url: feelapplyUrl + 'bm/EmsBmBudgetNode/getBudgetNode',
							data: {
								busi_org_id: busiorgid,
								fee_type_id: feetypeid,
								page_number: 1,
								page_size: 10000
							},
							headers: {
								'x-auth-token': sessionStorage.Token
							}
						}).success(function(data, status, headers, config) {
							$scope.budgetnodeitem = data.data;
						}).error(function(data, status, headers, config) {
							console.log(data);
						});
					}

				};
				$scope.$watch('busiorgid',function(newValue,oldValue){
					console.log(newValue);
					$scope.changeFeetype(newValue,$scope.feetypeid);
				});
				$scope.$watch('feetypeid',function(newValue,oldValue){
					console.log(newValue);
					$scope.changeFeetype($scope.busiorgid,newValue);
				});
			},
			link: function(scope, element, attrs) {
				console.log("this is a mdorg directive");
				//angular.element(element[0]).bind("click",scope.loaditem);

			}
		}
	}]);

	return app;
});