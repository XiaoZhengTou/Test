define(['angular',
	'js/templates/process/processnode.js',
	'js/templates/process/processSubmit.js',
	'js/templates/process/submitFinish.js'
], function(angular) {
	var app = angular.module('mdprocess', ['mdprocessSubmit', 'mdprocesnode', 'mdsubmitfinish'])
		.config(function($routeProvider) {
			$routeProvider.when('/process/processSubmit', {
				templateUrl: 'templates/process/processSubmit.html'
			}).when('/process/submitFinish', {
				templateUrl: 'templates/process/submitFinish.html'
			}).otherwise({
				redirectTo: '/process/processSubmit' //angular就喜欢斜杠开头
			});
		});
	return app;
});