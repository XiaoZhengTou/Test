define(['angular'], function(angular) {
	var app = angular.module('mdxingyonglist', []);
		app.controller('xingyongctrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, $filter, $mdDialog) {
			$scope.query = {
				order: 'name',
				limit: 10,
				page: 1,
				reason_desc: null,
				apply_name: null,
				begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
				end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
				order_status: null,
				fee_apply_code: null,
				credit_user_name:null,
				credit_id:null
			};
			//弹框
			$scope.showAdvanced = function(ev) {
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'templates/xingyongguanli/addxiugai.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
				})
					.then(function(answer) {
						$scope.status = 'You said the information was "' + answer + '".';
					}, function() {
						$scope.status = 'You cancelled the dialog.';
					});
			};
			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}

			$scope.loadData = function() {
				var param = {
					"page_number": $scope.query.page,
					"page_size": $scope.query.limit,
					'credit_user_name':$scope.query.credit_user_name,
					'credit_id':$scope.query.credit_id

				};
				$http({
					method: 'POST',
					url: APP_CONFIG.huisuanzhang + '/credit/ssCreditScore/listCredit',
					headers: {
						'x-auth-token':sessionStorage.Token
					},
					data: {
						page_number:1,
						page_size:10,
						query_param:{},
					}
				}).success(function(data, status, headers, config) {
					console.log(data);
					if(data.code == "0000") {
						$scope.xingyong = data;
						angular.forEach($scope.xingyong.data.datalist, function(item) {
							item.apply_date = new Date(item.apply_date);
						});
						$scope.query.limit = data.data.page_size;
						$scope.query.page = data.data.page_number;
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
							url:APP_CONFIG.huisuanzhang +'/manage/personal/holiday/delete',
							headers: {
								'x-auth-token': sessionStorage.Token
							},
							data: param
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
	angular._LoadModule('mdxingyonglist');
	return app;
});