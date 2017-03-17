/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {
	var app = angular.module('mddictitem', []);
	//组织架构
	app.directive('drDictitem', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			priority: 100,
			template: '<md-input-container class="md-block"><label>{{titlename}}</label><md-select ng-required="ngrequired" placeholder="{{titlename}}" ng-model="dictmodel" ng-disabled="{{redisabled}}">' +
				'<md-option ng-value="item" ng-selected="item.itemValue==itemvalue" ng-repeat="item in dictitem.data">{{item.itemName}}</md-option>' +
				'</md-select></md-input-container>',
			'scope': {
				/*返回的整体对像*/
				'dictmodel': '=',
				/*传入的字典种类码*/
				'code': '@',
				'titlename': '@',
				/*当前选择的值*/
				'itemvalue': '@',
				/*控件是否可用*/
				'redisabled': '@',
				'itemnamemodel': '=',
				'itemvaluemodel': '=',
				/*控件不能为空*/
				'ngrequired': '='

			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'GET',
						url: APP_CONFIG.CDP_URL + '/docker/dictitem/getItemsByCode?code=' + $scope.code,
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.dictitem = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
				$scope.$watch('dictmodel', function(data) {
					if(data) {
						console.log(data);
						$scope.itemnamemodel = data.itemName;
						$scope.itemvaluemodel = data.itemValue;
					}

				});
				$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				//console.log(212);
			}
		}
	}]);
	app.directive('drDictitemext', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			priority: 100,
			scope: {
				/*传入的字典种类码*/
				'diccode': '=',
				'diclist':'='
			},
			link: function(scope, element, attrs) {
				scope.loaddicdata=function() {
					console.log('3333333');
					$http({
						method: 'GET',
						url: APP_CONFIG.CDP_URL + '/docker/dictitem/getItemsByCode?code=' + scope.diccode,
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						scope.diclist = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
				scope.loaddicdata();
			}
		}
	}]);
	return app;
});