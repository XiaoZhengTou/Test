define(['angular',
	'js/templates/feeapply/list',
	'js/shared/organization',
	'js/templates/feeapply/addfeeapply',
	'js/templates/feeapply/BudgetUnitDirective',
	'js/templates/feeapply/busiorgDirective',
	'js/shared/ruzhangdanwei',
	'js/shared/receving',
	'js/shared/dictitem',
	'js/shared/currency',
	'js/shared/vendor',
	'js/shared/budget',
	'js/shared/budgetpart',
	'js/shared/choosecitys',
	'js/templates/process/process'
], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('mdfeeapply', ['mdfeeapplylist',
			'mdaddfeeapply',
			'mdorganization',
			'mdbudgetunit',
			'mdbusiorg',
			'md.ruzhangdanwei',
			'md.receving',
			'mddictitem',
			'mdcurrency',
			'mdvendor',
			'mdbudget',
			'mdbudgetpart',
			'muchoosecitys',
			'mdprocess'
		])
		.config(function($routeProvider) {
			$routeProvider.when('/feeapply/richang', {
				templateUrl: 'templates/feeapply/addrichang.html'
			}).when('/feeapply/chalv', {
				templateUrl: 'templates/feeapply/addchalv.html'
			}).when('/feeapply/addfeeapply', {
				templateUrl: 'templates/feeapply/addfeeapply.html'
			}).when('/feeapply/applyProcess', {
				templateUrl: 'templates/feeapply/applyProcess.html'
			}).otherwise({
				redirectTo: '/feeapply/home' //angular就喜欢斜杠开头
			});
		});
	app.directive('drApplyprocessstatus', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<span style="color: white;border-radius: 3px;background: {{statuscolor}};padding: 2px;">{{statusName}}</span>',
			'scope': {
				'statuscode': '='
			},
			controller: function($scope) {
				$scope.statuslist = null;
				if($scope.statuslist) {
					console.log("C_ALL_ORDER_STATUS存在");
				} else {
					console.log("C_ALL_ORDER_STATUS不存在");
					$http({
						method: 'GET',
						url: APP_CONFIG.CDP_URL + '/docker/dictitem/getItemsByCode?code=C_ALL_ORDER_STATUS',
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(data, status, headers, config) {
						console.log('C_ALL_ORDER_STATUS');
						console.log(data);
					}).error(function(data, status, headers, config) {
						console.log('shibai');
					});
				}
				$scope.$watch('',function(newValue,oldValue){
					
				});
				$scope.statusName = "草稿";
				$scope.statuscolor = "gray";
				switch($scope.statuscode) {
					case 'DRAFT':
						$scope.statusName = "草稿";
						$scope.statuscolor = "gray";
						break;
					case 'SUBMITED':
						$scope.statusName = "green";
						$scope.statuscolor = "待审批";
						break;
					case 'AUDITED':
						$scope.statusName = "orange";
						$scope.statuscolor = "dodgerblue";
						break;
					case 'DISABLED':
						$scope.statusName = "已作废";
						$scope.statuscolor = "orange";
						break;
					default:
						$scope.statusName = "草稿";
						$scope.statuscolor = "gray";
						break;
				}
			},
			link: function(scope, element, attrs) {}
		}
	}]);
	angular._LoadModule('mdfeeapply');
	return app;
});