define(['angular'], function(angular) {

	var defaultDept = angular.module('defaultDept', []);
	defaultDept.controller('defaultDeptCtrl', function($scope, $rootScope, $timeout, $http, $mdDialog) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/defaultDept', '首页');
		$scope.selected = []; //表格组件必填
		$scope.is_default = true;
		$scope.query = {
			page_number: 1,
			page_size: 10,
			order_by: 'busi_org_code', //根据部门编码排序
			query_param: {
				busi_org_code: null, //预算部门编码
				busi_org_name: null, //预算部门名称   
			}
		};
		/************点击设为默认或者取消默认***********/
		$scope.is_defaultClick = function(index) {
				$scope.selecedindex = index;
				if ($scope.is_default) {
					$scope.is_default = false;
				} else {
					$scope.is_default = true;
				}
				$scope.busi_org_name = $scope.viewData.data.info[$scope.selecedindex].busi_org_name;
				$scope.busi_org_id = $scope.viewData.data.info[$scope.selecedindex].busi_org_id;
				$scope.setDefault();
				setTimeout(function(){
					$scope.getDefault();
				},50);
				

			}
			/*============== set 默认预算部门==================*/
		$scope.setDefault = function() {
			var getconfig = {
				method: 'POST',
				url: 'http://10.16.30.74:8080/smart-expense-web/cm/userCenter/saveDefaultConfig',
				data: [{
					"busiOrg": {
						"busi_org_id": $scope.busi_org_id,
						"busi_org_name": $scope.busi_org_name,
						"config_type": "busiOrg",
						"is_default": "Y"
					}
				}]
			}
			$http(getconfig).success(function(response) {
				if (response.data && response.code == '0000') {
                       $scope.view=response;
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
						.textContent('' + response.msg + "(" + response.code + ")"));
				}
			}).error(function(response) {
				console.log('请求失败!');
			});
		};
		/* ======setDefault()结束======*/
		/*============== get 默认预算部门===============*/
		$scope.getDefault = function() {
			var getconfig = {
				method: 'GET',
				url: 'http://10.16.30.74:8080/smart-expense-web/cm/userCenter/getDefaultConfig',
				data: {
					"is_default": 'Y'
				}
			}
			$http(getconfig).success(function(response) {
				if (response.data && response.code == '0000') {
					$scope.views = response;
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
						.textContent('' + response.msg + "(" + response.code + ")"));
				}
			}).error(function(response) {
				console.log('请求失败!');
			});
		};
		$scope.getDefault();

		/*---------------------清除条件---------------------*/
		$scope.clearFilter = function() {
			$scope.query = {
				page_number: 1,
				page_size: 10,
				query_param: {
					busi_org_code: null, //预算部门编码
					busi_org_name: null //预算部门名称
				}
			}
			$scope.getData(); //清除查询条件后重新请求数据
		}

		/*===========* 请求接口,获取数据===============*/
		$scope.getData = function() {
			$scope.promise = $timeout(function() {}, 500);
			var getconfig = {
				method: 'POST',
				url: 'http://10.16.30.74:8081/jiebao-docker-web/docker/busiorg/yz/select',
				data: {
					page_number: $scope.query.page_number,
					page_size: $scope.query.page_size,
					busi_org_code: null,
					busi_org_name: $scope.query.query_param.busi_org_name

				}
			}
			$http(getconfig).success(function(response) {
				if (response.data && response.code == '0000') {
					$scope.viewData = response;

				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
						.textContent('' + response.msg + "(" + response.code + ")"));
				}
			}).error(function(response) {
				console.log('请求失败!');
			});
		};

		$scope.getData();

		// 取数据结束

	});
	//控制器范围到此结束
});