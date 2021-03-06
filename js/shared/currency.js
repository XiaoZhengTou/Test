/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {
	var app = angular.module('mdcurrency', []);
	//组织架构
	app.directive('drCurrency', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div><md-input-container style="width: 100%;"><label ng-hide="titlename">{{titlename}}</label><md-select ng-required="ngrequired" placeholder="货币类型" ng-model="currencymodel" ng-disabled="{{redisabled}}">' +
				'<md-option ng-value="item" ng-selected="oldcurrencycode==item.currency_code" ng-repeat="item in currencyitem.data">{{item.currency_name}}（{{item.currency_code}}）</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				/*绑定的数据*/
				'currencymodel': '=',
				'titlename': '@',
				'redisabled': '@',
				'oldcurrencycode': '@',
				'currencycodemodel': '=',
				'currencynamemodel': '=',
				'ngrequired': '='
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'GET',
						url: APP_CONFIG.JIEBAO_URL + '/docker/currencies/queryAllBrief',
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.currencyitem = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};
				$scope.$watch('currencymodel', function(data) {
					if(data) {
						console.log(data);
						$scope.currencycodemodel = data.currency_code;
						$scope.currencynamemodel = data.currency_name;
					}

				});
				$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				//console.log(212);
			}
		}
	}]);
	app.directive('drCurrencyext', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			'scope': {
				'currencylist': '='
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'GET',
						url: APP_CONFIG.JIEBAO_URL + '/docker/currencies/queryAllBrief',
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.currencylist = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};
				$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				//console.log(212);
			}
		}
	}]);
	return app;
});