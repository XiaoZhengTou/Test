define(['angular'], function(angular) {
	/*添加日常申请*/
	var app = angular.module('mdaddrichang', []);
	app.controller('addrichangctrl', ['$scope', '$mdMedia', '$mdDialog', '$location', '$routeParams', '$filter', '$http', '$mdToast', 'baseconfig', function($scope, $mdMedia, $mdDialog, $location, $routeParams, $filter, $http, $mdToast, baseconfig) {
		//货币类型

		$scope.currencys = {};
		//初始化日常申请数据
		$scope.formdata = {
			"tenant_id": null,
			"user_id": null,
			"emsecfeereimh": {
				"tmp_applyUser": [],
				"fee_reim_id": null,
				"tenant_id": null,
				"reim_date": null,
				"apply_by": null,
				"apply_name": null,
				"org_id": null,
				"org_name": null,
				"position_id": null,
				"position_name": null,
				"order_type": null,
				"pay_type": null,
				"form_template_id": null,
				"form_template_name": null,
				"biz_flag": null,
				"company_id": null,
				"ou_id": null,
				"proxy_user": null,
				"pay_company_id": null,
				"pay_ou_id": null,
				"pay_proxy_user": null,
				"vendor_id": null,
				"vendor_code": null,
				"vendor_name": null,
				"vendor_site_id": null,
				"vendor_site_code": null,
				"vendor_site_name": null,
				"receiver": null,
				"bank_name": null,
				"bank_account": null,
				"bank_code": null,
				"currency_code": null,
				"currency_name": null,
				"apply_reim_amount": null,
				"payment_method": null,
				"is_instalments_pay": "N",
				"pay_amount": null,
				"is_over_standard": null,
				"over_standard_reason": null,
				"need_app_loan": 'Y',
				"need_input_tax": 'Y',
				"sensitive_info": null,
				"emsecfeebudgets": [],
				"emsecfeeloans": [],
				"emsecinvoicetaxrs": []

			}
		};

		//明细
		$scope.emsecfeebudget = {
			"fee_budget_id": null,
			"tenant_id": null,
			"fee_reim_id": null,
			"eco_type_id": null,
			"busi_org_id": null,
			"fee_type_id": null,
			"bill_type_id": null,
			"product_line_id": null,
			"project_code": null,
			"fee_apply_id": null,
			"fee_apply_l_id": null,
			"budget_node_id": null,
			"budget_node_desc": null,
			"budget_headers_id": null,
			"apply_reim_amount": null,
			"is_last_reim": null,
			"recorded_company_id": null,
			"sensitive_info": null

		}

		$scope.emsecfeeloan = {
			"fee_loan_id": null,
			"tenant_id": null,
			"fee_reim_id": null,
			"loan_info_id": null,
			"already_repay_amount": null,
			"repay_amount": null

		}

		$scope.emsecinvoicetaxr = {
			"invoice_tax_r_id": null,
			"fee_reim_id": null,
			"bill_type_id": null,
			"invoice_maker": null,
			"invoice_num": null,
			"invoice_type": null,
			"invoice_date": null,
			"invoice_amount": null,
			"tax_rate": null,
			"tax_amount": null,
			"remark": null
		}

		$scope.invoicetypes = [{
			"id": 1,
			"name": "3点税率"
		}, {
			"id": 1,
			"name": "4点税率"
		}, {
			"id": 1,
			"name": "5点税率"
		}, {
			"id": 1,
			"name": "6点税率"
		}, {
			"id": 1,
			"name": "7点税率"
		}]

		$scope.ruzhangdanwei = {}; //入账单位
		$scope.budgets = {}; //预算树
		//入账单位初始值
		$scope.receving = {};
		$scope.formdata.emsecfeereimh.tmp_applyUser=[];
		/*----------保存表单---------*/
		$scope.saveData = function(e) {
				//验证

				var valid = true;
				if ($scope.formdata.emsecfeereimh.tmp_applyUser[0] == null) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('申请人不能为空!')
						.position('top right')
						.hideDelay(3000)
					);
					return false;
				}

				if ($scope.formdata.emsecfeereimh.payment_method == null) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('请选择付款方式!')
						.position('top right')
						.hideDelay(3000)
					);
					return false;
				}

				//明细列表预算部门值设置
				angular.forEach($scope.formdata.emsecfeereimh.emsecfeebudgets, function(data, index, array) {

					if (!data.ea) {
						$mdToast.show(
							$mdToast.simple()
							.textContent('申请单号不能为空!')
							.position('top right')
							.hideDelay(3000)
						);
						valid = false;
						return false;
					}

					if (data.ea) {
						data.fee_apply_id = data.ea.fee_apply_id;
						data.fee_apply_code = data.ea.fee_apply_code;
						data.fee_apply_l_id = data.ea.fee_apply_l_id;
					}
					if (data.budget.busiorg) {
						data.busi_org_id = data.budget.busiorg.busi_org_id;
					}
					if (data.budget.feenode) {
						data.fee_type_id = data.budget.feenode.fee_type_id;
					}
					if (data.budget.budgetunit) {
						data.budget_headers_id = data.budget.budgetunit.budget_headers_id;
						data.budget_node_desc = data.budget.budgetunit.budget_node_desc;
						data.budget_node_id = data.budget.budgetunit.budget_node_id;
					}
				});

				//核销贷款/预付款值设置
				angular.forEach($scope.formdata.emsecfeereimh.emsecfeeloans, function(data, index, array) {
					if (data.borrowing) {
						data.loan_info_id = data.borrowing.loan_info_id;
						data.already_repay_amount = data.borrowing.approve_amount;
					} else {
						$mdToast.show(
							$mdToast.simple()
							.textContent('贷款单号不能为空!')
							.position('top right')
							.hideDelay(3000)
						);
						valid = false;
						return false;
					}

				});

				angular.forEach($scope.formdata.emsecfeereimh.emsecinvoicetaxrs, function(data, index, array) {
					data.invoice_date = $filter('date')(data.invoice_date, 'yyyy-MM-dd');
				});

				if (!valid) {
					return false;
				}

				$scope.param = {
					"tenant_id": null,
					"user_id": null,
					"emsecfeereimh": {
						"fee_reim_id": null,
						"order_template_id": 6,
						"order_template_name": "报销申请",
						"tenant_id": null,
						"reim_date": $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
						"apply_by": $scope.formdata.emsecfeereimh.tmp_applyUser[0].user_id, //申请人
						"apply_name": $scope.formdata.emsecfeereimh.tmp_applyUser[0].user_full_name, //申请人姓名
						"org_id": $scope.formdata.emsecfeereimh.tmp_applyUser[0].org_id,
						"org_name": $scope.formdata.emsecfeereimh.tmp_applyUser[0].org_name,
						"order_type": "TY",
						"pay_type": null,
						"form_template_id": "32618007297523712",
						"form_template_name": "费用报销表单",
						"biz_flag": "1",
						"company_id": $scope.ruzhangdanwei.company_id, //入账单位
						"ou_id": $scope.ruzhangdanwei.ou_id,
						"proxy_user": $scope.ruzhangdanwei.proxy_user,
						"receiver": $scope.receving.receiver, //收款方
						"vendor_id": $scope.receving.vendor_id,
						"vendor_code": $scope.receving.vendor_code,
						"vendor_site_id": $scope.receving.vendor_site_id,
						"vendor_site_code": $scope.receving.vendor_site_code,
						"vendor_site_name": $scope.receving.vendor_site_name,
						"bank_name": $scope.receving.bank_name,
						"bank_account": $scope.receving.bank_account,
						"currency_code": $scope.formdata.emseaapplyh.currency_code,
						"currency_name": $scope.formdata.emseaapplyh.currency_name,
						"apply_reim_amount": $scope.formdata.emsecfeereimh.apply_reim_amount,
						"payment_method": $scope.formdata.emsecfeereimh.payment_method, //付款方式
						"is_instalments_pay": $scope.formdata.emsecfeereimh.is_instalments_pay,
						"pay_amount": $scope.formdata.emsecfeereimh.pay_amount, //本次付款金额
						"over_standard_reason": null,
						"need_app_loan": $scope.formdata.emsecfeereimh.need_app_loan,
						"need_input_tax": $scope.formdata.emsecfeereimh.need_input_tax,
						"sensitive_info": $scope.formdata.emsecfeereimh.reason_desc, //业务描述
						"emsecfeebudgets": $scope.formdata.emsecfeereimh.emsecfeebudgets,
						"emsecfeeloans": $scope.formdata.emsecfeereimh.emsecfeeloans,
						"emsecinvoicetaxrs": $scope.formdata.emsecfeereimh.emsecinvoicetaxrs,

					}
				};

				console.log($scope.param)

				$http({
					method: 'POST',
					url: feelapplyUrl + 'ec/feeReim/saveFeeReim',
					data: $scope.param
				}).success(function(data, status, headers, config) {
					if (data.code == "0000") {
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
				e.preventDefault();
			}
			/*----------------------保存表单结束 --------------------*/

		//修改编辑一条信息
		if ($routeParams.obj != undefined && $routeParams.obj != null) {
			 var fee_reim_id = $routeParams.obj;
			var edit = function() {
				$http({
						method: 'POST',
						url: feelapplyUrl + 'ec/feeReim/getFeeReimById',
					data:{
							"tenant_id": null,
							"user_id": null,
							"fee_reim_id":fee_reim_id
						}
					})
					.success(function(response) {
						console.log(response);
						if (response.code == "0000") {
                             $scope.formdata.emsecfeereimh=response.data.emsecfeereimh;
                             console.log( $scope.formdata.emsecfeereimh);
//						    $scope.receving.receiver = response.data.emsecfeereimh.receiver;
						    $scope.ruzhangdanwei.company_name=response.data.emsecfeereimh.company_id
//						    $scope.formdata.emsecfeereimh.tmp_applyUser.user_full_name=response.data.emsecfeereimh.apply_name;
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

			edit();
		}

		//默认自带一条费用明细
		$scope.formdata.emsecfeereimh.emsecfeebudgets.push(angular.copy($scope.emsecfeebudget));

		//默认自带一条核销贷款
		$scope.formdata.emsecfeereimh.emsecfeeloans.push(angular.copy($scope.emsecfeeloan));

		//默认自带一条税票
		$scope.formdata.emsecfeereimh.emsecinvoicetaxrs.push(angular.copy($scope.emsecinvoicetaxr));

		//合计总价格
		$scope.onCountmoney = function() {
			var total = 0;
			angular.forEach($scope.formdata.emsecfeereimh.emsecfeebudgets, function(data, index, array) {
				console.log(data);
				total += data.apply_reim_amount;
			});
			$scope.formdata.emsecfeereimh.apply_reim_amount = total;
			console.log($scope.formdata.emsecfeereimh.apply_reim_amount)
		}

		//添加费用明细
		$scope.onAddrichang = function() {
			$scope.formdata.emsecfeereimh.emsecfeebudgets.push(angular.copy($scope.emsecfeebudget));
		}

		//单项目删除节点
		$scope.onDelEmseaapplyls = function(i) {
			$scope.formdata.emsecfeereimh.emsecfeebudgets.splice(i, 1);
			$scope.onCountmoney();
		};

		//添加核销贷款
		$scope.addEmsecfeeloan = function() {
			$scope.formdata.emsecfeereimh.emsecfeeloans.push(angular.copy($scope.emsecfeeloan));
		}

		//核销贷款删除节点
		$scope.delEmsecfeeloan = function(i) {
			$scope.formdata.emsecfeereimh.emsecfeeloans.splice(i, 1);
		};

		//添加税票
		$scope.addEmsecinvoicetaxr = function() {
			$scope.formdata.emsecfeereimh.emsecinvoicetaxrs.push(angular.copy($scope.emsecinvoicetaxr));
		}

		//税票删除节点
		$scope.delEmsecinvoicetaxr = function(i) {
			$scope.formdata.emsecfeereimh.emsecinvoicetaxrs.splice(i, 1);
		};

	}]);
});