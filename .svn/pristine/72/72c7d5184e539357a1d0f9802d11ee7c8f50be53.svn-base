define(['angular', 'moment', 'momentCN', 'ngMoment', 'js/templates/feeSharing/home.js','js/templates/feeSharing/add.js','js/templates/feeSharing/organization.js'], function(angular) {
	
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('feeSharing.css');

	var app = angular.module('feeSharing', ['home','add','mdorganization']);

	app.run(function($http) {
			$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
		})
		.config(function($routeProvider, $locationProvider, $httpProvider) {
			$httpProvider.defaults.timeout = 5000;
			$routeProvider
				.when('/feeSharing/add/:obj', {
					templateUrl: 'templates/feeSharing/add.html'
				})
				.when('/feeSharing/see/:obj',{
					templateUrl: 'templates/feeSharing/see.html'
				})
				.when('/feeSharing/add_next',{
					templateUrl: 'templates/feeSharing/add_next.html'
				})
				.otherwise({
					redirectTo: '/feeSharing/index'
				});
		})
		.controller('fsCtrl', function($scope,$http,$timeout, moment, jhkPublic, $filter, publicmodel, $mdToast) {
			$scope.searchFilter = {};
			
		// 获取币种数据
		$scope.getData = function() {
			$scope.promise = $timeout(function() {}, 500);
			var getconfig = {
				method: 'get',
				//url: feelapplyUrl + ' /docker/currencies/queryAllBrief',
				url:'http://10.16.30.74:8081/jiebao-docker-web/docker/currencies/queryAllBrief',
				noLoader: true,
			};
			//getconfig.data.query_param.creation_date = moment(getconfig.data.query_param.creation_date).format('YYYY-MM-DD');
			$http(getconfig).success(function(response) {
				$scope.searchFilter.currency = response.data;
				console.log(response.data);
			}).error(function(response) {
				console.log('请求失败!') ;
			});
		};
		
		$scope.getData();
		// 取数据结束
		
		
			
			
		});

	angular._LoadModule('feeSharing');

	return app;

});