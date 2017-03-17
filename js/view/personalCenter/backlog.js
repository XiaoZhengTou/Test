define(['angular'], function(angular) {

	var backlog = angular.module('backlog', []);
	backlog.controller('backlogCtrl', function($scope, $rootScope, $http, $timeout) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/backlog', '首页');
		$scope.query = {
			page_size: 10,
			page_number: 1
		};
		$scope.myrunProcess = [];
		/*查询待办流程*/
		$scope.getmyrun = function() {
			$scope.query.page_number = 1;
			$scope.myrun = function() {
				$scope.myRunData = {
					'pageNumber': $scope.query.page_number,
					'docSubject': null,
					'model_id': '001',
					'pageSize': $scope.query.page_size,
					'fdCreatorUid': null,
					'template_form_id': null,
					'formInstanceId': null,
					'fdStatus': 20,
					'fdIsAssign': null,
				};
				$http({
					method: 'POST',
					url: feelapplyUrl + '/wf/pro/myrun',
					data: $scope.myRunData,
					headers: {
						'x-auth-token': sessionStorage.Token
					},

				}).success(function(data, status, headers, config) {
					console.log($scope.myRunData);
					console.log(data);
					if(data.code == "0000" && data.data && data.data.recordCount) {
						$scope.myrunProcess = data.data.data;
						$scope.myrunTotal = data.data.recordCount;
						console.log($scope.myrunProcess);
					} else {
						$scope.showAlert("", "提示", '异常:' + data.msg + "(" + data.code + ")", "关闭", "");
					}
				}).error(function(data, status, headers, config) {
					console.log('shibai');
				});
				$scope.promise = $timeout(function() {}, 2000);
			};
			$scope.myrun();
		};
		$scope.getmyrun();

		$scope.myworkProcess = [];
		/*我处理过的流程*/
		$scope.getmywork = function() {
			$scope.query.page_number = 1;
			$scope.mywork = function() {
				$scope.myWorkData = {
					"formInstanceId": null,
					"template_form_id": null,
					"model_id": "001",
					"pageNumber": $scope.query.page_number,
					"page_size": $scope.query.page_size,
					"creator": null,
					"docSubject": null,
					"fdStatus": null,
				};
				$http({
					method: 'POST',
					url: feelapplyUrl + '/wf/pro/mywork ',
					data: $scope.myWorkData,
					headers: {
						'x-auth-token': sessionStorage.Token
					},

				}).success(function(data, status, headers, config) {
					console.log($scope.myWorkData);
					console.log(data);
					if(data.code == "0000" && data.data && data.data.recordCount) {
						$scope.myworkProcess = data.data.data;
						console.log($scope.myworkProcess);
						$scope.myworkTotal = data.data.recordCount;
					} else {
						$scope.showAlert("", "提示", '异常:' + data.msg + "(" + data.code + ")", "关闭", "");
					}
				}).error(function(data, status, headers, config) {
					console.log('shibai');
				});
			};
			$scope.mywork();
		}

	});
});