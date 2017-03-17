define(['angular',
'js/templates/zhiduweihu/list.js',
'js/shared/organization.js',
'js/templates/zhiduweihu/addchailvapply.js',
'js/templates/zhiduweihu/addrichang.js',
], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('mdfeeapply', ['mdzhidulist','mdaddchailvapply','mdaddrichang','mdorganization'])
	.config(function($routeProvider) {
		$routeProvider.when('/zhiduweihu/richang', {
				templateUrl: 'templates/zhiduweihu/addrichang.html'
			}).when('/zhiduweihu/shenqing', {
				templateUrl: 'templates/zhiduweihu/addchalv.html'
			}).when('/zhiduweihu/applyProcess', {
				templateUrl: 'templates/zhiduweihu/applyProcess.html'
			}).otherwise({
				redirectTo: '/zhiduweihu/home' //angular就喜欢斜杠开头
			});
	});
	angular._LoadModule('mdfeeapply');
	return app;
});