define(['angular', 'moment', 'momentCN', 'ngMoment', 'js/shared/ruzhangdanwei.js', 'js/shared/receving.js'], function(angular) {
	//	add public.css
	publicFunction.addStyle('feePay.css');
	publicFunction.addStyle('md-data-table.min.css');
	var mdaddBillP = angular.module('mdaddBillP', ['md.ruzhangdanwei', 'md.receving']);
	mdaddBillP.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	})
	mdaddBillP.controller('addBillPCtrl', function($scope, $http, $mdToast, $mdDialog, $filter, publicmodel, $routeParams) {
		var getUser = publicFunction.localGet("user");
		$scope.userId = getUser.data.user.userId;
		$scope.userName = getUser.data.user.userName;
		$scope.ruzhangdanwei = {}; //入账单位
		$scope.receving = {}; //供应商
		$scope.selected = []; //表格必填
		$scope.budgets = {}; //预算树
		// 导ERP类型
		$scope.add = {
			desc: null,
			type: '月度预提',
			jz: [{
				id: 'GL',
				name: '导入总帐'
			}, {
				id: 'AP',
				name: '导入应付'
			}]
		};
		//		数据初始化start
		$scope.formdata = {
			"emsecfeereimh": {
				"apply_by": null, //申请人id
				"apply_name": null, //申请人姓名
				"apportion_date": new Date(), //调账日期
				"org_id": null, //行政组织id
				"org_name": null, //行政组织名字
				"order_type": null, //单据类型
				"imp_erp_type": null, //导ERP类型
				"fee_apply_code": null, //申请单号
				"form_template_id": null, //表单模板id
				"order_template_id": null, //单据模板id
				"order_template_name": null, //单据模板名称
				"form_template_name": null, //表单模板名称
				"biz_flag": null, //公私标志
				"apportion_amount": null, //调账总金额
				"currency_code": null, //币种编码
				"currency_name": null, //币种名称
				"company_id": null, //入账单位id
				"company_name": null,
				"ou_id": null, //经营单位
				"proxy_user": null, //代理用户
				"bank_name": null, //开户银行
				"bank_account": null, //银行账号
				"reason_desc": null, //调账事由
				"emscaapportionhexts": [], //扩展
				"emscaapportionls": [],
				"emscainvoicetaxrs": []

			}
		};
		//数据初始化------over
		$scope.emscaapportionls = {
			"tenant_id": null,
			"apportion_l_id": null,
			"apportion_id": null,
			"budget_amount": null,
			"approve_amount": null, //批准金额
			"currency_code": $scope.formdata.emsecfeereimh.currency_code,
			"currency_name": $scope.formdata.emsecfeereimh.currency_name, //币种名称
			"conversion_rate": null,
			"eco_type_id": null,
			"busi_org_id": null,
			"fee_type_id": null,
			"bill_type_id": null,
			"product_line_id": null,
			"fee_apply_id": null,
			"fee_apply_l_id": null,
			"recorded_company_id": 2,
			"imp_erp_type": null,
			"budget_node_id": 1,
			"budget_node_desc": null,
			"budget_headers_id": null,
			"debit_credit_type": "DR",
			"cust_trx_type_id": 1,
			"cust_trx_type_name": null,
			"project_code": null,
			"reason_desc": null, //调账事由
		}
		if($routeParams.obj != undefined && $routeParams.obj != null) {
			var apportion_id = $routeParams.obj;
			$http({
				method: 'GET',
				url: feelapplyUrl + 'ca/EmsCaApportionH/get/' + apportion_id
			}).success(function(response) {
				if(response.code == "0000") {
					$scope.saveDatas = response.data.emscaapportionh;
					$scope.ruzhangdanwei.company_name = $scope.saveDatas.company_name;
					$scope.add.desc = $scope.saveDatas.reason_desc;
					$scope.add.jz.name = $scope.saveDatas.imp_erp_type;
					$scope.formdata.emsecfeereimh.emscaapportionls = $scope.saveDatas.emscaapportionls;
					$scope.formdata.emsecfeereimh.currency_code = $scope.saveDatas.currency_code;
				} else {
					response.data.code;
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.body))
						.clickOutsideToClose(true)
						.title('提示信息')
						.textContent('访问服务器异常：' + response.code + response.msg)
						.ariaLabel('提示信息')
						.ok('确定')
					);
				}
			}).error(function() {
				console.log("shibai");
			});
		}

		$scope.saveData = function(e) {
			var valid = true;
			if($scope.ruzhangdanwei.company_name == null) {
				$mdToast.show(
					$mdToast.simple()
					.textContent('入账单位不能为空!')
					.position('top right')
					.hideDelay(3000)
				);
				return false;
			}
			if($scope.add.jz.name == null) {
				$mdToast.show(
					$mdToast.simple()
					.textContent('请选择导入ERP类型')
					.position('top right')
					.hideDelay(3000)
				);
				return false;
			}
			//明细列表预算部门值设置
			console.log($scope.formdata.emsecfeereimh.emscaapportionls)
			angular.forEach($scope.formdata.emsecfeereimh.emscaapportionls, function(data, index, array) {
				if(!data.ea) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('EA单号不能为空!')
						.position('top right')
						.hideDelay(3000)
					);
					valid = false;
					return false;
				}

				if(data.ea) {
					data.fee_apply_id = data.ea.fee_apply_id;
					data.fee_apply_l_id = data.ea.fee_apply_l_id;
				}
				if(data.budget.busiorg) {
					data.busi_org_id = data.budget.busiorg.busi_org_id;
				}
				if(data.budget.feenode) {
					data.fee_type_id = data.budget.feenode.fee_type_id;
				}
				if(data.budget.budgetunit) {
					data.budget_headers_id = data.budget.budgetunit.budget_headers_id;
					data.budget_node_desc = data.budget.budgetunit.budget_node_desc;
					data.budget_node_id = data.budget.budgetunit.budget_node_id;
				}
			});

			if(!valid) {
				return false;
			}
			console.log($scope.formdata.emsecfeereimh.emscaapportionls.ea);
			$http({
				method: 'POST',
				url: feelapplyUrl + 'ca/EmsCaApportionH/save',
				data: {
					"emscaapportionh": {
						"apportion_id": $routeParams.obj == null ? null : $scope.saveDatas.apportion_id,
						"tenant_id": null,
						"apportion_code": null,
						"apply_by": $scope.userId, //申请人id
						"apply_name": $scope.userName, //申请人姓名
						"apportion_date": $filter('date')($scope.formdata.emsecfeereimh.apportion_date, 'yyyy-MM-dd'),
						"org_id": 1,
						"org_name": "行政组织",
						//						"fee_apply_code": $scope.formdata.emsecfeereimh.emscaapportionls, //申请单号
						"position_id": null,
						"position_name": null,
						"apportion_amount": $scope.formdata.emsecfeereimh.apportion_amount,
						"approve_amount": null,
						"currency_code": "CNY",
						"currency_name": "人民币",
						"order_type": "ACCRUED", //单据类型
						"form_template_id": "32618430267916288",
						"form_template_name": "表单实例名称",
						"order_template_id": 1,
						"order_template_name": "单据模板名称",
						"process_def_id": null,
						"process_def_name": null,
						"biz_flag": 0,
						"order_status": null,
						"biz_status": null,
						"company_id": $scope.ruzhangdanwei.company_id, //入账单位id
						"company_name": $scope.ruzhangdanwei.company_name,
						"ou_id": $scope.ruzhangdanwei.ou_id, //经营单位
						"proxy_user": $scope.ruzhangdanwei.proxy_user, //代理用户
						"vendor_type": null,
						"vendor_id": null,
						"vendor_code": null,
						"vendor_name": "供应商",
						"vendor_site_id": 1,
						"vendor_site_code": 413200,
						"vendor_site_name": "顺德农商银行",
						"imp_erp_type": $scope.add.jz.name, //  导ERP类型
						"charge_against_id": null,
						"is_make_invoice": "Y",
						"gl_date": null,
						"against_date": null,
						"budget_code": null,
						"project_code": null,
						"contract_code": null,
						"reason_desc": $scope.add.desc, //描述
						"bank_account_id": 12345678,
						"bank_name": $scope.receving.bank_name, //开户银行
						"bank_account": $scope.receving.bank_account, //银行账号
						"customer_id": null,
						"customer_code": null,
						"customer_name": null,
						"customer_site_id": null,
						"customer_site_code": null,
						"customer_site_name": null,
						"invoice_type_code": null,
						"invoice_tax_code": null,
						"invoice_tax_amount": null,
						"receivables_trx_name": null,
						"receipt_type": null,
						"receivables_trx_id": null,
						"transit_code": null,
						"ccust_trx_type_id": null,
						"cust_trx_type_code": null,
						"cust_trx_type_name": null,
						"submited_time": null,
						"completed_time": null,
						"disabled_by": null,
						"disabled_name": null,
						"io_apportion_id": null,
						"source_system": null,
						"source_order_type": null,
						"source_order_id ": null,
						"source_order_code": null,
						"source_order_url": null,
						"source_processinst_id": null,
						"emscaapportionls": $scope.formdata.emsecfeereimh.emscaapportionls //明细

					}
				}

			}).success(function(data, status, headers, config) {

				if(data.code == "0000") {
					$mdToast.show(
						$mdToast.simple()
						.textContent('保存成功!')
						.position('top right')
						.hideDelay(3000)
					);
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
						.textContent('异常:' + data.msg + "(" + data.code + ")"));
				}

			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}

		/*-------保存数据结束------------*/
		console.log($scope.formdata.emsecfeereimh.emscaapportionls.fee_apply_code);
		//默认自带一条费用明细
		$scope.formdata.emsecfeereimh.emscaapportionls.push(angular.copy($scope.emscaapportionls));
		//添加费用明细
		$scope.onAddrichang = function() {
				$scope.formdata.emsecfeereimh.emscaapportionls.push(angular.copy($scope.emscaapportionls));
			}
			//单项目删除节点
		$scope.onDelEmseaapplyls = function(i) {
			$scope.formdata.emsecfeereimh.emscaapportionls.splice(i, 1);
			$scope.onCountmoney();
		};
		//合计总价格
		$scope.onCountmoney = function() {
			$scope.total = 0;
			angular.forEach($scope.formdata.emsecfeereimh.emscaapportionls, function(data, index, array) {
				data.budget_amount === undefined ? data.budget_amount = null : data.budget_amount;
				$scope.total += data.budget_amount;
			});

		}
		return mdaddBillP;

	});
	//控制器范围到此结束

});