define(['angular',
'js/templates/zhiban/list.js',
'js/shared/organization.js',
'js/shared/ruzhangdanwei.js',
'js/shared/receving.js',
'js/shared/dictitem.js','js/templates/zhiban/gerenzhiban.js','js/templates/zhiban/quannian.js','js/templates/zhiban/rili.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('mdzhiban', [])
	.config(function($routeProvider) {
		$routeProvider.when('/zhiban/quannian', {
				templateUrl: 'templates/zhiban/quannian.html'
			}).when('/zhiban/gerenzhiban', {
				templateUrl: 'templates/zhiban/gerenzhiban.html'
			}).otherwise({
				redirectTo: '/zhiban/gerenzhiban.html' //angular就喜欢斜杠开头
			});
	});
	angular._LoadModule('mdzhiban');
	return app;
});