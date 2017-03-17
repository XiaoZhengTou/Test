define(['angular','js/common/httpErrorDialog.js'], function(angular) {
	publicFunction.addStyle('httperror.css');
	var app = angular.module('mdhttperror', []);
	app.factory('HttpInterceptor', ['$q', HttpInterceptor]);

	function HttpInterceptor($q,$location) {
		return {
			request: function(config) {
				if (!config.noLoader) {
		
					httpshowloading();
				}
				return config;
			},
			requestError: function(err) {
				httpremoveloading();
				httpshowError("请检查您的网络连接情况");
				console.log('requestError');
				return $q.reject(err);
			},
			response: function(res) {
				httpremoveloading();
				//console.log('response');
				// 根据错误代码决定下一步的操作开始
				if (res && res.data.code == '0401') {
					$location.path('/login');
				}
				// 根据错误代码决定下一步的操作结束
				return res;
			},
			responseError: function(err) {
				//console.log('responseError');
				httpremoveloading();
				if (-1 === err.status) {
					
					httpshowError("远程服务器无响应，代码：" + err.status);
				} else if (404 === err.status) {
					httpshowError("找不到资源，代码：" + err.status);
				} else {
					httpshowError("发生错误，代码：" + err.status);
				}

				return $q.reject(err);
			}
		};
	}
	// 添加对应的 Interceptors
	app.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);
	return app;
});