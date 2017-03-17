define(['angular'], function(angular) {
	// Incluede Style In Project Begin
	publicFunction.addStyle('jiehuankuan.css');
	// Incluede Style In Project End
	var home = angular.module('home', ['angularMoment'])
	.filter('order_status', function($sce) {
            return function(status) {
                var htmlstatus = null;
                switch(status) {
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

        });
	home.controller('fsHomeCtrl', function($scope, $rootScope, $http, $filter, jhkPublic, moment, $timeout, $mdDialog,$mdToast) {
		// 重置模块面包屑
		$rootScope.crumbInit('/duigong/fukuan', '');
		// 筛选开始
		$scope.filter = {
			orderStates: [{
				'id': 'DRAFT',
				'name': '草稿'
			}, {
				'id': 'SUBMITED',
				'name': '待审批'
			}, {
				'id': 'AUDITED',
				'name': '已审批'
			}, {
				'id': 'DISABLED',
				'name': '已作废'
			}, {
				'id': 'REJECTED',
				'name': '驳回'
			}],
			orderType: [{
				'id': 'INTERNAL_COLLECTION',
				'name': '内部划收'
			}, {
				'id': 'ACCRUED',
				'name': '月度预提'
			}, {
				'id': 'APPORTION',
				'name': '费用分摊'
			}]
		};
		// 筛选结束
		// 查询参数

		$scope.query = {
			page_number: 1,
			page_size: 10,
			order_by:"-creation_date",
			order_rule:false,
			query_param: {
				reason_desc: null,
				lower_amount: null,
				higher_amount: null,
				apportion_code: null,
				order_status: null,
				currency_code: null,
				creation_date: null
			},
		};

		// 表格结束
		$scope.clearFilter = function() {
			$scope.query ={
				page_number: 1,
				page_size: $scope.query.page_size,
					query_param : {
					reason_desc: null,
					lower_amount: null,
					higher_amount: null,
					apportion_code: null,
					order_status: null,
					currency_code: null,
					creation_date: null
				}
			}
		}

		//取数据
		$scope.getData = function() {
			if ($scope.query.query_param.creation_date != null && $scope.query.query_param.creation_date != undefined) {
				$scope.query.query_param.creation_date = $filter('date')($scope.query.query_param.creation_date, "yyyy-MM-dd");
			}
			$scope.promise = $timeout(function() {}, 500);
			var getconfig = {
				method: 'post',
				url: feelapplyUrl + 'ca/EmsCaApportionH/pageLikeAsH',
				////url: 'http://10.73.37.39:8080/smart-expense-web/ca/EmsCaApportionH/pageLikeAsH',
				noLoader: true,
				data: {
					page_number: $scope.query.page_number,
					page_size: $scope.query.page_size,
					query_param: $scope.query.query_param,
					order_by:$scope.query.order_by.replace("-",""),
					order_rule:$scope.query.order_rule,
				}
			};
			//getconfig.data.query_param.creation_date = moment(getconfig.data.query_param.creation_date).format('YYYY-MM-DD');
			$http(getconfig).success(function(response) {
				$scope.data = response.data.info;
				$scope.total = response.data.totalRow;
				$scope.query.order_rule = !$scope.query.order_rule;
			}).error(function(response) {
				console.log('请求失败!') ;
			});
		};
		$scope.getData();
		//取数据结束

		//删除一条记录 start
		$scope.del = function(ev, apportion_id) {
				//弹出确认框
				var delById = function(apportion_id) {
					$http({
							method: 'delete',
							url: feelapplyUrl + 'ca/EmsCaApportionH/delete/' + apportion_id,
							//url:'http://10.73.37.59:8080/smart-expense-web/ca/EmsCaApportionH/delete/' + apportion_id

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
							    $scope.query.order_rule = !$scope.query.order_rule;
							    $scope.getData();
							} else {
								response.data.code;
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.body))
									.clickOutsideToClose(true)
									.title('提示信息')
									//.textContent('访问服务器异常：' + response.code + response.msg)
									.textContent(response.msg)
									.ariaLabel('提示信息')
									.ok('确定')
								);
							}
						}).error(function(data, status) {
							console.log(status);
						});

				}
				delById(apportion_id);
				/*var confirm = $mdDialog.confirm()
					.title('确定删除该数据吗?')
					.textContent('')
					.ariaLabel('删除确定框')
					.targetEvent(ev)
					.ok('确定')
					.cancel('取消');
				$mdDialog.show(confirm).then(function() {
					delById(apportion_id);
				}, function() {
					alert("cancel");
				});*/

				ev.stopPropagation();
			}
			//删除一条记录 end 

		//修改一条记录 start 

		$scope.edit = function(ev, apportion_id) {
			$http({
					method: 'get',
					url: feelapplyUrl + 'ca/EmsCaApportionH/get/' + apportion_id,

				})
				.success(function(response) {
					if (response.code == "0000") {
						$scope.data = response.data.emscaapportionh;
					} else {
						response.data.code;
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.body))
							.clickOutsideToClose(true)
							.title('提示信息')
							.textContent('访问服务器异常：' + response.code + response.msg)
							.ariaLabel('提示信息')
							.ok('确定')
						);
					}
				}).error(function() {
					console.log("shibai");
				});

		}

		//修改一条记录 eNd

	}).config(function($mdDateLocaleProvider) {
		$mdDateLocaleProvider.months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
		$mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
		$mdDateLocaleProvider.days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		$mdDateLocaleProvider.shortDays = ['日', '一', '二', '三', '四', '五', '六'];
		$mdDateLocaleProvider.firstDayOfWeek = 0;
	});
})