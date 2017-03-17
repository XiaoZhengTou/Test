define(['angular', 'moment', 'momentCN', 'ngMoment'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var certificate = angular.module('certificate', ['angularMoment']);
	certificate.controller('certificateCtrl', function($scope,baseconfig, $timeout, $mdSidenav) {
		
		
		$scope.cerificateList = [
      {      
        num: 'EC1605170001-01 2016\5\17',
        money: '391.00 CNY',
        company: '广东美的制冷设备有限公司-总部职能部'
      },
      {      
        num: 'EC1605170001-01 2016\5\17',
        money: '391.00 CNY',
        company: '广东美的制冷设备有限公司-总部职能部'
      },
      {      
        num: 'EC1605170001-01 2016\5\17',
        money: '391.00 CNY',
        company: '广东美的制冷设备有限公司-总部职能部'
      }];
		
		
	  $scope.query={
	  	certificaeNum:'',
	  	ledgerData:new Date(),
	  	recordedCompany: '',
	  	supplierType: '',
	  	supplierName: '',
	  	supplierAdress: '',
	  	invoiceApproval:'',
	  	documentMaker:'',
	  	currency:'CNY',
	  	paymentState:'YFK',
	  	filter:{
	  		currencys:baseconfig.currencys,
	  		paymentStateList:
	  		[{'id':'YFK','name':'已付款'},
	  		 {'id':'WFK','name':'未付款'}
	  		]
	  	},
	  	associatedTransactionNum: '',
	  	invoiceAmount:'',
	  	certificateState: '',
	  	transitConnectionNum: '',
	  	amountPaid: '',
	  	abstract: '',
	  	hexiaoMoney:'',
	  	ERP_type:'',
	  	ERP_invoice_type:'',
	  	ERP_state:'',
	  	ERP_back_msg:'',
	  	ERP_certificate_num:''
	  	
	  }
		$scope.selected=[];
		$scope.queryTable={
			appdata:
			[{'creditDebt':'借','combinatorialCode':'1090.26546540112.04','combinatorialName':'管理费用-办公费用-其他','money':'334.19','currency':'CNY','exchangeRate':'1.00','projectNum':'1656','abstract':'支付材料费'},
			{'creditDebt':'借','combinatorialCode':'1090.26546540112.04','combinatorialName':'管理费用-办公费用-其他','money':'334.19','currency':'CNY','exchangeRate':'1.00','projectNum':'1656','abstract':'支付材料费'},
			{'creditDebt':'借','combinatorialCode':'1090.26546540112.04','combinatorialName':'管理费用-办公费用-其他','money':'334.19','currency':'CNY','exchangeRate':'1.00','projectNum':'1656','abstract':'支付材料费'}],
			limit:5,
			page_number:1,
			total:25
		
		}
		
		/*sideNav显示控制-start*/
		$scope.stateFlag=false;
		$scope.toggleLeft = buildToggler('left');
		function buildToggler(componentId) {
			return function() {
				$mdSidenav(componentId).toggle();
				$scope.stateFlag=!$scope.stateFlag;
				
			}
		}
		$scope.$watch('$viewContentLoaded', function() {
			$mdSidenav('left').toggle();
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
		 
	angular._LoadModule('certificate');
	return certificate;
});