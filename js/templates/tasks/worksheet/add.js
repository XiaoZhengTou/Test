define(['angular', 'moment', 'momentCN', 'ngMoment',
	'js/shared/receving.js',
	'js/shared/vendor.js',
	'js/shared/currency.js',
	'js/shared/organization.js',
	'js/shared/choosecustomer.js',
	'js/shared/artrxtype.js',
	'js/shared/receiptmethod.js',
	'js/shared/receivables.js',
	'js/shared/choosesubject.js',
], function(angular) {

	var add = angular.module('add', ['angularMoment', 'md.receving', 'mdvendor',
		'mdcurrency', 'mdorganization', 'md.customer', 'mdartrxtype', 'mdreceiptmethod',
		'mdreceivable','mdsubject'
	]);

	add.controller('wsAddCtrl', function($scope, $rootScope, $http, $filter, $mdDialog, $mdMedia,$mdToast, moment) {

		//保存数据格式
		$scope.saveData = {
			ssmanualfeeinvoiceh: {
				amount: null, //	财务工单金额	string	
				apply_by: null, //	经办人ID	string	
				apply_by_name: null, //	发票经办人名称（和“财务工单经办人名称”相同）	string	
				apply_date: new Date(), //	申请日期	string	
				apply_name: null, //	财务工单经办人名称	string	
				company_id: null, //	入账单位ID	string	
				currency_code: null, //	币种编号	string	
				currency_name: null, //	币种名称	string	
				description: null, //	财务工单业务描述	string	
				invoice_amount: null, //	发票金额	string	
				invoice_id: null, //	发票ID	string	新增传null或不传，修改时传值
				manual_order_id: null, //	财务工单ID	string	新增传null或不传，修改时传值
				order_type: null, //	单据类型（AP）	string	
				org_id: null, //	经办人部门ID	string	
				org_name: null, //	经办人部门名称	string	
				reason_desc: null, //	发票摘要	string	
				vendor_code: null, //	供应商编码	string	有就传，没有就不传或传null
				vendor_id: null, //	供应商ID	string	
				vendor_name: null, //	供应商名称	string	
				vendor_site_code: null, //	供应商地址编码	string	有就传，没有就不传或传null
				vendor_site_id: null, //	供应商地址ID	string	
				vendor_site_name: null, //	供应商地址名	string	
				ssmanualfeeinvoicels: [],
				cust_trx_type: null, //	事务处理类型	string	
				cust_trx_type_id: null, //	事务处理类型ID	string	
				cust_trx_type_name: null,
				ou_id: null, //ERP核算组织OU_ID	string	
				proxy_user: null,
				customer_code: null, //	客户编码	string	有就传，没有就不传或传null
				customer_id: null, //	客户ID	string	
				customer_name: null, //	客户名称	string	
				customer_site_code: null, //	客户地点编号	string	有就传，没有就不传或传null
				customer_site_id: null, //	客户地址ID	string	
				customer_site_name: null, //	客户地点名称	string	
			}

		}

		$scope.ssmanualfeeinvoicel = {
			approve_reim_amount: null, //	借方金额	string	
			reason_desc: null, //	摘要	string	
			segment1: null, //	公司段	string	
			segment1_name: null, //	公司段名称	string	
			segment2: null, //	成本中心段	string	
			segment2_name: null, //	成本中心段名称	string	
			segment3: null, //	会计科目段	string	
			segment3_name: null, //	会计科目段名称	string	
			segment4: null, //	明细科目段	string	
			segment4_name: null, //	明细科目段名称	string	
			segment5: null, //	产品段	string	
			segment5_name: null, //	产品段名称	string	
			segment6: null, //	内部往来段	string	
			segment6_name: null, //	内部往来段名称	string	
			segment7: null, //	备注段	string	
			segment7_name: null, //
		}

		$scope.ruzhangdanwei = {}; //入账单位
		$scope.vendor = {}; //供应商
		$scope.orgs = {}; //组织机构
		$scope.customer = {}; //客户
		$scope.artrxtype = {}; //应类型收事务处理
		$scope.receipt = {}//收款方式

		//添加明细，默认添加一条
		$scope.saveData.ssmanualfeeinvoiceh.ssmanualfeeinvoicels.push(angular.copy($scope.ssmanualfeeinvoicel));

		//添加明细
		$scope.addDetail = function(e) {
			$scope.saveData.ssmanualfeeinvoiceh.ssmanualfeeinvoicels.push(angular.copy($scope.ssmanualfeeinvoicel));
		}

		//修改明细
		$scope.updateDetail = function(e, index) {

		}

		//合计总借款
		$scope.onCountmoney = function() {
			var total = 0;
			angular.forEach($scope.saveData.ssmanualfeeinvoiceh.ssmanualfeeinvoicels, function(data, index, array) {
				total += data.approve_reim_amount;
			});
			$scope.saveData.ssmanualfeeinvoiceh.invoice_amount = total;
		}
		
		//合计贷款
		$scope.onCountmoney = function() {
			var total = 0;
			angular.forEach($scope.saveData.ssmanualfeeinvoiceh.ssmanualfeeinvoicels, function(data, index, array) {
				total += data.approve_reim_amount;
			});
			$scope.saveData.ssmanualfeeinvoiceh.invoice_amount = total;
			$scope.saveData.ssmanualfeeinvoiceh.amount = total;
		}

		//删除明细
		$scope.delDetail = function(e, index) {
			$scope.saveData.ssmanualfeeinvoiceh.ssmanualfeeinvoicels.splice(index, 1);
			$scope.onCountmoney();
		}

		//明细的科目组合弹窗
		$scope.chooseSubjectComposition = function(index) {
			var ruzhangdanwei = $scope.ruzhangdanwei;
			var ssmanualfeeinvoicel = $scope.saveData.ssmanualfeeinvoiceh.ssmanualfeeinvoicels[index];
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'templates/tasks/worksheet/add-detail-dialog.html',
					parent: angular.element(document.body),
					//targetEvent: ev,
					clickOutsideToClose: false,
					fullscreen: useFullScreen,
				})
				.then(function(answer) {
						//修改一条明细
						$scope.saveData.ssmanualfeeinvoiceh.ssmanualfeeinvoicels.splice(index, 1, answer);
					

				}, function() {
					//alert("关闭窗口");
				});

			function DialogController($scope, $mdDialog) {
				$scope.ruzhangdanwei = ruzhangdanwei;
				$scope.ssmanualfeeinvoicel = ssmanualfeeinvoicel;
				$scope.hide = function() {
					$mdDialog.hide();
				};
				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.answer = function() {
					console.log('................');
					console.log($scope.ssmanualfeeinvoicel);
					$mdDialog.hide($scope.ssmanualfeeinvoicel);
				};

			}
		}

		//保存一条AP数据
		$scope.save = function() {
			$scope.saveData.ssmanualfeeinvoiceh.company_id = $scope.ruzhangdanwei.company_id;
			$scope.saveData.ssmanualfeeinvoiceh.ou_id = $scope.ruzhangdanwei.ou_id;
			$scope.saveData.ssmanualfeeinvoiceh.vendor_code = $scope.vendor.vendor_code;
			$scope.saveData.ssmanualfeeinvoiceh.vendor_id = $scope.vendor.vendor_id;
			$scope.saveData.ssmanualfeeinvoiceh.vendor_name = $scope.vendor.vendor_name;
			$scope.saveData.ssmanualfeeinvoiceh.vendor_site_code = $scope.vendor.vendor_site_code;
			$scope.saveData.ssmanualfeeinvoiceh.vendor_site_id = $scope.vendor.vendor_site_id;
			$scope.saveData.ssmanualfeeinvoiceh.vendor_site_name = $scope.vendor.vendor_site_name;
			$scope.saveData.ssmanualfeeinvoiceh.apply_by = $scope.orgs.user_id;
			$scope.saveData.ssmanualfeeinvoiceh.apply_by_name = $scope.orgs.user_full_name;
			$scope.saveData.ssmanualfeeinvoiceh.apply_date = $filter('date')($scope.saveData.ssmanualfeeinvoiceh.apply_date, 'yyyy-MM-dd');
			$scope.saveData.ssmanualfeeinvoiceh.apply_name = $scope.orgs.user_full_name
			$scope.saveData.ssmanualfeeinvoiceh.org_id = $scope.orgs.org_id
			$scope.saveData.ssmanualfeeinvoiceh.org_name = $scope.orgs.org_name
			$scope.saveData.ssmanualfeeinvoiceh.reason_desc = $scope.saveData.ssmanualfeeinvoiceh.description;

			//AR
			//$scope.saveData.ssmanualfeeinvoiceh.proxy_user = $scope.ruzhangdanwei.proxy_user;
			$scope.saveData.ssmanualfeeinvoiceh.customer_code = $scope.customer.customer_code;
			$scope.saveData.ssmanualfeeinvoiceh.customer_id = $scope.customer.customer_id;
			$scope.saveData.ssmanualfeeinvoiceh.customer_name = $scope.customer.customer_name;
			$scope.saveData.ssmanualfeeinvoiceh.customer_site_code = $scope.customer.customer_site_code;
			$scope.saveData.ssmanualfeeinvoiceh.customer_site_id = $scope.customer.customer_site_id;
			$scope.saveData.ssmanualfeeinvoiceh.customer_site_name = $scope.customer.customer_site_name;
			
			//ARS
			$scope.saveData.ssmanualfeeinvoiceh.calling_api = "aa";
			$scope.saveData.ssmanualfeeinvoiceh.bank_account_id = $scope.receipt.bank_account_id;
            $scope.saveData.ssmanualfeeinvoiceh.bank_account_name = $scope.receipt.bank_account_num;
			
			
			//GL
			
			console.log($scope.saveData.ssmanualfeeinvoiceh);
			//ajax保存数据
			$http({
				method: 'POST',
				//url: tasksUrl + '/center/manual/SsManualFeeInvoiceH/save',
				url: 'http://10.73.46.38:8080/smart-accounting-web/center/manual/SsManualFeeInvoiceH/save',
				data: $scope.saveData,
			}).success(function(data, status, headers, config) {
				if (data.code == "0000") {
					var textContent = "保存成功!"; //$scope.saveData.apportion_id == undefined ? "保存成功!" : "修改成功!";
					$mdToast.show(
				      $mdToast.simple()
				        .textContent(textContent)
				        .position('top right')
				        .hideDelay(3000)
				    );
					
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭').textContent('' + data.msg + '(' + data.code + ')'))
				}
				console.log($scope.emseaapplyh);
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}

	});
});