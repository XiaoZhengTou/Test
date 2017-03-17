/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function(angular) {
	var app = angular.module('mdsubject', []);
	//组织架构
	app.directive('drSubject', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<md-input-container class="md-block"><label>{{titlename}}</label><md-select ng-required="ngrequired" placeholder="{{titlename}}" ng-model="submodel" ng-disabled="{{redisabled}}">' +
				'<md-option ng-value="item" ng-selected="itemvalue == item.flex_value" ng-repeat="item in subitem.data.info">{{item.flex_name}}</md-option>' +
				'</md-select></md-input-container>',
			'scope': {
				'submodel': '=',
				/*传入的字典种类码*/
				'titlename': '@',
				'itemvalue':'@',
				'redisabled':'@',
				'ngrequired':'@',
				'proxyuser':"@",
				'ssaccounttype':"@",
				'flexnamemodel':'=',
				'flexvaluemodel':'='
				
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'post',
						//url: APP_CONFIG.CDP_URL + '/docker/dictitem/getItemsByCode?code=' + $scope.code,
						url: 'http://10.73.46.41:8080/smart-accounting-web/invoice/SsIoErpProxyUser/pageQueryFlexName',
						data:{
							query_param:{
								 proxy_user:$scope.proxyuser,//	ERP实例（必输）	string	
    							 ss_account_type:$scope.ssaccounttype//	科目段类型（必选）
							}
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.subitem = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
				$scope.$watch('submodel', function(data) {
					if(data) {
						console.log(data);
						$scope.flexnamemodel = data.flex_name;
						$scope.flexvaluemodel = data.flex_value;
						
						
					}

				});
				$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				//console.log(212);
//				angular.element(element[0]).bind('click',function(){
//					scope.loaditem();
//				});
				
			}
		}
	}]);
	return app;
});