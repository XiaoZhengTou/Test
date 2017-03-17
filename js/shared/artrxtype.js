/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {
	var app = angular.module('mdartrxtype', []);
	//组织架构
	app.directive('drArtrxtype', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div><md-input-container style="width: 100%;"><label ng-hide="titlename">{{titlename}}</label><md-select ng-required="ngrequired" placeholder="{{titlename}}" ng-model="remodel" >' +
				'<md-option ng-value="item"  ng-selected="itemvalue==item.trx_type_id" ng-repeat="item in artrxtypeitem.data.info">{{item.trx_type_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				/*绑定的数据*/
				'remodel': '=',
				'titlename': '@',
				'itemvalue':'@',
				'custtrxtypemodel': '=',
				'custtrxtypeidmodel': '=',
				'custtrxtypenamemodel': '=',
				'ouidmodel': '=',
				'ngrequired':'='
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'post',
						url: APP_CONFIG.JIEBAO_URL + '/docker/artrxtype/pageLike',
						data:{
							page_number:1,
							page_size:1000
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.artrxtypeitem = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};
				$scope.$watch('remodel', function(data) {
					if(data) {
						console.log(data);
						$scope.custtrxtypemodel = data.type;
						$scope.custtrxtypeidmodel = data.trx_type_id;
						$scope.custtrxtypenamemodel = data.trx_type_name;
						$scope.ouidmodel = data.ou_id;
						
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