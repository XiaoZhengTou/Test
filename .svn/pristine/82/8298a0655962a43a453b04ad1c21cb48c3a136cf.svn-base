define(['angular'], function(angular) {
	var login = angular.module('login', []);
	login.controller('loginCtrl', function($scope, $rootScope, $http, $location,$routeParams,publicmodel,$cookies,$mdDialog) {
		$rootScope.loginMod = true;
		// 清空已登录用户数据
		publicFunction.localClear("user");
		sessionStorage.clear();
		$http.defaults.headers.common["X-Auth-Token"] = null;
		// 模拟数据开始
		$scope.user = {
				text: '登录',
				username: '13800138111',
				password: 'MDlrq413',
				tenants: [],
				disabled: false,
				select: null,
				rememberMe: false
			}
			// 模拟数据结束
			// 获取用户名和密码
		$scope.userLogin = function() {
			// 登录开始
			//$scope.user.text = '正在登录…';
			$http({
					method: 'POST',
					url: LoginUrl + 'login.do',
					data: {
						"username": $scope.user.username,
						"password": $scope.user.password
					}
				}).success(function(data, status, headers, config) {
					console.log(data);
				$scope.content=headers('x-auth-token');
				if($scope.content!=''&&$scope.content!=null){
					$cookies.put('JSESSION', $scope.content);
				}
					if(data.code == "0000") {
						console.log("登录成功");
						sessionStorage.Token = headers('x-auth-token');
						sessionStorage.LoginTime = (new Date().getTime() / 1000).toFixed(0);
						if($scope.user.rememberMe) {
							sessionStorage.Remember = 1;
						};
						publicmodel.user=data.data;
						publicmodel.userId = data.data.user.userId;
						$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
						if(data.data.tenants && data.data.tenants.length >= 1) {
							$scope.user.tenants = data.data.tenants;
							$scope.user.text = '提交租户';
							$scope.user.disabled = true;
							$scope.userLogin = function() {
								console.log('userLogin2');
								console.log($scope.user.select);
								//var url = LoginUrl + 'login/tenant/' + $scope.user.select;
								$scope.user.text = '提交租户中…';
								$http({
									method: 'POST',
									url: LoginUrl + 'login/tenant',
									data: {
										"tenantId": $scope.user.select.id,
									}
								}).success(function(data, status, headers, config) {
									if(data.code == '0000') {
										console.log('租户ID设置成功！');
										$rootScope.loginMod = false;
										$scope.toDefault();
									} else {
										//$scope.user.text = '抱歉，登录失败，原因是：' + data.msg;
										$mdDialog.show($mdDialog.alert().title('提交结果').textContent(data.msg+ '(' + data.code + ')').ariaLabel('提交结果').ok('关闭'));

									}
								});
							}
						} else {
							$scope.user.text = '自动登录中…';
							$rootScope.loginMod = false;
							$scope.toDefault();
						}
						// 登录数据保存到本地
						var userorg = data['data']['user']['org'];
						var orgs = [];
						for(key in userorg) {
						    if(userorg.hasOwnProperty(key)) {
						        suborg = {
									id : key,
									name : userorg[key]
								};
								orgs.push(suborg);
						    }
						}
						data['data']['user'].orginfo = orgs;
						publicFunction.localSet(data,"user");
						// 登录数据保存到本地结束
					} else {
						//$scope.user.text = '出错了：' + data.msg;
						$mdDialog.show($mdDialog.alert().title('提交结果').textContent(data.msg+ '(' + data.code + ')').ariaLabel('提交结果').ok('关闭'));

					}
				})
				.error(function(data, status, headers, config) {
					console.log("登录失败");
				});
			// 登录结束
		}

		$scope.toDefault = function() {
			$scope.backurl = $location.$$path;
			console.log($routeParams.url);
			console.log(document.referrer);
			console.log($scope.backurl);
			if(angular.equals($scope.backurl,"/login")) {
				console.log(111);
				$location.url('/home');
			} else {
				console.log(2222);
				$rootScope.goBack();
			}
		}
	});
	angular._LoadModule('login');
	return login;
});