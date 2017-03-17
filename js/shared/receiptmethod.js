/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {
	var app = angular.module('mdreceiptmethod', []);
	//组织架构
	app.directive('drReceiptmethode', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div><md-input-container style="width: 100%;"><label>{{titlename}}</label><md-select ng-required="ngrequired" placeholder="{{titlename}}" ng-model="remodel" >' +
				'<md-option ng-value="item"  ng-selected="itemvalue==item.receipt_method_id" ng-repeat="item in receiptitem.data">{{item.method_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				/*绑定的数据*/
				'remodel': '=',
				'titlename': '@',
				'itemvalue':'@',
				'receiptmethodid': '=',
				'receiptmethodname': '=',
				'ngrequired':'='
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'get',
						url: APP_CONFIG.JIEBAO_URL + '/docker/receiptmethod/queryAll',
						headers: {
							'x-auth-token': sessionStorage.Token
						},
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.receiptitem = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};
				$scope.$watch('remodel', function(data) {
					if(data) {
						console.log(data);
						$scope.receiptmethodid = data.receipt_method_id;
						$scope.receiptmethodname = data.method_name;
				
						
					}

				});
				$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				//console.log(212);
			}
		}
	}]);
	return app;
});