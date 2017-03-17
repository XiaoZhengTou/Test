define(['angular'], function(angular) {

	var home = angular.module('home', [])
		.filter('order_status', function($sce) {
			return function(status) {
				var htmlstatus = null;
				switch (status) {
					case 'DRAFT':
						htmlstatus = '<span style="color:#fff;background:gray;padding: 3px;border-radius: 3px;">草稿</span>';
						break;
					case 'SUBMITED':
						htmlstatus = '<span style="color:#fff;background:green;padding: 3px;border-radius: 3px;">待审批</span>';
						break;
					case 'AUDITED':
						htmlstatus = '<span style="color:#fff;background:dodgerblue;padding: 3px;border-radius: 3px;">已审批</span>';
						break;
					case 'DISABLED':
						htmlstatus = '<span style="color:#fff;background:orange;padding: 3px;border-radius: 3px;">已作废</span>';
						break;
					default:
						htmlstatus = '<span style="color:#fff;background:palegreen;padding: 3px;border-radius: 3px;">未知状态</span>';
						break;
				}
				return $sce.trustAsHtml(htmlstatus);
			}

		})
		.filter('to_date',function(){
			return function(str){
				return new Date(str);
			}
		});
	home.controller('wsHomeCtrl', function($scope, $rootScope, $http, $filter, $timeout, $mdDialog, $mdToast, $routeParams) {
		
		// 重置模块面包屑
		$rootScope.crumbInit('/tasks/worksheet', '');
		// 查询参数
		$scope.query = {
			page_number: 1,
			page_size: 10,
			query_param: {
				amount_btm: null, //	金额下限
				amount_top: null, //	金额上限
				apply_date: null, //	申请日期
				company_id: null, //	入账单位ID
				order_code: null, //	工单号
				order_type: null, //
			},
		};

		//清空查询
		$scope.clearFilter = function() {
			$scope.query = {
				page_number: 1,
				page_size: $scope.query.page_size,
				query_param: {
					amount_btm: null, //	金额下限
					amount_top: null, //	金额上限
					apply_date: null, //	申请日期
					company_id: null, //	入账单位ID
					order_code: null, //	工单号
					order_type: null, //
				}
			};
			$scope.ruzhangdanwei = {};
		};

		//入账单位
		$scope.ruzhangdanwei = {};

		//取数据
		$scope.getData = function() {
			if ($scope.query.query_param.apply_date != null && $scope.query.query_param.apply_date != undefined) {
				$scope.query.query_param.apply_date = $filter('date')($scope.query.query_param.apply_date, "yyyy-MM-dd");
			}
			$scope.query.query_param.company_id = $scope.ruzhangdanwei.company_id;
			$scope.promise = $timeout(function() {}, 500);
			var getconfig = {
				method: 'post',
				url: tasksUrl + '/center/manual/SsManualOrderH/pageQuery',
				noLoader: true,
				data: $scope.query,
			};
			$http(getconfig).success(function(response) {

				if (response.code == "0000") {
					$scope.data = response.data.info;
					$scope.total = response.data.totalRow;
				} else {
					response.data.code;
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.body))
						.clickOutsideToClose(true)
						.title('提示信息')
						.textContent('访问服务器异常：' + response.code + response.msg)
						//.textContent(response.msg)
						.ariaLabel('提示信息')
						.ok('确定')
					);
				}
			}).error(function(response) {
				console.log('请求失败!') ;
			});
		};
		$scope.getData();
		//取数据结束

		//删除一条数据开始
		$scope.del = function(e, order_id) {
				var delById = function(order_id) {
					$http({
							method: 'delete',
							url: tasksUrl + '/center/manual/SsManualOrderH/delete/' + order_id,

						})
						.success(function(response) {
							if (response.code == "0000") {
								$mdToast.show(
									$mdToast.simple()
									.textContent('删除成功!')
									.position('top right')
									.hideDelay(3000)
								);
								//刷新页面
								$scope.getData();
							} else {
								response.data.code;
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.body))
									.clickOutsideToClose(true)
									.title('提示信息')
									.textContent('访问服务器异常：' + response.code + response.msg)
									//.textContent(response.msg)
									.ariaLabel('提示信息')
									.ok('确定')
								);
							}
						}).error(function(data, status) {
							console.log(status);
						});
				}

				//确定弹出框
				var confirm = $mdDialog.confirm()
					.title('确定删除该数据吗?')
					.textContent('')
					.ariaLabel('删除确定框')
					.targetEvent(e)
					.ok('确定')
					.cancel('取消');

				$mdDialog.show(confirm).then(function() {
					delById(order_id);
				}, function() {
					alert("cancel");
				});

			}
			//删除一条数据结束

	});

	home.controller('wsSeeCtrl', function($scope,$rootScope,$http,$timeout,$filter,$routeParams,$mdDialog) {
		//查看一条数据开始
		var id = $routeParams.obj;
		if (id != undefined && id != null) {
			findById(id);
		}
		function findById(id) {
			$http({
					method: 'get',
					url: tasksUrl + '/center/manual/SsManualFeeInvoiceH/getOfAll/' + id,

				})
				.success(function(response) {
					if (response.code == "0000") {
						$scope.detailData = response.data;
						console.log(response.data)
					} else {
						response.data.code;
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.body))
							.clickOutsideToClose(true)
							.title('提示信息')
							.textContent('访问服务器异常：' + response.code + response.msg)
							//.textContent(response.msg)
							.ariaLabel('提示信息')
							.ok('确定')
						);
					}
				}).error(function(data, status) {
					console.log(status);
				});
		}
		//查看一条数据结束
		
		//查看细节
	});
});