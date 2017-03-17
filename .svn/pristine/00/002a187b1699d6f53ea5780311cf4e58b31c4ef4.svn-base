define(['angular'], function(angular) {
	/*添加日常申请*/
	var app = angular.module('mdaddrichang', []);
	app.controller('addrichangctrl', ['$scope', '$mdMedia', '$mdDialog', '$location', '$routeParams', '$filter', '$http', 'baseconfig', function($scope, $mdMedia, $mdDialog, $location, $routeParams, $filter, $http, baseconfig) {

		$scope.tmpdata = {
				applyUser: []
			}
		
		$scope.onDelApplyuser=function(i){
			$scope.tmpdata.applyUser.splice(i, 1);
		}
			//初始化日常申请数据
		$scope.formdata = {
			"emseaapplyh": {
				"fee_apply_id": null,
				"apply_by": 27203453130375168,
				"apply_name": "TEST110",
				"org_id": "27203592683257856",
				"org_name": "TEST110",
				"apply_date": $filter('date')(new Date(), 'yyyy-MM-dd'),
				"apply_amount": 22,
				"currency_code": "CNY",
				"currency_rate": 1,
				"currency_name": "人民币",
				"order_type": "TY",
				"form_template_id": "29771576253612032",
				"form_template_name": "费用申请表单",
				"reason_desc": "22222",
				"need_loan": "Y",
				"emseaapplyhexts": [],
				"order_template_id": "1",
				"order_template_name": "出差申请",
				"emseaapplytravelds": [],
				"emseaapplyls": [{
					"busi_org_id": 1212,
					"eco_type_id": 1212,
					"fee_type_id": 1212,
					"bill_type_id": 1212,
					"apply_amount": 22,
					"currency_code": "CNY",
					"currency_name": "人民币",
					"conversion_rate": 1,
					"fee_advance_date": $filter('date')(new Date(), 'yyyy-MM-dd'),
					"reason_desc": "1212",
					"project_code": "1212",
					"product_line_id": "1212",
					"budget_node_id": 34833175754571776,
					"budget_node_desc": "1212",
					"budget_headers_id": 34827783620263936
				}],
				"emslmloan": {
					"apply_by": 27203453130375168,
					"apply_name": "TEST110",
					"tenant_id": 27203592670674944,
					"order_type": "123",
					"currency_code": "CNY",
					"org_id": 1234,
					"org_name": "12345",
					"currency_name": "人民币",
					"form_template_id": "29771576253612032",
					"form_template_name": "费用申请表单",
					"order_template_id": "1",
					"order_template_name": "出差申请",
					"amount": "123",
					"payment_method": "123",
					"expected_repay_date": $filter('date')(new Date(), 'yyyy-MM-dd'),
					"company_id": "123",
					"ou_id": "123",
					"proxy_user": "123",
					"vendor_type": "123",
					"vendor_id": "123",
					"vendor_code": "123",
					"vendor_name": "123",
					"vendor_site_id": "123",
					"vendor_site_code": "123",
					"vendor_site_name": "123",
					"receiver": "123",
					"biz_flag": 0,
					"bank_name": "123",
					"bank_account": "123",
					"bank_code": "123",
					"receiver_en": "123",
					"provice": "123",
					"city": "123",
					"bank_adress": "123",
					"project_code": "123",
					"sensitive_info": "123",
					"emslmloanexts": [{
						"field_name": "123",
						"key_desc": "123",
						"field_value": "123",
						"field_type": "1",
						"field_level": "1"
					}]
				}
			}
		};
		//查询日常申请数据
		if($routeParams.obj) {
			$http({
				method: 'POST',
				url: feelapplyUrl + 'ea/feeApply/getFeeApplyById',
				data: {
					"tenant_id": null,
					"user_id": null,
					"fee_apply_id": $routeParams.obj
				}
			}).success(function(data, status, headers, config) {
				console.log(data);
				$scope.emseaapplyh = {
					"fee_apply_id": data.data.emseaapplyh.fee_apply_id,
					"apply_by": data.data.emseaapplyh.apply_by,
					"apply_name": data.data.emseaapplyh.apply_name,
					"org_id": data.data.emseaapplyh.org_id,
					"org_name": data.data.emseaapplyh.org_name,
					"applyDate": new Date(data.data.emseaapplyh.apply_date),
					"apply_amount": data.data.emseaapplyh.apply_amount,
					"currency_code": data.data.emseaapplyh.currency_code,
					"currency_name": data.data.emseaapplyh.currency_name,
					"order_type": "TY",
					"form_template_id": "EA_TY",
					"form_template_name": "日常费用申请",
					"reason_desc": data.data.emseaapplyh.reason_desc,
					"need_loan": "N",
					"emseaapplyhexts": [],
					"applyUser": [],

				};
				if(data.data.emseaapplyh.apply_name) {
					$scope.emseaapplyh.applyUser.push({
						"user_id": data.data.emseaapplyh.apply_by,
						"user_full_name": data.data.emseaapplyh.apply_name,
						"org_id": data.data.emseaapplyh.org_id,
						"org_name": data.data.emseaapplyh.org_name,
					});
				}
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		} else {
			//获取表单模版ID	
			$http({
				method: 'POST',
				url: feelapplyUrl + '/cm/formTemplate/getFormTemplates',
				data: {
					"module_type": "EA",
					"order_type": "TY",
				},
			}).success(function(data, status, headers, config) {
				console.log(data);
				if(data.code == "0000") {
					$scope.formdata.emseaapplyh.form_template_id = data.data.info[0].form_template_id;
					$scope.formdata.emseaapplyh.form_template_name = data.data.info[0].form_template_name;
					$scope.formdata.emseaapplyh.order_template_id = data.data.info[0].order_template_id;
					$scope.formdata.emseaapplyh.order_template_name = data.data.info[0].order_template_name;
					$scope.formdata.emseaapplyh.order_type = data.data.info[0].order_type;
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果')
						.textContent('获取表单模版:' + data.msg + '(' + data.code + ')').ariaLabel('提交结果').ok('关闭'));
				}
			}).error(function(data, status, headers, config) {});
		}
		$scope.applyname = null;
		$scope.currencys = baseconfig.currencys;
		$scope.onNext = function(ev, form) {
			/*表单*/
			var form = angular.copy($scope.emseaapplyh);
			var postform = {
				'emseaapplyh': form,
			};
			postform.emseaapplyh.apply_date = $filter('date')(postform.emseaapplyh.apply_date, 'yyyy-MM-dd');
			if(form.applyUser.length > 0) {
				postform.emseaapplyh.apply_by = form.applyUser[0].user_id;
				postform.emseaapplyh.apply_name = form.applyUser[0].user_full_name;
				postform.emseaapplyh.org_id = form.applyUser[0].org_id;
				postform.emseaapplyh.org_name = form.applyUser[0].org_name;
			}
			console.log(postform);
			$http({
				method: 'POST',
				url: feelapplyUrl + 'ea/feeApply/saveFeeApply',
				data: postform,
			}).success(function(data, status, headers, config) {
				console.log(data);
				if(data.code == "0000" && data.data.emseaapplyh.fee_apply_id) {
					$scope.emseaapplyh.fee_apply_id = data.data.emseaapplyh.fee_apply_id;
					console.log('校验申请');
					$http({
						method: 'POST',
						url: feelapplyUrl + 'ea/feeApply/checkFeeApply',
						data: {
							"tenant_id": null,
							"user_id": null,
							"fee_apply_id": data.data.emseaapplyh.fee_apply_id
						},
					}).success(function(data, status, headers, config) {
						console.log(data);
						if(data.code == "0000") {
							console.log('校验成功');
							$location.url("/feeapply/applyProcess");
						} else {
							var msg = "";
							angular.forEach(data.data.list, function(value) {
								msg += value.error_msg + ";";
							});
							$mdDialog.show($mdDialog.alert().title('提交结果').textContent(data.msg + msg + '(' + data.code + ')').ariaLabel('提交结果').ok('关闭'));
						}

					}).error(function(data, status, headers, config) {
						console.log(data);
					});
				}
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}
		$scope.onDelEmseaapplyls = function(i) {
			$scope.formdata.emseaapplyh.emseaapplyls.splice(i, 1);
			$scope.countmoney();
		};
		$scope.onMulDelEmseaapplyls = function(i) {
			console.log($scope.selected);
			angular.forEach($scope.selected, function(data, index, array) {
				var num = $scope.formdata.emseaapplyh.emseaapplyls.indexOf(data);
				if(num > -1) {
					console.log(num);
					$scope.formdata.emseaapplyh.emseaapplyls.splice(num, 1);
					$scope.countmoney();
				}
			})

		};
		$scope.countmoney = function() {
			var total = 0;
			angular.forEach($scope.formdata.emseaapplyh.emseaapplyls, function(data, index, array) {
				total += data.apply_amount;
			});
			$scope.formdata.emseaapplyh.apply_amount = total;
		}
		$scope.onOpenAddrichang = function(ev, item) {
				$mdDialog.show({
						controller: DialogController,
						templateUrl: 'templates/feeapply/addrichangDetail.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: true
					})
					.then(function(answer) {
						console.log(answer);
						if(answer.$$hashKey) {
							angular.forEach($scope.formdata.emseaapplyh.emseaapplyls, function(data, index, array) {
								if(data.$$hashKey == answer.$$hashKey) {
									data.busi_org_id = answer.busi_org_id;
									data.eco_type_id = answer.eco_type_id;
									data.fee_type_id = answer.fee_type_id;
									data.bill_type_id = answer.bill_type_id;
									data.apply_amount = answer.apply_amount;
									data.currency_code = answer.currency_code;
									data.currency_name = answer.currency_name;
									data.conversion_rate = answer.conversion_rate;
									data.fee_advance_date = answer.fee_advance_date;
									data.reason_desc = answer.reason_desc;
									data.project_code = answer.project_code;
									data.product_line_id = answer.product_line_id;
									data.budget_node_id = answer.budget_node_id;
									data.budget_node_desc = answer.budget_node_desc;
									data.budget_headers_id = answer.budget_headers_id;
								}
							});

						} else {
							$scope.formdata.emseaapplyh.emseaapplyls.push(answer);
						}
						$scope.countmoney();

					}, function() {
						$scope.status = 'You cancelled the dialog.';
					});

				function DialogController($scope, $mdDialog) {
					$scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
					$scope.answer = function(answer) {
						$mdDialog.hide(answer);
					};
					if(item) {
						$scope.form = item;
					} else {
						$scope.form = {
							"busi_org_id": 1212,
							"eco_type_id": 1212,
							"fee_type_id": 1212,
							"bill_type_id": 1212,
							"apply_amount": 0,
							"currency_code": "CNY",
							"currency_name": "人民币",
							"conversion_rate": 1,
							"fee_advance_date": $filter('date')(new Date(), 'yyyy-MM-dd'),
							"reason_desc": "",
							"project_code": "",
							"product_line_id": "",
							"budget_node_id": 34833175754571776,
							"budget_node_desc": "1212",
							"budget_headers_id": 34827783620263936
						}
					}

				}
			}
			//明细选择项目
		$scope.selected = [];
		$scope.query = {
			order: 'name',
			limit: 10,
			page: 1,
		};
	}]);
});