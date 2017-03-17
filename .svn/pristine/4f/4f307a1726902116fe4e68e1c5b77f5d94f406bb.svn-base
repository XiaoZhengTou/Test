define(['angular'], function(angular, org) {
	var app = angular.module('mdbudgetunit', []);
	app.directive('ngBudgetunit', ['$http', '$mdDialog', function($http, $mdDialog) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div ng-show="true"><md-input-container><label>预算树</label>' +
				'<md-select ng-model="budget_node_id">' +
				'<md-option ng-repeat="state in EmsBmBudgetH.data.datalist" ng-value="state">{{state.busi_org_name}}</md-option>' +
				'</md-select></md-input-container><md-input-container>' +
				'<label>预算单元</label>' +
				'<md-select ng-model="budget_node_ids">' +
				'<md-option ng-repeat="state in BudgetNodes.data" ng-value="state">{{state.budget_node_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				'unittree': '=',
				'unitnode': '=',
			},
			link: function(scope, element, attrs) {
				scope.emsBudgetreeData = function() {
					/*获取可操作列表*/
					$http({
						method: 'POST',
						url: feelapplyUrl + 'bm/EmsBmBudgetH/pageQuery',
						data: {
							"page_number": 1,
							"page_size": 100,
							"query_param": {
								"budget_name": null,
								"budget_status": null,
								"budget_templet_name": null,
								"busi_org_name": null,
								"fee_type_tree_name": null,
								"interval_name": null,
								"invalid_date": null,
								"valid_date": null
							}
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						},

					}).success(function(data, status, headers, config) {
						//console.log(data);
						if(data.code = "0000") {
							scope.EmsBmBudgetH = data;
						} else {

						}

					}).error(function(data, status, headers, config) {});

				}
				scope.budgetNodesData = function(budget_headers_id) {
					/*获取可操作列表*/
					$http({
						method: 'POST',
						url: feelapplyUrl + 'bm/EmsBmBudgetNode/queryBudgetNodes',
						data: {
							"query_param": {
								"budget_headers_id": budget_headers_id,
								"budget_node_name":null,
								"busi_org_name":null,
								"fee_type_name":null,
								"n_level":null,
							}
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						},

					}).success(function(data, status, headers, config) {
						//console.log(data);
						if(data.code = "0000") {
							scope.BudgetNodes = data;
						} else {

						}

					}).error(function(data, status, headers, config) {});

				}
				scope.$watch('budget_node_id',function(newValue) {
					//console.log(newValue);
					if(newValue){
						scope.budgetNodesData(newValue.budget_headers_id);
					}
				});
				scope.emsBudgetreeData();
			}
		}
	}]);
	return app;
});