define(['angular', 'js/templates/tasks/tasksList.js'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var tasks = angular.module('tasks', []);
	tasks.run(function($http) {
			$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
			$http.defaults.headers.common["Content-Type"] = "application/json";
		})
		.config(function($routeProvider, $locationProvider, $httpProvider) {
			$httpProvider.defaults.timeout = 5000;
			$routeProvider
				.when('/tasks/tasksList', {
					templateUrl: 'templates/tasks/tasksList.html'
				})
				.otherwise({
					redirectTo: '/tasks/index'
				});
		}).controller('tasksCtrl', function($scope, baseconfig, $log, $mdDialog, $mdMedia, $http, $cookies, $filter, $mdToast, $location, $timeout, $mdEditDialog, myTasks) {
			var baseUrl1 = APP_CONFIG.huisuanzhang + 'task/SsTmTaskPool/pageMyTaskQuery';
			var baseUrl2 = APP_CONFIG.huisuanzhang + 'task/SsTmTaskPool/pageTaskGroupDispatchQuery';
			$scope.goList = function() {
				$scope.go("tasks/tasksList");
			}

			/*提取任务-start*/
			$scope.query = {
				code: "",
			}
			$scope.taken = function() {

				}
				/*提取任务-end*/

			/*当前待办任务-start*/
			$scope.current = {
				billCode: '',
				billDesc: '',
				emergentLevelState: '',
				startAmount: '',
				endAmount: '',
				currency: '',
				filter: {
					emergentLevel: [{
						'id': 'JJ',
						'name': '紧急'
					}, {
						'id': 'YB',
						'name': '一般'
					}],
					currencys: baseconfig.currencys
				},
				appdata: [],
				limit: 5,
				page_number: 1,
				total: ''
			}
			$scope.getCurrent = function() {
				$scope.current.billCode = '';
				$scope.current.billDesc = '';
				$scope.current.emergentLevelState = '';
				$scope.current.startAmount = '';
				$scope.current.endAmount = '';
				$scope.current.currency = '';
				$scope.current.page_number = '1';
				getapp1();
			}

			$scope.current_selected = [];
			$scope.current_getDesserts = function() {
				getapp1();
				$scope.current_promise = $timeout(function() {

				}, 1000);
			};

			//搜索
			$scope.searchCurrentTasks = function() {

				if($scope.current.limit != undefined) {
					$scope.current.page_number = '1';
					getapp1();
				}
			};

			getapp1();

			function getapp1() {
				var param = {
					page_number: parseInt($scope.current.page_number),
					page_size: parseInt($scope.current.limit),
					query_param: {
						flag_code: '',
						bill_code: $scope.current.billCode == '' ? undefined : $scope.current.billCode,
						bill_desc: $scope.current.billDesc == '' ? undefined : $scope.current.billDesc,
						emergent_level: $scope.current.emergentLevelState == '' ? undefined : $scope.current.emergentLevelState,
						start_amount: $scope.current.startAmount == '' ? undefined : $scope.current.startAmount,
						end_amount: $scope.current.endAmount == '' ? undefined : $scope.current.endAmount,
						currency_code: $scope.current.currency == '' ? undefined : $scope.current.currency,
					}
				}
				myTasks.callItunes(param, baseUrl1).then(function(resp) {
					console.log(resp);
					if(resp.code == '0000') {

						$scope.current.appdata = resp.data.info;
						$scope.current.total = resp.data.totalRow;
						$scope.current.limit = resp.data.pageSize;
						$scope.current.page_number = resp.data.pageNumber;

					}
				})
			}
			/*当前代办任务-end*/

			/*本月已办任务-start*/
			$scope.complete = {
				billCode: '',
				billDesc: '',
				emergentLevelState: '',
				startAmount: '',
				endAmount: '',
				currency: '',
				filter: {
					emergentLevel: [{
						'id': 'JJ',
						'name': '紧急'
					}, {
						'id': 'YB',
						'name': '一般'
					}],
					currencys: baseconfig.currencys
				},
				appdata: [],
				limit: 5,
				page_number: 1,
				total: ''
			}

			$scope.getComplete = function() {
				$scope.complete.billCode = '';
				$scope.complete.billDesc = '';
				$scope.complete.emergentLevelState = '';
				$scope.complete.startAmount = '';
				$scope.complete.endAmount = '';
				$scope.complete.currency = '';
				$scope.complete.page_number = '1';
				getapp2();
			}

			$scope.complete_selected = [];
			$scope.complete_getDesserts = function() {
				getapp2();
				$scope.complete_promise = $timeout(function() {

				}, 1000);
			};

			//搜索
			$scope.searchCompleteTasks = function() {

				if($scope.complete.limit != undefined) {
					$scope.complete.page_number = '1';
					getapp2();
				}
			};

			function getapp2() {
				var param = {
					page_number: parseInt($scope.complete.page_number),
					page_size: parseInt($scope.complete.limit),
					query_param: {
						flag_code: '',
						bill_code: $scope.complete.billCode == '' ? undefined : $scope.complete.billCode,
						bill_desc: $scope.complete.billDesc == '' ? undefined : $scope.complete.billDesc,
						emergent_level: $scope.complete.emergentLevelState == '' ? undefined : $scope.complete.emergentLevelState,
						start_amount: $scope.complete.startAmount == '' ? undefined : $scope.complete.startAmount,
						end_amount: $scope.complete.endAmount == '' ? undefined : $scope.complete.endAmount,
						currency_code: $scope.complete.currency == '' ? undefined : $scope.complete.currency,
					}
				}
				myTasks.callItunes(param, baseUrl1).then(function(resp) {
					console.log(resp);
					if(resp.code == '0000') {

						$scope.complete.appdata = resp.data.info;
						$scope.complete.total = resp.data.totalRow;
						$scope.complete.limit = resp.data.pageSize;
						$scope.complete.page_number = resp.data.pageNumber;

					}
				})
			}

			/*本月已办任务-end*/

			/*挂起任务-start*/
			$scope.suspend = {
				billCode: '',
				billDesc: '',
				emergentLevelState: '',
				startAmount: '',
				endAmount: '',
				currency: '',
				filter: {
					emergentLevel: [{
						'id': 'JJ',
						'name': '紧急'
					}, {
						'id': 'YB',
						'name': '一般'
					}],
					currencys: baseconfig.currencys
				},
				appdata: [],
				limit: 5,
				page_number: 1,
				total: ''
			}
			$scope.getSuspend = function() {
				$scope.suspend.billCode = '';
				$scope.suspend.billDesc = '';
				$scope.suspend.emergentLevelState = '';
				$scope.suspend.startAmount = '';
				$scope.suspend.endAmount = '';
				$scope.suspend.currency = '';
				$scope.suspend.page_number = '1';
				getapp3();
			}

			$scope.suspend_selected = [];
			$scope.suspend_getDesserts = function() {
				getapp3();
				$scope.suspend_promise = $timeout(function() {

				}, 1000);
			};

			//搜索
			$scope.searchSuspendTasks = function() {

				if($scope.suspend.limit != undefined) {
					$scope.suspend.page_number = '1';
					getapp3();
				}
			};

			function getapp3() {
				var param = {
					page_number: parseInt($scope.suspend.page_number),
					page_size: parseInt($scope.suspend.limit),
					query_param: {
						flag_code: '',
						bill_code: $scope.suspend.billCode == '' ? undefined : $scope.suspend.billCode,
						bill_desc: $scope.suspend.billDesc == '' ? undefined : $scope.suspend.billDesc,
						emergent_level: $scope.suspend.emergentLevelState == '' ? undefined : $scope.suspend.emergentLevelState,
						start_amount: $scope.suspend.startAmount == '' ? undefined : $scope.suspend.startAmount,
						end_amount: $scope.suspend.endAmount == '' ? undefined : $scope.suspend.endAmount,
						currency_code: $scope.suspend.currency == '' ? undefined : $scope.suspend.currency,
					}
				}
				myTasks.callItunes(param, baseUrl1).then(function(resp) {
					console.log(resp);
					if(resp.code == '0000') {

						$scope.suspend.appdata = resp.data.info;
						$scope.suspend.total = resp.data.totalRow;
						$scope.suspend.limit = resp.data.pageSize;
						$scope.suspend.page_number = resp.data.pageNumber;

					}
				})
			}

			/*挂起任务-end*/

			/*组内待派单任务-start*/
			$scope.assigned = {
				appdata: [],
				limit: 5,
				page_number: 1,
				total: ''
			};

			$scope.assigned_selected = [];
			$scope.assigned_getDesserts = function() {
				getapp4();
				$scope.assigned_promise = $timeout(function() {

				}, 1000);
			};

			getapp4()
			function getapp4() {
				var param = {
					page_number: parseInt($scope.assigned.page_number),
					page_size: parseInt($scope.assigned.limit),
					query_param: {}
				}
				myTasks.callItunes(param, baseUrl1).then(function(resp) {
					console.log(resp);
					if(resp.code == '0000') {

						$scope.assigned.appdata = resp.data.info;
						$scope.assigned.total = resp.data.totalRow;
						$scope.assigned.limit = resp.data.pageSize;
						$scope.assigned.page_number = resp.data.pageNumber;

					}
				})
			}
			/*组内待派单任务-end*/
		})		
		.factory('myTasks', function($http, $q) {
			var service = {};
			service.callItunes = function(data, baseUrl) {
				var deferred = $q.defer();
				$http({
					method: 'POST',
					url: baseUrl,
					data: data
				}).success(function(resp) {
					deferred.resolve(resp);
				})
				return deferred.promise;
			}
			return service;
		})
	angular._LoadModule('tasks');
	return tasks;
});