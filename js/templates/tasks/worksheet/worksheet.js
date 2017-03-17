define(['angular','js/templates/tasks/worksheet/index.js','js/templates/tasks/worksheet/add.js','js/templates/tasks/worksheet/addAll.js','js/shared/ruzhangdanwei.js'],function(angular){
	
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('feeSharing.css');
	
	var app = angular.module('worksheet',['home','add','addAll','md.ruzhangdanwei']);
	
	app.run(function($http){
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	})
	.config(function($routeProvider, $locationProvider, $httpProvider) {
			$httpProvider.defaults.timeout = 5000;
			$routeProvider
				.when('/tasks/worksheet/add_ap', {
					templateUrl: 'templates/tasks/worksheet/add_ap.html'
				})
				.when('/tasks/worksheet/add_ar', {
					templateUrl: 'templates/tasks/worksheet/add_ar.html'
				})
				.when('/tasks/worksheet/add_ars', {
					templateUrl: 'templates/tasks/worksheet/add_ars.html'
				})
				.when('/tasks/worksheet/add_gl', {
					templateUrl: 'templates/tasks/worksheet/add_gl.html'
				})
				.when('/tasks/worksheet/see/:obj', {
					templateUrl: 'templates/tasks/worksheet/see.html'
				})
				.when('/tasks/worksheet/add_all', {
					templateUrl: 'templates/tasks/worksheet/add_all.html'
				})
				.otherwise({
					redirectTo: '/tasks/worksheet'
				});
		}).controller('wsCtrl',function($scope){
			$scope.ordertype = [
				{
					id: 'AP',
					name: 'AP应付发票'
				},
				{
					id: 'AR',
					name: 'AR应收收款'
				},
				{
					id: 'AR_INV',
					name: 'AR应收发票'
				},
				{
					id: 'GL',
					name: 'GL日记账'
				},
				{
					id: 'ALL',
					name: '综合工单'
				}
			]
		});
		
		
	angular._LoadModule('worksheet');

	return app;
	
	
});
