define(['angular'], function(angular, org) {
	var app = angular.module('mdbusiorg', []);
	app.directive('ngBusiorg', ['$http', '$mdDialog', function($http, $mdDialog) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div ng-show="true"><md-input-container><label>预算组织主体</label>' +
				'<md-select ng-model="busiorgmain">' +
				'<md-option ng-repeat="state in busiorgmains.data.data.list" ng-value="state">{{state.busi_org_id}}</md-option>' +
				'</md-select></md-input-container><md-input-container>' +
				'<label>预算组织</label>' +
				'<md-select ng-model="busiorgchild">' +
				'<md-option ng-repeat="state in busiorgchilds.data.data.list" ng-value="state">{{state.budget_node_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				'unittree': '=',
				'unitnode': '='
			},
			link: function(scope, element, attrs) {
				scope.onBusiorgMain = function() {
					/*获取可操作列表*/
					$http({
						method: 'POST',
						url: APP_CONFIG.JIEBAO_URL + '/docker/busiorg/queryMain',
						data: {
							"page_number":1,
							"page_size":100
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}

					}).success(function(data, status, headers, config) {
						console.log(data);
						if(data.code = "0000") {
							scope.busiorgmains = data;
						} else {

						}

					}).error(function(data, status, headers, config) {});

				}
				scope.onBusiorgchild = function(parent_org_id) {
					/*获取可操作列表*/
					$http({
						method: 'POST',
						url: APP_CONFIG.JIEBAO_URL + '/docker/busiorg/queryChild',
						data: {
							"parent_org_id": parent_org_id,
							"page_number":1,
							"page_size":100
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}

					}).success(function(data, status, headers, config) {
						console.log(data);
						if(data.code = "0000") {
							scope.busiorgchilds = data;
						} else {

						}

					}).error(function(data, status, headers, config) {});

				}
				scope.$watch('busiorgmain',function(newValue) {
					console.log(newValue);
					if(newValue){
						scope.onBusiorgchild(newValue.busi_org_id);
					}
				});
				scope.onBusiorgMain();
			}
		}
	}]);
	return app;
});