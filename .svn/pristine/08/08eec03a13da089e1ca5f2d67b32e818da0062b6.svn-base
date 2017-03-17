define(['angular',"js/templates/correspondingRelation/relationList.js"], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var corresponding = angular.module('corresponding', []);
	corresponding.run(function($http) {

		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
		$http.defaults.headers.common["Content-Type"] = "application/json";
	})
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$httpProvider.defaults.timeout = 5000;
		$routeProvider
			.when('/correspondingRelation/relationList', {
				templateUrl: 'templates/correspondingRelation/relationList.html'
			})			
			.otherwise({
				redirectTo: '/correspondingRelation/index'
			});
	}).controller('correspondingCtrl', function($scope, baseconfig , $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog) {
	
		
		$scope.selected = [];
		$scope.queryTable = {
			appdata: [{
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1',
				'ERPCompanyNum': '123',
				'ERPCompanyName': '肯德基',
				'beizhu':'aaaa'
			}, {
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1',
				'ERPCompanyNum': '123',
				'ERPCompanyName': '肯德基',
				'beizhu':'aaaa'
			}, {
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1',
				'ERPCompanyNum': '123',
				'ERPCompanyName': '肯德基',
				'beizhu':'aaaa'
			}],
			limit: 5,
			page_number: 1,
			total: 25

		};
		
		$scope.goList = function(){
			$scope.go("correspondingRelation/relationList");
		}
	})
	angular._LoadModule('corresponding');
	return corresponding;
});
















