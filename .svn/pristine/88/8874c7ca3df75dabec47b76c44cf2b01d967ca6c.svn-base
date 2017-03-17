define(['angular', 'moment', 'momentCN', 'ngMoment'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var paymentMsg = angular.module('paymentMsg', ['angularMoment']);
	paymentMsg.controller('paymentMsgCtrl', function($scope, baseconfig, $timeout, $mdSidenav, $routeParams) {

		$scope.paymentList = [{
			num: 'EC1605170001-01 2016\5\17',
			money: '转账 391.00 CNY',
			gatheringCompany: '广东美的制冷设备有限公司-职能部',
			paymentCompany: '佛山市顺德区尚宏工业材料有限公司-基建及设备'
		}, {
			num: 'EC1605170001-01 2016\5\17',
			money: '转账 391.00 CNY',
			gatheringCompany: '广东美的制冷设备有限公司-职能部',
			paymentCompany: '佛山市顺德区尚宏工业材料有限公司-基建及设备'
		}, {
			num: 'EC1605170001-01 2016\5\17',
			money: '转账 391.00 CNY',
			gatheringCompany: '广东美的制冷设备有限公司-职能部',
			paymentCompany: '佛山市顺德区尚宏工业材料有限公司-基建及设备'
		}];

		$scope.payment = {
			paymentNum: '',
			applyData: new Date(),
			settlementState: 'ZZHK',
			filter: {
				settlement: [{
					'id': 'XNZF',
					'name': '虚拟支付'
				}, {
					'id': 'XJ',
					'name': '现金'
				}, {
					'id': 'ZZHK',
					'name': '转账汇款'
				}, {
					'id': 'ZP',
					'name': '支票'
				}, {
					'id': 'ZZYC',
					'name': '纸质银承'
				}, {
					'id': 'DZYC',
					'name': '电子银承'
				}, {
					'id': 'TTHK',
					'name': 'TT汇款'
				}],
				currencys: baseconfig.currencys,
				projectNameList: [{
					'id': 'BUY',
					'name': '购买商品、劳务支付的现金'
				}, {
					'id': 'SH',
					'name': '税费支出'
				}],
				paymentSlipStateList: [{
					'id': 'ZC',
					'name': '正常'
				}, {
					'id': 'ZF',
					'name': '作废'
				}]
			},
			paymentMoney: '',
			currency: 'CNY',
			projectName: 'BUY',
			proposer: '',
			departments: '',
			departments: '',
			reason: '',
			paymentSlipState: 'ZC',

		};

		$scope.gathering = {
			supplierName: '',
			supplierType: 'DG',
			filter: {
				supplierTypeList: [{
					'id': 'DG',
					'name': '对公'
				}, {
					'id': 'GR',
					'name': '个人'
				}]
			},
			supplierAddress: '',
			gatheringNum: '',
			gatheringName: '',
			gatheringBank: '',
			province: '',
			city: '',
			BankKeyBankCode: ''

		};

		$scope.erp = {
			type: '',
			invoiceType: '',
			state: '',
			backMsg: '',
			certificateNum: ''
		}

		$scope.selected = [];
		$scope.queryTable = {

				appdata: [{
					'invoiceNum': 'EC1605665-01',
					'invoiceDate': '2016-5-27',
					'invoiceSum': '391.00',
					'verificationSum': '0.00',
					'paymentSum': '0.00',
					'remainderSum': '391.00',
					'currentPaymentSum': '391.00',
					'abstract': '工程部报销材料款'
				}, {
					'invoiceNum': 'EC1605665-01',
					'invoiceDate': '2016-5-27',
					'invoiceSum': '391.00',
					'verificationSum': '0.00',
					'paymentSum': '0.00',
					'remainderSum': '391.00',
					'currentPaymentSum': '391.00',
					'abstract': '工程部报销材料款'
				}, {
					'invoiceNum': 'EC1605665-01',
					'invoiceDate': '2016-5-27',
					'invoiceSum': '391.00',
					'verificationSum': '0.00',
					'paymentSum': '0.00',
					'remainderSum': '391.00',
					'currentPaymentSum': '391.00',
					'abstract': '工程部报销材料款'
				}],
				limit: 5,
				page_number: 1,
				total: 25

			}
			/*sideNav显示控制-start*/

		$scope.stateFlag = false;
		$scope.toggleLeft = buildToggler('left');

		function buildToggler(componentId) {
			return function() {
				$mdSidenav(componentId).toggle();
				$scope.stateFlag = !$scope.stateFlag;

			}
		}				
		$scope.$watch('$viewContentLoaded', function() {
			$mdSidenav('left').toggle()
			$scope.stateFlag = !$scope.stateFlag;
		});
		/*sideNav显示控制-end*/

		

		/*列表对应数据-start*/
		$scope.border = [];
		$scope.border[0] = 'select';
		$scope.isCurrent = function(index) {
				$scope.border = [];
				$scope.border[index] = 'select';
				/*根据对应列表请求相应数据*/
			}
			/*列表对应数据-end*/

	});
	angular._LoadModule('paymentMsg');
	return paymentMsg;
});