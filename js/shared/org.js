/**
 * Created by decheng on 2016/6/24.
 */
define(['angular'], function(angular) {
	var app = angular.module('mdorg', []);
	//组织架构
	app.directive('drOrg', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<md-input-container class="md-block" flex-gt-sm><label>{{titlename}}</label><md-select placeholder="{{titlename}}" ng-model="remodel" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-repeat="item in orgitem.info">{{item. busi_org_name}}</md-option>' +
				'</md-select></md-input-container>',
			'scope': {
				'remodel': '=',
				'titlename': '@'
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'post',
						//url:'http://10.16.30.74:8081/jiebao-docker-web/docker/busiorg/queryMain',
						url:feelapplyUrl + '/bm/EmsBmBudgetNode/getBusiOrg',
						data:{
							page_number:1,
							page_size:10000
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						},
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
			}
		}
	}]);
	
	//预算科目
	app.directive('drFeetype', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<md-input-container class="md-block" flex-gt-sm><label>{{titlename}}</label><md-select placeholder="{{titlename}}" ng-model="remodel" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-repeat="item in feetypeitem.info">{{item.fee_type_name}}</md-option>' +
				'</md-select></md-input-container>',
			'scope': {
				'remodel': '=',
				'titlename': '@',
				'orgid':'@'
			},
			controller: function($scope) {
				console.log($scope);
				$scope.loaditem = function() {
					$http({
						method: 'post',
						url:feelapplyUrl + 'bm/EmsBmBudgetNode/getFeeType',
						data:{
							busi_org_id:$scope.orgid,
							page_number:1,
							page_size:10000
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
				//$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				console.log("this is a mdorg directive");
				angular.element(element[0]).bind("click",scope.loaditem);
			}
		}
	}]);
	
	//预算单元
	app.directive('drBudgetnode', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<md-input-container class="md-block" flex-gt-sm><label>{{titlename}}</label><md-select placeholder="{{titlename}}" ng-model="remodel" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-repeat="item in budgetnodeitem.info">{{item.budget_node_name}}</md-option>' +
				'</md-select></md-input-container>',
			'scope': {
				'remodel': '=',
				'titlename': '@',
				'orgid':'@',
				'feetypeid':'@'
			},
			controller: function($scope) {
				console.log($scope);
				$scope.loaditem = function() {
					$http({
						method: 'post',
						url:feelapplyUrl + 'bm/EmsBmBudgetNode/getBudgetNode',
						data:{
							busi_org_id:$scope.orgid,
							fee_type_id:$scope.feetypeid,
							page_number:1,
							page_size:10000
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.budgetnodeitem = data.data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
				//$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				console.log("this is a mdorg directive");
				angular.element(element[0]).bind("click",scope.loaditem);
			}
		}
	}]);
	
	return app;
});