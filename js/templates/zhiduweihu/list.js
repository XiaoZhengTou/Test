define(['angular'], function(angular) {
	var app = angular.module('mdzhidulist', [])
		.controller('zhiduweihuctrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, $filter, $mdDialog) {
			$scope.query = {
				doc_summary:null,
				doc_title:null,
				doc_type:null,
				end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
				publisher:null,
				start_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
				status:null,
				page:5,
				limit:10
			};
			$scope.loadData = function() {
				var param = {
					"pageNumber": $scope.query.page,
					"pageSize": $scope.query.limit,
					"query_param": {
						'doc_summary':$scope.query.doc_summary,
						'doc_title':$scope.query.doc_title,
						'doc_type':$scope.query.doc_type,
						'end_date':null,
						'publisher':$scope.query.publisher,
						'start_date':$filter('date')($scope.query.start_date, 'yyyy-MM-dd'),
						'status':$scope.query.status
					}
				};
				$http({
					method: 'POST',
					url: APP_CONFIG.huisuanzhang + '/manage/doc/pageQuery',
					headers: {
						'x-auth-token': sessionStorage.Token
					},
					data: {
						"query_param": {
							'doc_summary':null,
							'doc_title':null,
							'doc_type':$scope.query.doc_type,
							'end_date':null,
							'publisher':$scope.query.publisher,
							'start_date':null,
							'status':$scope.query.status
						}
					}
				}).success(function(data, status, headers, config) {
					console.log(data);
					if(data.code == "0000") {
						$scope.zhidulist = data;
						angular.forEach($scope.zhidulist.data.datalist, function(item) {
							item.apply_date = new Date(item.apply_date);
						});
						$scope.query.limit = data.data.pageSize;
						$scope.query.page = data.data.pageNumber;
					} else {
						$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
							.textContent('异常:' + data.msg + "(" + data.code + ")"));
					}

				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			}
			$scope.loadData();

			$scope.selected = [];

			$scope.onDelete = function(ev) {
				var confirm=$mdDialog.confirm().title('删除确认').textContent('确定删除此条数据？').ariaLabel('删除').targetEvent(ev).ok('删除').cancel('取消');
				$mdDialog.show(confirm).then(function() {
					console.log(confirm);
					console.log($scope.selected);
					var ids = [];
					for(var i in $scope.selected) {
						console.log($scope.selected[i].fee_apply_id);
						ids.push($scope.selected[i].fee_apply_id);
					}
					if(ids.length > 0) {
						$http({
							method: 'POST',
							url:  APP_CONFIG.huisuanzhang + '/credit/ssCreditScore/listCredit',
							data: {
								"tenant_id": null,
								"user_id": null,
								"fee_apply_ids": ids
							}
						}).success(function(data, status, headers, config) {
							console.log(data);
							if(data.code == "0000") {
								$scope.loadData();
							} else {
								$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
									.textContent('异常:' + data.msg + "(" + data.code + ")"));
							}
						}).error(function(data, status, headers, config) {
							console.log(data);
						});
					} else {
						$mdDialog.show($mdDialog.alert().title('提示').ok('确定')
							.textContent('请至少选择一条数据'));
					}
				}, function() {
					$scope.status = 'You decided to keep your debt.';
				});
			}

			function success(desserts) {
				console.log('success');
				$scope.desserts = desserts;
			}

			$scope.getDesserts = function() {
				console.log($scope.query);
				$scope.loadData();
				//$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
			};

		}]);
	angular._LoadModule('mdzhidulist');
	return app;
});