define(['angular', "js/templates/baseSubjects/baseSubjects.js"], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var baseSubjects = angular.module('baseSubjects', []);
	baseSubjects.run(function($http) {

			$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
			$http.defaults.headers.common["Content-Type"] = "application/json";
		})
		.config(function($routeProvider, $locationProvider, $httpProvider) {
			$httpProvider.defaults.timeout = 5000;
			$routeProvider
				.when('/baseSubjects/baseSubjects', {
					templateUrl: 'templates/baseSubjects/baseSubjects.html'
				})
				.otherwise({
					redirectTo: '/baseSubjects/index'
				});
		})
		.controller('baseSubjectsCtrl', function($scope) {

			$scope.query = {
				type: 'BX',
				budgetCompany: 'BX',
				payCompany: 'BX',
				filter: {
					typeList: [{
						'id': 'BX',
						'name': '不限'
					}, {
						'id': 'OR11',
						'name': 'ORACLE 11i'
					}, {
						'id': 'OR12',
						'name': 'ORACLE R12'
					}, {
						'id': 'SAP',
						'name': 'SAP'
					}, {
						'id': 'YY6.0',
						'name': '用友 NC6.0'
					}, {
						'id': 'YY6.2',
						'name': '用友 NC6.2'
					}, {
						'id': 'JD',
						'name': '金蝶 EBS'
					}],
					budgetCompanyList: [{
						'id': 'BX',
						'name': '不限'
					}, {
						'id': 'MD',
						'name': '广东美的制冷设备有限公司'
					}],
					payCompany: [{
						'id': 'BX',
						'name': '不限'
					}, {
						'id': 'MD',
						'name': '广东美的制冷设备有限公司'
					}]

				}
			}

			$scope.selected = [];
			$scope.queryTable = {
				appdata: [{
					'type': '代付',
					'budgetCompany': '美的制冷设备有限公司',
					'payCompany': '可口可乐',
					'state': '启用',
					'creater': '张三',
					'createDate': '2016-7-2'
				}],
				limit: 5,
				page_number: 1,
				total: 25

			};

			$scope.goList = function() {
				$scope.go("baseSubjects/baseSubjects");
			}
		})
	angular._LoadModule('baseSubjects');
	return baseSubjects;
});