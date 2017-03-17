/**
 * Created by chao on 2016/9/8
 */
define(['angular'], function(angular) {
	var app = angular.module('mdreceivable', []);
	//应收活动类型
	app.directive('drReceivable', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div><md-input-container style="width: 100%;margin:18px;"><label ng-hide="titlename">{{titlename}}</label><md-select ng-required="ngrequired" placeholder="{{titlename}}" ng-model="remodel" ng-disabled="{{redisabled}}">' +
				'<md-option ng-value="item"  ng-repeat="item in dataitem.data.info">{{item.receivables_trx_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				/*绑定的数据*/
				'remodel': '=',
				'titlename': '@',
				'redisabled':'@',
				'ngrequired':'=',
				'companyid': '@'
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					$http({
						method: 'post',
						url: 'http://10.16.30.74:8081/jiebao-docker-web/docker/receivables/select',
						data:{
							page_number:1,
							page_size:1000,
							company_id:$scope.companyid,
							receivables_trx_name:null,
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						},
					}).success(function(data, status, headers, config) {
						console.log(data);
						$scope.dataitem = data;
					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				};
				$scope.$watch('remodel', function(data) {
					if(data) {
						console.log(data);
						
					}

				});
				$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				//console.log(212);
				angular.element(element[0]).bind('click',function(){
					scope.loaditem();
				});
			}
		}
	}]);
	return app;
});