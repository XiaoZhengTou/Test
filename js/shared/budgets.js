/**
 * Created by LONG on 2016/8/29.
 */
define(['angular'], function(angular) {
	var app = angular.module('mdbudgets', []);
	//预算部门
	app.directive('drBudgets', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'E',
			replace: true,
			//priority: 9999,
			template: '<div layout-gt-sm="row"><md-input-container class="md-block" flex-gt-sm><label>{{titlename}}</label><md-select ng-change="changeTree()" placeholder="{{titlename}}" ng-model="remodel.tree" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.budget_headers_id==item.budget_headers_id && item.budget_headers_id!=null" ng-repeat="item in treeitem.datalist">{{item.budget_name}}</md-option>' +
				'</md-select></md-input-container>' + '<md-input-container class="md-block" flex-gt-sm><label>{{titlenamea}}</label><md-select ng-change="changeOrg()" placeholder="{{titlenamea}}" ng-model="remodel.org" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.busi_org_id==item.busi_org_id && item.busi_org_id!=null" ng-repeat="item in orgitem.info">{{item. busi_org_name}}</md-option>' +
				'</md-select></md-input-container>' +
				'<md-input-container class="md-block" flex-gt-sm><label>{{titlenameb}}</label><md-select ng-change="changeFeetype()" placeholder="{{titlenameb}}" ng-model="remodel.feetype" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.fee_type_id==item.fee_type_id" ng-repeat="item in feetypeitem.info">{{item.fee_type_name}}</md-option>' +
				'</md-select></md-input-container>' +
				'<md-input-container class="md-block" flex-gt-sm><label>{{titlenamec}}</label><md-select placeholder="{{titlenamec}}" ng-model="remodel.node" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.budget_node_id==item.budget_node_id" ng-repeat="item in budgetnodeitem.info">{{item.budget_node_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				'remodel': '=',
				'datamodel': '=',
				'titlename': '@',
				'titlenamea': '@',
				'titlenameb': '@',
				'titlenamec': '@'
			},
			link: function(scope, element, attrs) {
				console.log("this is a mdorg directive");
				scope.loaditem = function() {
					$http({
						method: 'post',
						//url:'http://10.16.30.74:8081/jiebao-docker-web/docker/busiorg/queryMain',
						url: feelapplyUrl + '/bm/EmsBmBudgetH/pageQuery',
						data: {
							page_number: 1,
							page_size: 10000,
							query_param: {
								budget_name: null,
								budget_status: null,
								budget_templet_name: null,
								busi_org_name: null,
								fee_type_tree_name: null,
								interval_name: null,
								invalid_date: null,
								valid_date: null
							}
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						scope.treeitem = data.data;

					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
				scope.loaditem();
				//改变预算树
				scope.changeTree = function() {
					scope.remodel.org = {};
					scope.remodel.feetype = {};
					scope.remodel.node = {};
					scope.budgetnodeitem = null;
					$http({
						method: 'post',
						url: feelapplyUrl + '/bm/EmsBmBudgetNode/getBusiOrg',
						data: {
							budget_headers_id: scope.remodel.tree.budget_headers_id,
							page_number: 1,
							page_size: 10000
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						scope.orgitem = data.data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};

				//改变预算部时预算科目清空
				scope.changeOrg = function() {
					scope.remodel.feetype = {};
					scope.remodel.node = {};
					scope.budgetnodeitem = null;
					$http({
						method: 'post',
						url: feelapplyUrl + 'bm/EmsBmBudgetNode/getFeeType',
						data: {
							busi_org_id: scope.remodel.org.busi_org_id,
							page_number: 1,
							page_size: 10000
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						scope.feetypeitem = data.data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};

				//改变预算科目时清空预算单元
				scope.changeFeetype = function() {
					scope.remodel.node = {};
					$http({
						method: 'post',
						url: feelapplyUrl + 'bm/EmsBmBudgetNode/getBudgetNode',
						data: {
							busi_org_id: scope.remodel.org.busi_org_id,
							fee_type_id: scope.remodel.feetype.fee_type_id,
							page_number: 1,
							page_size: 10000
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						scope.budgetnodeitem = data.data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};
			}
		}
	}]);

	app.directive('drBudgetstow', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div><md-input-container class="md-block" flex-gt-sm><label>{{titlename}}</label><md-select ng-change="changeTree()" placeholder="{{titlename}}" ng-model="remodel.tree" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.budget_headers_id==item.budget_headers_id && item.budget_headers_id!=null" ng-repeat="item in treeitem.datalist">{{item.budget_name}}</md-option>' +
				'</md-select></md-input-container>' + '<md-input-container class="md-block" flex-gt-sm><label>{{titlenamea}}</label><md-select ng-change="changeOrg()" placeholder="{{titlenamea}}" ng-model="remodel.org" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.busi_org_id==item.busi_org_id && item.busi_org_id!=null" ng-repeat="item in orgitem.info">{{item. busi_org_name}}</md-option>' +
				'</md-select></md-input-container>' +
				'<md-input-container class="md-block" flex-gt-sm><label>{{titlenameb}}</label><md-select ng-change="changeFeetype()" placeholder="{{titlenameb}}" ng-model="remodel.feetype" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.fee_type_id==item.fee_type_id" ng-repeat="item in feetypeitem.info">{{item.fee_type_name}}</md-option>' +
				'</md-select></md-input-container>' +
				'<md-input-container class="md-block" flex-gt-sm><label>{{titlenamec}}</label><md-select placeholder="{{titlenamec}}" ng-model="remodel.node" style="text-align: left;margin: 0px;" >' +
				'<md-option ng-value="item" ng-selected="datamodel.budget_node_id==item.budget_node_id" ng-repeat="item in budgetnodeitem.info">{{item.budget_node_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				'remodel': '=',
				'datamodel': '=',
				'titlename': '@',
				'titlenamea': '@',
				'titlenameb': '@',
				'titlenamec': '@'
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'post',
						//url:'http://10.16.30.74:8081/jiebao-docker-web/docker/busiorg/queryMain',
						url: feelapplyUrl + '/bm/EmsBmBudgetH/pageQuery',
						data: {
							page_number: 1,
							page_size: 10000,
							query_param: {
								budget_name: null,
								budget_status: null,
								budget_templet_name: null,
								busi_org_name: null,
								fee_type_tree_name: null,
								interval_name: null,
								invalid_date: null,
								valid_date: null
							}
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.treeitem = data.data;

					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
				$scope.loaditem();
				//改变预算树
				$scope.changeTree = function() {
					$scope.remodel.org = {};
					$scope.remodel.feetype = {};
					$scope.remodel.node = {};
					$scope.budgetnodeitem = null;
					$http({
						method: 'post',
						url: feelapplyUrl + '/bm/EmsBmBudgetNode/getBusiOrg',
						data: {
							budget_headers_id: $scope.remodel.tree.budget_headers_id,
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
				};

				//改变预算部时预算科目清空
				$scope.changeOrg = function() {
					$scope.remodel.feetype = {};
					$scope.remodel.node = {};
					$scope.budgetnodeitem = null;
					$http({
						method: 'post',
						url: feelapplyUrl + 'bm/EmsBmBudgetNode/getFeeType',
						data: {
							busi_org_id: $scope.remodel.org.busi_org_id,
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
				};

				//改变预算科目时清空预算单元
				$scope.changeFeetype = function() {
					$scope.remodel.node = {};
					$http({
						method: 'post',
						url: feelapplyUrl + 'bm/EmsBmBudgetNode/getBudgetNode',
						data: {
							busi_org_id: $scope.remodel.org.busi_org_id,
							fee_type_id: $scope.remodel.feetype.fee_type_id,
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
				};
			},
			link: function(scope, element, attrs) {
				console.log("this is a mdorg directive");
				//angular.element(element[0]).bind("click",scope.loaditem);

			}
		}
	}]);
	return app;
});