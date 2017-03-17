define(['angular'], function(angular) {
	/*添加日常申请*/
	var app = angular.module('mdaddfeeapply', []);
	app.controller('addfeeapplyctrl', ['$scope', '$mdMedia', '$mdDialog', '$location', '$routeParams', '$filter', '$http', function($scope, $mdMedia, $mdDialog, $location, $routeParams, $filter, $http) {
		//添加类型
		$scope.kind = "TY";
		$scope.id = $routeParams.id;
		if($routeParams.kind) {
			$scope.kind = $routeParams.kind;
		}
		$scope.hotel = "hotel";
		//预算明细
		$scope.emseaapplyls = {
				//预算部门组织单元
				'budget': {
					'busiorg': "null",//保存busi_org_id
					'feenode': null,//保存fee_type_id
					'budgetunit': null//保存budget_headers_id"budget_node_desc""budget_headers_id"
				},
				"busi_org_id": null,
				"eco_type_id": null,
				"fee_type_id": null,
				"bill_type_id": null,
				/*基础科目ID*/
				"apply_amount": 0,
				"currency_code": null,//保存$scope.formdata.emseaapplyh.currency_code;
				"currency_name": null,
				"conversion_rate": 1,
				"fee_advance_date": $filter('date')(new Date(), 'yyyy-MM-dd'),
				"reason_desc": null,
				"project_code": null,
				"product_line_id": null,
				"budget_node_id": null,
				"budget_node_desc": null,
				"budget_headers_id": null
			}
			//差旅行程列表
		$scope.emseaapplytravelds = {
				'apply_travel_id': null,
				'fee_apply_id': null,
				'tenant_id': null,
				'start_date': null,
				'end_date': null,
				'from_area_name': null,
				'from_area_code': null,
				'to_area_codes': null,
				'to_area_names': null,
				'travel_persons': null,
				'travel_persons_name': null,
				'trip_type': null,
				'travel_days': null,
				'tmp_applyUser': [],//里面装的travel_persons，travel_persons_name
				'tmp_from_area': [],//里面装的from_area_code,from_area_name
				'tmp_to_area': []//里面装to_area_codes，to_area_names
			}
			//是否报销 tmp_receiver收款方
		$scope.emslmloan = {
			"tmp_applyUser": [],//里面有apply_by，apply_name，org_id，org_name，proxy_user
			"tmp_vendor": null,//里面有"vendor_type""vendor_id""vendor_code""vendor_name""vendor_site_id""vendor_site_code""vendor_site_name"
			"tmp_company": null,//里面有company_id，ou_id，company_name，proxy_user
			"tmp_receiver": null,//里面有bank_account，bank_adress，bank_code，bank_name，receiver_en，receiver
			"apply_by": null,
			"apply_name": null,
			"tenant_id": null,
			"order_type": null,
			"org_id": null,
			"org_name": null,
			"currency_code": null,
			"currency_name": null,
			"form_template_id": null,
			"form_template_name": null,
			"order_template_id": null,
			"order_template_name": null,
			"amount": null,
			"payment_method": null,
			"expected_repay_date": new Date(),
			"company_id": null,
			"ou_id": null,
			"proxy_user": null,
			"vendor_type": null,
			"vendor_id": null,
			"vendor_code": null,
			"vendor_name": null,
			"vendor_site_id": null,
			"vendor_site_code": null,
			"vendor_site_name": null,
			"receiver": null,
			"biz_flag": 0,
			"bank_name": null,
			"bank_account": null,
			"bank_code": null,
			"receiver_en": null,
			"provice": null,
			"city": null,
			"bank_adress": null,
			"project_code": null,
			"sensitive_info": null,
			"emslmloanexts": []
		};
		//初始化日常申请数据报文
		$scope.formdata = {
			"emseaapplyh": {
				"tmp_applyUser": [],//里面装了emseaapplyh.apply_by,emseaapplyh.apply_name,emseaapplyh.org_id,emseaapplyh.org_name
				"tmp_currency": null,//里面装emseaapplyh.currency_code，emseaapplyh.currency_name
				"fee_apply_id": null,//自己
				"apply_by": null,//自己
				"apply_name": null,//自己
				"formInstanceId": null,//自己
				"org_id": null,//自己
				"org_name": null,//自己
				"apply_date": $filter('date')(new Date(), 'yyyy-MM-dd'),//自己
				"apply_amount": 0,//自己
				"currency_code": null,//自己
				"currency_rate": 1,
				"currency_name": null,//自己
				"order_type": $scope.kind,
				"form_template_id": null,//自己
				"form_template_name": null,//自己
				"reason_desc": null,//自己
				"need_loan": false,//自己
				/*最终的值是Y/N */
				"emseaapplyhexts": [],
				"order_template_id": null,//自己
				"order_template_name": null,//自己
				"emseaapplytravelds": [],
				"emseaapplyls": [],
				"emslmloan": $scope.emslmloan
			}
		};

		//获取费用申请详情
		$scope.getEmsEAApply = function(emseaapply, feeApplyById) {
			$http({
				method: 'POST',
				url: feelapplyUrl + 'ea/feeApply/getFeeApplyById',
				data: {
					"tenant_id": null,
					"user_id": null,
					"fee_apply_id": feeApplyById
				},
				headers: {
					'x-auth-token': sessionStorage.Token
				}
			}).success(function(data, status, headers, config) {
				console.log(data);
				if(data.code == "0000"){
					console.log(emseaapply);
					if(data.data && data.data.emseaapplyh) {
						//费用申请申请人
						if(data.data.emseaapplyh.apply_by) {
							emseaapply.emseaapplyh.tmp_applyUser = [{
								'user_id': data.data.emseaapplyh.apply_by ? data.data.emseaapplyh.apply_by : null,
								'user_full_name': data.data.emseaapplyh.apply_name ? data.data.emseaapplyh.apply_name : null,
								'org_id': data.data.emseaapplyh.org_id ? data.data.emseaapplyh.org_id : null,
								'org_name': data.data.emseaapplyh.org_name ? data.data.emseaapplyh.org_name : null
							}];
						}
						emseaapply.emseaapplyh.tmp_currency = {
							"currency_code": data.data.emseaapplyh.currency_code ? data.data.emseaapplyh.currency_code : null,
							"currency_name": data.data.emseaapplyh.currency_name ? data.data.emseaapplyh.currency_name : null
						};
						emseaapply.emseaapplyh.fee_apply_id = data.data.emseaapplyh.fee_apply_id ? data.data.emseaapplyh.fee_apply_id : null;
						emseaapply.emseaapplyh.apply_by = data.data.emseaapplyh.apply_by ? data.data.emseaapplyh.apply_by : null;
						emseaapply.emseaapplyh.apply_name = data.data.emseaapplyh.apply_name ? data.data.emseaapplyh.apply_name : null;
						emseaapply.emseaapplyh.formInstanceId = data.data.emseaapplyh.formInstanceId ? data.data.emseaapplyh.formInstanceId : null;
						emseaapply.emseaapplyh.org_id = data.data.emseaapplyh.org_id ? data.data.emseaapplyh.org_id : null;
						emseaapply.emseaapplyh.org_name = data.data.emseaapplyh.org_name ? data.data.emseaapplyh.org_name : null;
						emseaapply.emseaapplyh.apply_date = new Date(data.data.emseaapplyh.apply_date);
						emseaapply.emseaapplyh.apply_amount = data.data.emseaapplyh.apply_amount ? data.data.emseaapplyh.apply_amount : null;
						emseaapply.emseaapplyh.currency_code = data.data.emseaapplyh.currency_code ? data.data.emseaapplyh.currency_code : null;
						emseaapply.emseaapplyh.currency_rate = data.data.emseaapplyh.currency_rate ? data.data.emseaapplyh.currency_rate : null;
						emseaapply.emseaapplyh.currency_name = data.data.emseaapplyh.currency_name ? data.data.emseaapplyh.currency_name : null;
						emseaapply.emseaapplyh.order_type = data.data.emseaapplyh.order_type ? data.data.emseaapplyh.order_type : null;
						emseaapply.emseaapplyh.form_template_id = data.data.emseaapplyh.form_template_id ? data.data.emseaapplyh.form_template_id : null;
						emseaapply.emseaapplyh.form_template_name = data.data.emseaapplyh.form_template_name ? data.data.emseaapplyh.form_template_name : null;
						emseaapply.emseaapplyh.reason_desc = data.data.emseaapplyh.reason_desc ? data.data.emseaapplyh.reason_desc : null;
						emseaapply.emseaapplyh.need_loan = data.data.emseaapplyh.need_loan ? (data.data.emseaapplyh.need_loan == "Y") : false;
						emseaapply.emseaapplyh.order_template_id = data.data.emseaapplyh.order_template_id ? data.data.emseaapplyh.order_template_id : null;
						emseaapply.emseaapplyh.order_template_name = data.data.emseaapplyh.order_template_name ? data.data.emseaapplyh.order_template_name : null;
						/*预算明细*/
						angular.forEach(data.data.emseaapplyh.emseaapplyls, function(data) {
							emseaapply.emseaapplyh.emseaapplyls.push({
								'budget': {
									'busiorg': "null",
									'feenode': null,
									'budgetunit': null
								},
								"busi_org_id": data.busi_org_id ? data.busi_org_id : null,
								"eco_type_id": data.eco_type_id ? data.eco_type_id : null,
								"fee_type_id": data.fee_type_id ? data.fee_type_id : null,
								"bill_type_id": data.bill_type_id ? data.bill_type_id : null,
								/*基础科目ID*/
								"apply_amount": data.apply_amount ? data.apply_amount : null,
								"currency_code": data.currency_code ? data.currency_code : null,
								"currency_name": data.currency_name ? data.currency_name : null,
								"conversion_rate": data.conversion_rate ? data.conversion_rate : null,
								"fee_advance_date": data.fee_advance_date ? data.fee_advance_date : null,
								"reason_desc": data.reason_desc ? data.reason_desc : null,
								"project_code": data.project_code ? data.project_code : null,
								"product_line_id": data.product_line_id ? data.product_line_id : null,
								"budget_node_id": data.budget_node_id ? data.budget_node_id : null,
								"budget_node_desc": data.budget_node_desc ? data.budget_node_desc : null,
								"budget_headers_id": data.budget_headers_id ? data.budget_headers_id : null
							});
						});
						/*差旅详情*/
						angular.forEach(data.data.emseaapplyh.emseaapplytravelds, function(travelds_data) {
							//							console.log(travelds_data);
							var from_area_code_array = travelds_data.from_area_code ? travelds_data.from_area_code.split(',') : null;
							var from_area_name_array = travelds_data.from_area_name ? travelds_data.from_area_name.split(',') : null;
							var to_area_codes_array = travelds_data.to_area_codes ? travelds_data.to_area_codes.split(',') : null;
							var to_area_names_array = travelds_data.to_area_names ? travelds_data.to_area_names.split(',') : null;
							var travel_persons_array = travelds_data.travel_persons ? travelds_data.travel_persons.split(',') : null;
							var travel_persons_name_array = travelds_data.travel_persons_name ? travelds_data.travel_persons_name.split(',') : null;
							travelds_data.tmp_from_area = [];
							if(from_area_code_array && from_area_name_array && (from_area_code_array.length == from_area_name_array.length)) {
								for(var l in from_area_code_array) {
									travelds_data.tmp_from_area.push({
										"flightCityCode": from_area_code_array[l],
										"text": from_area_name_array[l]
									});
								}
							}

							travelds_data.tmp_to_area = [];
							if(to_area_codes_array && to_area_names_array && (to_area_codes_array.length == to_area_names_array.length)) {
								for(var j in to_area_codes_array) {
									travelds_data.tmp_to_area.push({
										"flightCityCode": to_area_codes_array[j],
										"text": to_area_names_array[j]
									});
								}
							}

							travelds_data.tmp_applyUser = [];
							if(travel_persons_array && travel_persons_name_array && (travel_persons_array.length == travel_persons_name_array.length))
								for(var k in travel_persons_array) {
									travelds_data.tmp_applyUser.push({
										"user_id": travel_persons_array[k],
										"user_full_name": travel_persons_name_array[k]
									});
								}
							emseaapply.emseaapplyh.emseaapplytravelds.push({
								'apply_travel_id': travelds_data.apply_travel_id,
								'fee_apply_id': data.data.emseaapplyh.fee_apply_id,
								'tenant_id': travelds_data.apply_travel_id,
								'start_date': new Date(travelds_data.start_date),
								'end_date': new Date(travelds_data.end_date),
								'from_area_name': null,
								'from_area_code': null,
								'to_area_codes': null,
								'to_area_names': null,
								'travel_persons': null,
								'travel_persons_name': null,
								'trip_type': travelds_data.trip_type,
								'travel_days': parseInt(travelds_data.travel_days),
								'tmp_applyUser': travelds_data.tmp_applyUser,
								'tmp_from_area': travelds_data.tmp_from_area,
								'tmp_to_area': travelds_data.tmp_to_area
							});
						});
						/*借还款*/
						if(emseaapply.emseaapplyh.need_loan && data.data.emseaapplyh.emslmloan) {
							emseaapply.emseaapplyh.emslmloan = $scope.emslmloan;
							//借款申请人
							if(data.data.emseaapplyh.emslmloan.apply_by) {
								emseaapply.emseaapplyh.emslmloan.tmp_applyUser = [{
									'user_id': data.data.emseaapplyh.emslmloan.apply_by,
									'user_full_name': data.data.emseaapplyh.emslmloan.apply_name,
									'org_id': data.data.emseaapplyh.emslmloan.org_id,
									'org_name': data.data.emseaapplyh.emslmloan.org_name
								}];
							}
							//转换日期格式
							emseaapply.emseaapplyh.emslmloan.apply_by = data.data.emseaapplyh.emslmloan.apply_by;
							emseaapply.emseaapplyh.emslmloan.apply_name = data.data.emseaapplyh.emslmloan.apply_name;
							emseaapply.emseaapplyh.emslmloan.tenant_id = data.data.emseaapplyh.emslmloan.tenant_id;
							emseaapply.emseaapplyh.emslmloan.order_type = data.data.emseaapplyh.emslmloan.order_type;
							emseaapply.emseaapplyh.emslmloan.org_id = data.data.emseaapplyh.emslmloan.org_id;
							emseaapply.emseaapplyh.emslmloan.org_name = data.data.emseaapplyh.emslmloan.org_name;
							emseaapply.emseaapplyh.emslmloan.currency_code = data.data.emseaapplyh.emslmloan.currency_code;
							emseaapply.emseaapplyh.emslmloan.currency_name = data.data.emseaapplyh.emslmloan.currency_name;
							emseaapply.emseaapplyh.emslmloan.form_template_id = data.data.emseaapplyh.emslmloan.form_template_id;
							emseaapply.emseaapplyh.emslmloan.form_template_name = data.data.emseaapplyh.emslmloan.form_template_name;
							//emseaapply.emseaapplyh.emslmloan.order_template_id = data.data.emseaapplyh.emslmloan.order_template_id;
							//emseaapply.emseaapplyh.emslmloan.order_template_name = data.data.emseaapplyh.emslmloan.order_template_name;
							emseaapply.emseaapplyh.emslmloan.amount = data.data.emseaapplyh.emslmloan.amount;
							emseaapply.emseaapplyh.emslmloan.payment_method = data.data.emseaapplyh.emslmloan.payment_method;
							emseaapply.emseaapplyh.emslmloan.expected_repay_date = new Date(data.data.emseaapplyh.emslmloan.expected_repay_date);
							emseaapply.emseaapplyh.emslmloan.company_id = data.data.emseaapplyh.emslmloan.company_id;
							emseaapply.emseaapplyh.emslmloan.ou_id = data.data.emseaapplyh.emslmloan.ou_id;
							//emseaapply.emseaapplyh.emslmloan.proxy_user = data.data.emseaapplyh.emslmloan.proxy_user;
							emseaapply.emseaapplyh.emslmloan.vendor_type = data.data.emseaapplyh.emslmloan.vendor_type;
							emseaapply.emseaapplyh.emslmloan.vendor_id = data.data.emseaapplyh.emslmloan.vendor_id;
							emseaapply.emseaapplyh.emslmloan.vendor_code = data.data.emseaapplyh.emslmloan.vendor_code;
							emseaapply.emseaapplyh.emslmloan.vendor_name = data.data.emseaapplyh.emslmloan.vendor_name;
							emseaapply.emseaapplyh.emslmloan.vendor_site_id = data.data.emseaapplyh.emslmloan.vendor_site_id;
							emseaapply.emseaapplyh.emslmloan.vendor_site_code = data.data.emseaapplyh.emslmloan.vendor_site_code;
							emseaapply.emseaapplyh.emslmloan.vendor_site_name = data.data.emseaapplyh.emslmloan.vendor_site_name;
							emseaapply.emseaapplyh.emslmloan.receiver = data.data.emseaapplyh.emslmloan.receiver;
							emseaapply.emseaapplyh.emslmloan.biz_flag = data.data.emseaapplyh.emslmloan.biz_flag;
							emseaapply.emseaapplyh.emslmloan.bank_name = data.data.emseaapplyh.emslmloan.bank_name;
							emseaapply.emseaapplyh.emslmloan.bank_account = data.data.emseaapplyh.emslmloan.bank_account;
							emseaapply.emseaapplyh.emslmloan.bank_code = data.data.emseaapplyh.emslmloan.bank_code;
							emseaapply.emseaapplyh.emslmloan.receiver_en = data.data.emseaapplyh.emslmloan.receiver_en;
							//emseaapply.emseaapplyh.emslmloan.provice = data.data.emseaapplyh.emslmloan.provice;
							//emseaapply.emseaapplyh.emslmloan.city = data.data.emseaapplyh.emslmloan.city;
							emseaapply.emseaapplyh.emslmloan.bank_adress = data.data.emseaapplyh.emslmloan.bank_adress;
							//emseaapply.emseaapplyh.emslmloan.project_code = data.data.emseaapplyh.emslmloan.project_code;
							emseaapply.emseaapplyh.emslmloan.sensitive_info = data.data.emseaapplyh.emslmloan.sensitive_info;

							emseaapply.emseaapplyh.emslmloan.tmp_receiver = {
								"bank_account": data.data.emseaapplyh.emslmloan.bank_account,
								"bank_adress": data.data.emseaapplyh.emslmloan.bank_adress,
								"bank_code": data.data.emseaapplyh.emslmloan.bank_code,
								"bank_name": data.data.emseaapplyh.emslmloan.bank_name,
								"receiver_en": data.data.emseaapplyh.emslmloan.receiver_en,
								"receiver": data.data.emseaapplyh.emslmloan.receiver
							};
							emseaapply.emseaapplyh.emslmloan.tmp_company = {
								"company_id": data.data.emseaapplyh.emslmloan.company_id,
								"ou_id": data.data.emseaapplyh.emslmloan.ou_id,
								"proxy_user": data.data.emseaapplyh.emslmloan.proxy_user,
								"company_name": data.data.emseaapplyh.emslmloan.company_name
							};
							emseaapply.emseaapplyh.emslmloan.tmp_vendor = {
								"vendor_code": data.data.emseaapplyh.emslmloan.vendor_code,
								"vendor_id": data.data.emseaapplyh.emslmloan.vendor_id,
								"vendor_name": data.data.emseaapplyh.emslmloan.vendor_name,
								"vendor_site_code": data.data.emseaapplyh.emslmloan.vendor_site_code,
								"vendor_site_id": data.data.emseaapplyh.emslmloan.vendor_site_id,
								"vendor_site_name": data.data.emseaapplyh.emslmloan.vendor_site_name,
								"vendor_type": data.data.emseaapplyh.emslmloan.vendor_type
							};
							console.log('11111111111111');
							console.log(emseaapply);

						}
					}

					//差旅日期格式转换
					//					angular.forEach(data.data.emseaapplyh.emseaapplytravelds, function(data) {
					//						data.start_date = new Date(data.start_date);
					//						data.end_date = new Date(data.end_date);
					//						emseaapply.emseaapplyh.emseaapplytravelds.push(data);
					//					});
				}else {
					$mdDialog.show($mdDialog.alert().title('提交结果').textContent('获取表单模版:' + data.msg + '(' + data.code + ')').ariaLabel('提交结果').ok('关闭'));
				}
				console.log(emseaapply);
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}

		if($scope.id) {
			//查询获取日常申请详情数据
			$scope.getEmsEAApply($scope.formdata, $scope.id);
		} else {
			//默认自带一条费用明细
			$scope.formdata.emseaapplyh.emseaapplyls.push(angular.copy($scope.emseaapplyls));
			//默认自带一条差旅明细
			$scope.formdata.emseaapplyh.emseaapplytravelds.push(angular.copy($scope.emseaapplytravelds));
			//获取设置表单模版ID	
			$http({
				method: 'POST',
				url: feelapplyUrl + '/cm/formTemplate/getFormTemplates',
				data: {
					"module_type": "EA",
					"order_type": $scope.kind
				},
				headers: {
					'x-auth-token': sessionStorage.Token
				}
			}).success(function(data, status, headers, config) {
				console.log(data);
				if(data.code == "0000") {
					$scope.formdata.emseaapplyh.form_template_id = data.data.info[0].form_template_id;
					$scope.formdata.emseaapplyh.form_template_name = data.data.info[0].form_template_name;
					$scope.formdata.emseaapplyh.order_template_id = data.data.info[0].order_template_id;
					$scope.formdata.emseaapplyh.order_template_name = data.data.info[0].order_template_name;
					$scope.formdata.emseaapplyh.order_type = data.data.info[0].order_type;
					$scope.emslmloan.order_type = data.data.info[0].order_type;
					$scope.emslmloan.form_template_id = data.data.info[0].order_template_id;
					$scope.emslmloan.form_template_name = data.data.info[0].form_template_name;
					$scope.emslmloan.order_template_id = data.data.info[0].form_template_id;
					$scope.emslmloan.order_template_name = data.data.info[0].order_template_name;
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').textContent(data.msg + '(' + data.code + ')').ariaLabel('提交结果').ok('关闭'));
				}
			}).error(function(data, status, headers, config) {});
		}

		/*保存表单*/
		$scope.onNext = function(ev) {
			//获取申请人数据、目前只支持一个，多个的默认第一个
			if($scope.formdata.emseaapplyh.tmp_applyUser.length > 0) {
				$scope.formdata.emseaapplyh.apply_by = $scope.formdata.emseaapplyh.tmp_applyUser[0].user_id;
				$scope.formdata.emseaapplyh.apply_name = $scope.formdata.emseaapplyh.tmp_applyUser[0].user_full_name;
				$scope.formdata.emseaapplyh.org_id = $scope.formdata.emseaapplyh.tmp_applyUser[0].org_id;
				$scope.formdata.emseaapplyh.org_name = $scope.formdata.emseaapplyh.tmp_applyUser[0].org_name;
			}
			//借款获取申请人数据、目前只支持一个，多个的默认第一个
			if($scope.emslmloan.tmp_applyUser.length > 0) {
				$scope.emslmloan.apply_by = $scope.emslmloan.tmp_applyUser[0].user_id;
				$scope.emslmloan.apply_name = $scope.emslmloan.tmp_applyUser[0].user_full_name;
				$scope.emslmloan .org_id = $scope.emslmloan.tmp_applyUser[0].org_id;
				$scope.emslmloan.org_name = $scope.emslmloan.tmp_applyUser[0].org_name;
			}
			//判断是否需要借款
			if($scope.formdata.emseaapplyh.need_loan) {
				$scope.formdata.emseaapplyh.emslmloan = $scope.emslmloan;
			} else {
				$scope.formdata.emseaapplyh.emslmloan = null;
			}
			if($scope.formdata.emseaapplyh.tmp_currency) {
				$scope.formdata.emseaapplyh.currency_code = $scope.formdata.emseaapplyh.tmp_currency.currency_code;
				$scope.formdata.emseaapplyh.currency_name = $scope.formdata.emseaapplyh.tmp_currency.currency_name;
			}
			//明细列表预算部门值设置
			angular.forEach($scope.formdata.emseaapplyh.emseaapplyls, function(data, index, array) {
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
				data.currency_code	 = $scope.formdata.emseaapplyh.currency_code;
				data.currency_name = $scope.formdata.emseaapplyh.currency_name;
			});
			//设置借款货币类型
			$scope.emslmloan.currency_code = $scope.formdata.emseaapplyh.currency_code;
			$scope.emslmloan.currency_name = $scope.formdata.emseaapplyh.currency_name;
			//入账单位
			if($scope.emslmloan.tmp_company) {
				console.log('设置入账单位');
				$scope.emslmloan.company_id = $scope.emslmloan.tmp_company.company_id;
				$scope.emslmloan.ou_id = $scope.emslmloan.tmp_company.ou_id;
				$scope.emslmloan.proxy_user = $scope.emslmloan.tmp_company.proxy_user;
			} else {
				console.log('没有入账单位');
			}
			//收款方
			if($scope.emslmloan.tmp_receiver) {
				$scope.emslmloan.bank_account = $scope.emslmloan.tmp_receiver.bank_account;
				$scope.emslmloan.bank_adress = $scope.emslmloan.tmp_receiver.bank_adress;
				$scope.emslmloan.bank_code = $scope.emslmloan.tmp_receiver.bank_code;
				$scope.emslmloan.bank_name = $scope.emslmloan.tmp_receiver.bank_name;
				$scope.emslmloan.receiver_en = $scope.emslmloan.tmp_receiver.receiver_en;
				$scope.emslmloan.receiver = $scope.emslmloan.tmp_receiver.receiver;
				console.log('设置收款方');
			} else {
				console.log('没有收款方');
			}
			//供应商
			if($scope.emslmloan.tmp_vendor) {
				$scope.emslmloan.vendor_code = $scope.emslmloan.tmp_vendor.vendor_code;
				$scope.emslmloan.vendor_id = $scope.emslmloan.tmp_vendor.vendor_id;
				$scope.emslmloan.vendor_name = $scope.emslmloan.tmp_vendor.vendor_name;
				$scope.emslmloan.vendor_site_code = $scope.emslmloan.tmp_vendor.vendor_site_code;
				$scope.emslmloan.vendor_site_id = $scope.emslmloan.tmp_vendor.vendor_site_id;
				$scope.emslmloan.vendor_site_name = $scope.emslmloan.tmp_vendor.vendor_site_name;
				$scope.emslmloan.vendor_type = $scope.emslmloan.tmp_vendor.vendor_type;
				console.log('设置供应商');
			} else {
				console.log('没有供应商');
			}

			//console.log($scope.formdata);
			//生成表单报文
			var form = angular.copy($scope.formdata);
			var postform = form;

			//出差人员信息转换
			if($scope.kind == "CL") {
				angular.forEach(postform.emseaapplyh.emseaapplytravelds, function(data, index, array) {
					console.log(data);
					data.end_date = $filter('date')(data.end_date, 'yyyy-MM-dd');
					data.start_date = $filter('date')(data.start_date, 'yyyy-MM-dd');
					var fromareacode = [];
					var fromareaname = [];
					angular.forEach(data.tmp_from_area, function(data, index, array) {
						fromareacode.push(data.flightCityCode);
						fromareaname.push(data.text);
					});
					var toareacode = [];
					var toareaname = [];
					angular.forEach(data.tmp_to_area, function(data, index, array) {
						toareacode.push(data.flightCityCode);
						toareaname.push(data.text);
					});
					var travelpersons = [];
					var travelpersonsname = [];
					angular.forEach(data.tmp_applyUser, function(data, index, array) {
						travelpersons.push(data.user_id);
						travelpersonsname.push(data.user_full_name);
					});
					data.from_area_code = fromareacode.join(',');
					data.from_area_name = fromareaname.join(',');
					data.to_area_codes = toareacode.join(',');
					data.to_area_names = toareaname.join(',');
					data.travel_persons = travelpersons.join(',');
					data.travel_persons_name = travelpersonsname.join(',');
					delete data.tmp_from_area;
					delete data.tmp_to_area;
					delete data.tmp_applyUser;
				});
			} else {
				postform.emseaapplyh.emseaapplytravelds = null;
			}
			//提取日期并转换日期格式：2016-12-30
			postform.emseaapplyh.apply_date = $filter('date')(postform.emseaapplyh.apply_date, 'yyyy-MM-dd');
			if(postform.emseaapplyh.emslmloan) {
				postform.emseaapplyh.emslmloan.expected_repay_date = $filter('date')(postform.emseaapplyh.emslmloan.expected_repay_date, 'yyyy-MM-dd');
			}
			//转换借款开关，把bool类型转为Y/N
			postform.emseaapplyh.need_loan = postform.emseaapplyh.need_loan ? "Y" : "N";

			/*===start去掉多余的属性====*/
			delete postform.emseaapplyh.tmp_applyUser;
			delete postform.emseaapplyh.tmp_currency;
			angular.forEach(postform.emseaapplyh.emseaapplyls, function(data) {
				delete data.budget;
			});
			if(postform.emseaapplyh.emslmloan) {
				delete postform.emseaapplyh.emslmloan.tmp_applyUser;
				delete postform.emseaapplyh.emslmloan.tmp_company;
				delete postform.emseaapplyh.emslmloan.tmp_vendor;
				delete postform.emseaapplyh.emslmloan.tmp_receiver;
			}
			/*===end去掉多余的属性====*/
			console.log(postform);
			if($scope.formdata.emseaapplyh.formInstanceId) {
				$location.url("/process/processSubmit?formInstanceId=" +
					$scope.formdata.emseaapplyh.formInstanceId +
					'&formid=' + $scope.formdata.emseaapplyh.form_template_id +
					'&modelid=001');
			} else {
				$http({
					method: 'POST',
					url: feelapplyUrl + 'ea/feeApply/saveFeeApply',
					data: postform,
					headers: {
						'x-auth-token': sessionStorage.Token
					}
				}).success(function(data, status, headers, config) {
					console.log(data);
					if(data.code == "0000" && data.data.emseaapplyh.fee_apply_id) {
						$scope.formdata.emseaapplyh.fee_apply_id = data.data.emseaapplyh.fee_apply_id;
						//获取费用申请详情
						$scope.getEmsEAApply($scope.formdata, data.data.emseaapplyh.fee_apply_id);
						$scope.onCheckApply(data.data.emseaapplyh.fee_apply_id, data.data.emseaapplyh.formInstanceId, data.data.emseaapplyh.form_template_id, "001");
					} else {
						$mdDialog.show($mdDialog.alert().title('提交结果').textContent(data.msg + '(' + data.code + ')').ariaLabel('提交结果').ok('关闭'));

					}
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			}

		}

		//检验申请
		$scope.onCheckApply = function(feeapplyid, formInstanceId, formtempid, modelid) {
				console.log('校验申请');
				$http({
					method: 'POST',
					url: feelapplyUrl + 'ea/feeApply/checkFeeApply',
					data: {
						"tenant_id": null,
						"user_id": null,
						"fee_apply_id": feeapplyid
					},
					headers: {
						'x-auth-token': sessionStorage.Token
					}
				}).success(function(data, status, headers, config) {
					console.log(data);
					if(data.code == "0000") {
						console.log('校验成功');
						$location.url("/process/processSubmit?formInstanceId=" + formInstanceId + '&formid=' + formtempid + '&modelid=' + modelid);
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
			//单项目删除节点
		$scope.onDelEmseaapplyls = function(i) {
			$scope.formdata.emseaapplyh.emseaapplyls.splice(i, 1);
			$scope.onCountmoney();
		};
		//多项删除节点
		$scope.onMulDelEmseaapplyls = function(i) {
			console.log($scope.selected);
			angular.forEach($scope.selected, function(data, index, array) {
				var num = $scope.formdata.emseaapplyh.emseaapplyls.indexOf(data);
				if(num > -1) {
					console.log(num);
					$scope.formdata.emseaapplyh.emseaapplyls.splice(num, 1);
					$scope.onCountmoney();
				}
			})
		};
		//合计总价格
		$scope.onCountmoney = function() {
				var total = 0;
				angular.forEach($scope.formdata.emseaapplyh.emseaapplyls, function(data, index, array) {
					console.log(data);
					total += data.apply_amount;
				});
				$scope.formdata.emseaapplyh.apply_amount = total;
			}
			//添加费用明细
		$scope.onAddrichang = function() {
				$scope.formdata.emseaapplyh.emseaapplyls.push(angular.copy($scope.emseaapplyls));
			}
			//添加差旅明细
		$scope.onAddtravel = function() {
				$scope.formdata.emseaapplyh.emseaapplytravelds.push(angular.copy($scope.emseaapplytravelds));
			}
			//删除差旅明细
		$scope.onDeltravel = function(i) {
			$scope.formdata.emseaapplyh.emseaapplytravelds.splice(i, 1);
		};
		//编辑预算明细
		$scope.editrow = 0;
		$scope.onEditDetails = function(i) {
			$scope.editrow = i;
		}

		$scope.onChangeDay = function(item) {
			console.log(item.start_date);
			console.log(item.end_date);
			if(item.start_date && item.end_date) {
				if(item.start_date <= item.end_date) {
					item.travel_days = ((Math.abs(item.end_date - item.start_date)) / 1000 / 60 / 60 / 24) + 1;
				} else {
					$mdDialog.show($mdDialog.alert().title('提示').textContent('开始日期必须小于等于结束日期').ariaLabel('提交结果').ok('关闭'));
					item.end_date = null;

				}
			}

		}

		//明细选择项目
		$scope.selected = [];
		$scope.query = {
			order: 'name',
			limit: 10,
			page: 1
		};
	}]);
});