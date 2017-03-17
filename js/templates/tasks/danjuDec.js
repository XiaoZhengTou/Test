define(['angular', 'moment', 'momentCN', 'ngMoment'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');

	var danjuDec = angular.module('danjuDec', ['angularMoment']);
	danjuDec.controller('danjuDecCtrl', function($scope, $rootScope, baseconfig, $http, $filter, jhkPublic, moment, $timeout, $mdDialog) {
		/*预付款信息开始*/
		$scope.advances = {
			applyDate: new Date(),
			company: null,
			handler: null,
			departments: null,
			events: null,
			advances: null,
			payment: {
				state: 'DH',
				filter: [{
					'id': 'DH',
					'name': '电汇'
				}, {
					'id': 'ZX',
					'name': '在线支付'
				}]
			},
			currency: {
				state: 'CNY',
				filter: baseconfig.currencys
			},
			businessDescriptions: null,

		};
		/*预付款信息结束*/

		/*收款人信息开始*/
		$scope.payee = {
			supplierType: null,
			supplier: null,
			supplierLocation: null,
			name: null,
			account: null,
			bank: null,
			supplierAddress: null,

		};
		/*收款人信息结束*/

		/*辅助信息开始*/
		$scope.assistant = {
			expectedVerificationDate: null,
			verificationMoney: null,
			fromSystem: null,
			fromLink: null,
			allocationProject: null
		};
		/*辅助信息结束*/

	})
	angular._LoadModule('danjuDec');
	return danjuDec;
});