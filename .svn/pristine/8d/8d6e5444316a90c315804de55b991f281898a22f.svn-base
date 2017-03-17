define(['angular'], function(angular) {

	var add = angular.module('addAll', []);

	add.controller('wsAddAllCtrl', function($scope, $rootScope, $http, $filter, $mdDialog, $mdMedia,$mdToast, moment) {

		//保存数据格式
		$scope.saveData = {
			ssmanualorderh:{
				apply_by: null,//	经办人ID	string	
			    apply_date: new Date(),//	申请日期	string	
			    apply_name: null,//	经办人名称	string	
			    company_id: null,//	入账单位ID	string	
			    description: null,//	财务工单业务描述	string	
			    manual_order_id: null,//	财务工单ID	string	新增传null或者不传，修改传值
			    order_type: null,//	财务工单类型（ALL）	string	
			    org_id: null,//	经办人部门ID	string	
			    org_name: null,//	经办人部门名称	string	
			    ou_id: null,//	ERP核算组织OU_ID	string	
			    proxy_user: null,//	代理用户	string	
			},
			ssmanualfeeinvoiceh: []
		}
		
		$scope.ssmanualfeeinvoiceh = {
			bank_account_id: null,//	银行账户ID	string	（AR收款）
		    bank_account_name: null,//	银行账户名称	string	（AR收款）
		    calling_api: null,//	收款类型	string	（AR收款）
		    currency_code: null,//	币种编号	string	
		    currency_name: null,//	币种名称	string	
		    cust_trx_type: null,//	事务处理类型	string	（AR发票）
		    cust_trx_type_id: null,//	事务处理类型ID	string	（AR发票）
		    cust_trx_type_name: null,//	事务处理类型名称	string	（AR发票）
		    customer_id: null,//	客户ID	string	（AR发票和AR收款）
		    customer_site_id: null,//	客户地址ID	string	（AR发票和AR收款）
		    invoice_amount: null,//	发票金额	string	
		    invoice_id: null,//	发票ID	string	新增传null或者不传，修改传值
		    order_type: null,//	发票类型	string	
		    reason_desc: null,//	发票摘要	string	
		    receipt_method_id: null,//	收款方法ID	string	（AR收款）
		    receipt_method_name: null,//	收款方法名称	string	（AR收款）
		    vendor_id: null,//	供应商ID	string	（AP发票）
		    vendor_name: null,//	供应商名称	string	（AP发票）
		    vendor_site_id: null,//	供应商地址ID	string	（AP发票）
		    vendor_site_name: null,//	供应商地址名称	string	（AP发票）
		    ssmanualfeeinvoicels: [],//	AP和GL发票传	array<object>	

		}
		
		$scope.ssmanualfeeinvoicel = {
			approve_reim_amount: null,//	借方金额	string	
	        reason_desc: null,//	摘要	string	
	        segment1: null,//	公司段	string	
	        segment1_name: null,//	公司段	string	
	        segment2: null,//	成本中心段	string	
	        segment2_name: null,//	成本中心段	string	
	        segment3: null,//	会计科目段	string	
	        segment3_name: null,//	会计科目段	string	
	        segment4: null,//	明细科目段	string	
	        segment4_name: null,//	明细科目段	string	
	        segment5: null,//	产品段	string	
	        segment5_name: null,//	产品段	string	
	        segment6: null,//	内部往来段	string	
	        segment6_name: null,//	内部往来段	string	
	        segment7: null,//	备注段	string	
	        segment7_name: null,//	备注段	string	
		}

		

		$scope.ruzhangdanwei = {}; //入账单位
		$scope.vendor = {}; //供应商
		$scope.orgs = {}; //组织机构
		$scope.customer = {}; //客户
		$scope.artrxtype = {}; //应类型收事务处理
		$scope.receipt = {}//收款方式
		
		//明细的科目组合弹窗
		var chooseSubjectComposition = function(ev,index,ruzhangdanwei,ssmanualfeeinvoicels) {
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'templates/tasks/worksheet/add-detail-dialog.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen,
				})
				.then(function(answer) {
						//修改一条明细
						ssmanualfeeinvoicels.splice(index,1,answer)

				}, function() {
					//alert("关闭窗口");
				});

			function DialogController($scope, $mdDialog) {
				$scope.ruzhangdanwei = ruzhangdanwei;
				$scope.ssmanualfeeinvoicel = ssmanualfeeinvoicels[index];
				
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
		
		
		
		//AP应付发票
		$scope.apssmanualfeeinvoiceh = angular.copy($scope.ssmanualfeeinvoiceh);
		$scope.apssmanualfeeinvoiceh.vendor = {};//供应商
		$scope.apssmanualfeeinvoiceh.order_type = "AP";
		$scope.apssmanualfeeinvoiceh.apply_date = new Date();
		//AP应付发票明细
		$scope.apssmanualfeeinvoiceh.ssmanualfeeinvoicels.push(angular.copy($scope.ssmanualfeeinvoicel));
		
		$scope.addAPDetail = function(e) {
			$scope.apssmanualfeeinvoiceh.ssmanualfeeinvoicels.push(angular.copy($scope.ssmanualfeeinvoicel));
		}
		
		$scope.delAPDetail = function(e,index){
			$scope.apssmanualfeeinvoiceh.ssmanualfeeinvoicels.splice(index,1);
			$scope.countmoneyforap();
		}
		
		//合计总借款
		$scope.countmoneyforap = function() {
			var total = 0;
			angular.forEach($scope.apssmanualfeeinvoiceh.ssmanualfeeinvoicels, function(data, index, array) {
				total += data.approve_reim_amount;
			});
			$scope.apssmanualfeeinvoiceh.invoice_amount = total;
		}
		
		//ap明细科目组合
		$scope.chooseSubsAp = function(ev,index){
			var ssmanualfeeinvoicels = $scope.apssmanualfeeinvoiceh.ssmanualfeeinvoicels
			chooseSubjectComposition(ev,index,$scope.ruzhangdanwei,ssmanualfeeinvoicels);
		}
		
		
		//AR应收发票
		$scope.arssmanualfeeinvoiceh = angular.copy($scope.ssmanualfeeinvoiceh);
		$scope.arssmanualfeeinvoiceh.order_type = "AR_INV";
		$scope.arssmanualfeeinvoiceh.apply_date = new Date();
		$scope.arssmanualfeeinvoiceh.customer = {};//客户
		
		
		//AR应收收款
		$scope.arsssmanualfeeinvoiceh = angular.copy($scope.ssmanualfeeinvoiceh);
		$scope.arsssmanualfeeinvoiceh.order_type = "AR";
		$scope.arsssmanualfeeinvoiceh.apply_date = new Date();
		$scope.arsssmanualfeeinvoiceh.customer = {};//客户
		$scope.arsssmanualfeeinvoiceh.receivable = {};//收款类型
		$scope.arsssmanualfeeinvoiceh.receipt = {};//收款方式
		
		//GL日记账
		$scope.glssmanualfeeinvoiceh = angular.copy($scope.ssmanualfeeinvoiceh);
		$scope.glssmanualfeeinvoiceh.order_type = "GL";
		$scope.glssmanualfeeinvoiceh.apply_date = new Date();
		$scope.glssmanualfeeinvoiceh.vendor = {};//供应商
		
		//GL应付发票明细
		$scope.glssmanualfeeinvoiceh.ssmanualfeeinvoicels.push(angular.copy($scope.ssmanualfeeinvoicel));
		
		$scope.addGlDetail = function(e) {
			$scope.glssmanualfeeinvoiceh.ssmanualfeeinvoicels.push(angular.copy($scope.ssmanualfeeinvoicel));
		}
		
		$scope.delGlDetail = function(e,index){
			$scope.glssmanualfeeinvoiceh.ssmanualfeeinvoicels.splice(index,1);
			$scope.countmoneyforGl();
		}
		
		//合计总借款
		$scope.countmoneyforGl = function() {
			var total = 0;
			angular.forEach($scope.glssmanualfeeinvoiceh.ssmanualfeeinvoicels, function(data, index, array) {
				total += data.approve_reim_amount;
			});
			$scope.glssmanualfeeinvoiceh.invoice_amount = total;
		}
		
		//ap明细科目组合
		$scope.chooseSubsGl = function(ev,index){
			var ssmanualfeeinvoicels = $scope.glssmanualfeeinvoiceh.ssmanualfeeinvoicels
			chooseSubjectComposition(ev,index,$scope.ruzhangdanwei,ssmanualfeeinvoicels);
		}
		
		
		

		/*//添加明细，默认添加一条
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
		}*/
		//保存一条AP数据
		$scope.save = function() {
			$scope.saveData.ssmanualfeeinvoiceh = [];
			$scope.saveData.ssmanualorderh.company_id = $scope.ruzhangdanwei.company_id;
			$scope.saveData.ssmanualorderh.ou_id = $scope.ruzhangdanwei.ou_id;
			$scope.saveData.ssmanualorderh.proxy_user = $scope.ruzhangdanwei.proxy_user;
			$scope.saveData.ssmanualorderh.apply_by = $scope.orgs.user_id;
			$scope.saveData.ssmanualorderh.apply_by_name = $scope.orgs.user_full_name;
			$scope.saveData.ssmanualorderh.apply_date = $filter('date')($scope.saveData.ssmanualorderh.apply_date, 'yyyy-MM-dd');
			$scope.saveData.ssmanualorderh.apply_name = $scope.orgs.user_full_name;
			$scope.saveData.ssmanualorderh.org_id = $scope.orgs.org_id;
			$scope.saveData.ssmanualorderh.org_name = $scope.orgs.org_name;
			
			//AP
			$scope.apssmanualfeeinvoiceh.vendor_id = $scope.apssmanualfeeinvoiceh.vendor.vendor_id;
		    $scope.apssmanualfeeinvoiceh.vendor_name = $scope.apssmanualfeeinvoiceh.vendor.vendor_name;
		    $scope.apssmanualfeeinvoiceh.vendor_site_id = $scope.apssmanualfeeinvoiceh.vendor.vendor_site_id;
		    $scope.apssmanualfeeinvoiceh.vendor_site_name = $scope.apssmanualfeeinvoiceh.vendor.vendor_site_name;
			$scope.saveData.ssmanualfeeinvoiceh.push($scope.apssmanualfeeinvoiceh);
			
			//AR
			$scope.arssmanualfeeinvoiceh.customer_id = $scope.arssmanualfeeinvoiceh.customer.customer_id;
			$scope.arssmanualfeeinvoiceh.customer_site_id = $scope.arssmanualfeeinvoiceh.customer.customer_site_id;
			$scope.saveData.ssmanualfeeinvoiceh.push($scope.arssmanualfeeinvoiceh);
			
			//APS
			$scope.arsssmanualfeeinvoiceh.customer_id = $scope.arsssmanualfeeinvoiceh.customer.customer_id;
			$scope.arsssmanualfeeinvoiceh.customer_site_id = $scope.arsssmanualfeeinvoiceh.customer.customer_site_id;
			$scope.arsssmanualfeeinvoiceh.calling_api = $scope.arsssmanualfeeinvoiceh.receivable.receivables_trx_id;
			$scope.arsssmanualfeeinvoiceh.bank_account_id = $scope.arsssmanualfeeinvoiceh.receipt.bank_account_id;
			$scope.arsssmanualfeeinvoiceh.bank_account_name = $scope.arsssmanualfeeinvoiceh.receipt.bank_account_name;
			$scope.saveData.ssmanualfeeinvoiceh.push($scope.arsssmanualfeeinvoiceh);
			
			//GL
			$scope.glssmanualfeeinvoiceh.vendor_id = $scope.glssmanualfeeinvoiceh.vendor.vendor_id;
		    $scope.glssmanualfeeinvoiceh.vendor_name = $scope.glssmanualfeeinvoiceh.vendor.vendor_name;
		    $scope.glssmanualfeeinvoiceh.vendor_site_id = $scope.glssmanualfeeinvoiceh.vendor.vendor_site_id;
		    $scope.glssmanualfeeinvoiceh.vendor_site_name = $scope.glssmanualfeeinvoiceh.vendor.vendor_site_name;
			
			$scope.saveData.ssmanualfeeinvoiceh.push($scope.glssmanualfeeinvoiceh);
			
			console.log($scope.saveData.ssmanualfeeinvoiceh);
			//ajax保存数据
			$http({
				method: 'POST',
				//url: tasksUrl + '/center/manual/SsManualFeeInvoiceH/save',
				url: 'http://10.73.46.41:8080/smart-accounting-web/center/manual/SsManualFeeInvoiceH/allTypeSave',
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