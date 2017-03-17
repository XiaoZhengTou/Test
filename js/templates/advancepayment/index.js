define(['angular','js/templates/advancepayment/home.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('md.advancepayment', ['md.advancepayment.home'])
	.config(function($routeProvider) {
		$routeProvider.when('/advancepayment/add', {
				templateUrl: 'templates/advancepayment/list.html'
			}).when('/feeapply/chalv', {
				templateUrl: 'templates/advancepayment/add.html'
			}).otherwise({
				redirectTo: '/advancepayment/home' //angular就喜欢斜杠开头
			});
	});
	angular._LoadModule('md.advancepayment');
	return app;
});