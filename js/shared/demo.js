define(['angular', 'js/shared/choosecitys',
	'js/shared/organization', 'js/view/choosepassenger',
	'js/shared/bankaccount',
	'js/shared/feeapply',
	'js/shared/receving',
	'js/shared/ruzhangdanwei',
	'js/shared/dictitem',
	'js/shared/currency',
	'js/shared/vendor',
	'js/shared/budget',
	'js/shared/budgetpart',
	'js/shared/budgets',
	'js/shared/borrowing',
	'js/shared/feeapplyv2'
], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var app = angular.module('md.component.demo', ['muchoosecitys',
			'muchoosepassengers',
			'mdorganization',
			'md.bankaccount',
			'md.eachoose',
			'md.receving',
			'md.ruzhangdanwei',
			'mddictitem',
			'mdcurrency',
			'mdvendor',
			'mdbudget',
			'mdbudgetpart',
			'mdbudgets',
			'md.borrowing',
			'md.feeapplyv2'
		])
		.controller('componentctrl', ['$scope', function($scope) {
			$scope.citys = null;
			$scope.orgs = null;
			$scope.banks = null;
			$scope.ea = [];
			$scope.receving = {};
			$scope.ruzhangdanwei = {};
			$scope.budget = {};
			$scope.busiorg = null;
			$scope.feenode = null;
			$scope.budget3 = null;
			$scope.isuser = true;
			$scope.orgslist = [];
			$scope.hotel = "hotel";
			$scope.vendor=null;
			//字典专用
			$scope.diclmModel = {
				'dictmodel': null,
				'code': 'C_LM_ORDER_TYPE',
				'titlename': '借款类型',
				'itemvalue': null,
				'redisabled': false,
				'itemnamemodel': null,
				'itemvaluemodel': null,
				'ngrequired': false
			}
		}]);
	angular._LoadModule('md.component.demo');
	return app;
});