define(['angular',
'js/templates/duigongEC/list',
'js/shared/organization',
'js/templates/duigongEC/addchailvapply',
'js/templates/duigongEC/addrichang',
'js/templates/duigongEC/flowApproveEC',
'js/templates/duigongEC/approveEC',
'js/templates/duigongEC/BudgetUnitDirective',
'js/templates/duigongEC/busiorgDirective',
'js/shared/ruzhangdanwei',
'js/shared/receving',
'js/shared/currency',
'js/shared/dictitem',
'js/shared/budgets',
'js/shared/feeapply', 
'js/shared/budgetpart',
'js/shared/borrowing',
'js/shared/feeapplyv2'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('mdduigongEC', ['mdduigongEClist','mdaddchailvapply','mdaddrichang'
		,'mdorganization','mdbudgetunit','mdbusiorg','md.ruzhangdanwei','md.receving'
		,'mddictitem','mdflowApproveEC','mdApproveEC','mdcurrency',
		'mdbudgets','md.eachoose', 'mdbudgetpart','md.borrowing','md.feeapplyv2'])
	.config(function($routeProvider) {
		$routeProvider.when('/duigongEC/richang/:obj', {
				templateUrl: 'templates/duigongEC/addrichang.html'
			})
		 .when('/duigongEC/richang', {
				templateUrl: 'templates/duigongEC/addrichang.html'
			})
		.when('/duigongEC/chalv', {
				templateUrl: 'templates/duigongEC/addchalv.html'
			}).when('/duigongEC/applyProcess', {
				templateUrl: 'templates/duigongEC/applyProcess.html'
			}).when('/duigongEC/approveEC/:obj', {
                templateUrl: 'templates/duigongEC/approveEC.html'
            }).when('/duigongEC/flowApproveEC', {
                templateUrl: 'templates/duigongEC/flowApproveEC.html'
            })
            .otherwise({
				redirectTo: '/duigongEC/home' //angular就喜欢斜杠开头
			});
	});
	angular._LoadModule('mdduigongEC');
	return app;
});