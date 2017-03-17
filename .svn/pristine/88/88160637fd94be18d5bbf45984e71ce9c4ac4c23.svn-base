define(['angular', 'moment', 'momentCN', 'ngMoment', 'libs/imageCropperDirective', 'libs/imageCropper', 'js/templates/financeQC/operation.js', 'js/templates/financeQC/checkLog.js'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('airfare.css');
	publicFunction.addStyle('task.css');
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle("image.css");
	var app = angular.module('financeQC', ['imageCropper','angularMoment']);
	app.run(function($http) {

		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
		$http.defaults.headers.common["Content-Type"] = "application/json";
	});
	app.config(function($routeProvider){
		$routeProvider.when('/financeQC/operation', {
			templateUrl: 'templates/financeQC/operation.html'
		}).when('/financeQC/checkLog', {
			templateUrl: 'templates/financeQC/checkLog.html'
		}).otherwise({
			redirectTo: 'templates/financeQC/taskProcessing.html'
		});
	});
	app.controller('editTaskProcessingCtrl', ['$scope', '$http', '$filter', '$mdDialog','baseconfig', '$timeout', '$mdSidenav', function($scope, $http, filter, $mdDialog, baseconfig, $timeout, $mdSidenav){
		
		/*影像*/
		$scope.imageUrl = "img/jiudian/jd.jpg";
		$scope.showControls = true;
        $scope.fit = false;
        
        $scope.myButtonLabels = {
          rotateLeft: '<i class="iconfont">&#xe69c;</i>',
          rotateRight: '<i class="iconfont">&#xe69b;</i>',
          zoomIn: '<i class="iconfont">&#xe691;</i>',
          zoomOut: '<i class="iconfont">&#xe694;</i>',
          fit: '<i class="iconfont">&#xe697;</i>'
        };
        
        $scope.selectedRow = function(event,element){
        	//event.stopPropagation();
        	angular.element(event.target).parent().parent().parent().parent().parent().parent().children().removeClass("selected");
        	angular.element(event.target).parent().parent().parent().parent().parent().addClass("selected");
        	
        	$scope.imageUrl = element.base64;
        }
        
        //查看历史版本弹框
        var alert;
	    $scope.showAlert = showAlert;
	    // Internal method
	    function showAlert() {
	      alert = $mdDialog.alert({
	        title: '影像历史版本',
	        textContent: '版本号：v1.0.0',
	        ok: 'Close'
	      });
	      $mdDialog
	        .show( alert )
	        .finally(function() {
	          alert = undefined;
	        });
	    }
	    
	    /*预凭证页面*/
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
        
        
        /*付款信息*/
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

		$scope.stateFlag = true;
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
        
		
		
	}]);

	angular._LoadModule('financeQC');
	return app;
});