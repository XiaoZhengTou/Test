define(['angular','js/templates/xingyongguanli/list.js','js/templates/xingyongguanli/addbiangen.js','js/templates/xingyongguanli/addxiugai.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var xingyong = angular.module('mdxingyong', ['mdxingyonglist','mdbiangenlist','mdxiugailist'])
	.config(function($routeProvider) {
		$routeProvider.when('/xingyongguanli/addbaingen', {
				templateUrl: 'templates/xingyongguanli/addbiangen.html'
			}).when('/xingyongguanli/addxiugai', {
				templateUrl: 'templates/xingyongguanli/addxiugai.html'
			}).otherwise({
				redirectTo: 'templates/xingyongguanli/home.html' //angular就喜欢斜杠开头
			});
	});
	xingyong.controller('xingyongctrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog,$mdToast){
		//查询参数
		$scope.query={
			page_number:1,
			page_size:10,
			query_param:{
				credit_user_name:null,//员工名称
				fee_apply_code:null//员工账号
			}
		};
		//清空数据
		$scope.creat_condition=function(){
			$scope.query={
				page_number:1,
				page_size:10,
				query_param:{
					credit_user_name:null,//员工名称
					fee_apply_code:null//员工账号
				}
			}
		}
		//获取数据
		$scope.getData=function(){
			$scope.promise = $timeout(function () {}, 500);
			var getconfig={
				method:'POST',
				url:APP_CONFIG.huisuanzhang+'/credit/ssCreditScore/listCredit',
				headers: {
					'x-auth-token':sessionStorage.Token
				},
				data:{
					page_number: $scope.query.page_number,
					page_size: $scope.query.page_size,
					query_param:$scope.query.query_param
				}
			}
			$http(getconfig).success(function(data){
				$scope.xingyong=data.data.datalist;
				$scope.total=data.data.totalRow;
			}).error(function(data){
				console.log('请求失败')
			})
		}
		$scope.getData()
		//取数据结束
	})
	angular._LoadModule('mdxingyong');
	return xingyong;
});