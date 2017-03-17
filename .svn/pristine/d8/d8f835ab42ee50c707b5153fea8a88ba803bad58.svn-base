define(['angular','js/shared/ruzhangdanwei.js','js/shared/receving.js'], function(angular) {
	//	add public.css
    publicFunction.addStyle('feePay.css');
    publicFunction.addStyle('md-data-table.min.css');
	var mdaddBill = angular.module('mdaddBill', ['md.ruzhangdanwei','md.receving']);
	mdaddBill.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	})
	mdaddBill.controller('addBillCtrl', function($scope, $http,$mdDialog, $timeout, $filter, baseconfig) {
        $scope.ruzhangdanwei = {};
        $scope.receving = {};
        $scope.origindata = {
            currency : [
                {id:'CNY',name:'电汇'},
                {id:'USD',name:'支票'}
            ]
        };
        $scope.add = {
            desc : null
        };
        //货币类型
        $scope.currencys = baseconfig.currencys;
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
                "form_template_id": "32618430267916288",
                "form_template_name": "费用申请表单",
                "reason_desc": "出差申请",
                "need_loan": "Y",
                "emseaapplyhexts": [],
                "order_template_id": "1",
                "order_template_name": "出差申请",
                "emseaapplytravelds": [],
                "emseaapplyls": [{
                    "busi_org_id": "自动带出",
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
                "emslmloan": null
            }
        };
        $scope.selected = [];
        
        
        
        //取数据开始
        $scope.save = function () {
    /*        if($scope.query.query_param.creation_date != null && $scope.query.query_param.creation_date != undefined){
                $scope.query.query_param.creation_date=$filter('date')($scope.query.query_param.creation_date, "yyyy-MM-dd");
            }*/
            $scope.promise = $timeout(function () {
            }, 500);
            var getconfig = {
                method: 'POST',
                url: 'http://10.16.30.74:8080/smart-expense-web/ca/EmsCaApportionH/save',
                noLoader: true,
                data:{
                    "emscaapportionh":
                    {"apportion_id":null,
                        "tenant_id":null,
                        "apportion_code":null,
                        "apply_by":1,
                        "apply_name":"张三",
                        "apportion_date":"2016-08-03",
                        "org_id":1,

                        "org_name":"行政组织",
                        "position_id":null,
                        "position_name":null,
                        "apportion_amount":1000.00,
                        "approve_amount":null,
                        "currency_code":"CNY",
                        "currency_name":"人民币",
                        "order_type":"INTERNAL_COLLECTION",
                        "form_template_id":"32618430267916288",
                        "form_template_name":"表单实例名称",
                        "order_template_id":1,
                        "order_template_name":"单据模板名称",
                        "process_def_id":null,
                        "process_def_name":null,
                        "biz_flag":0,
                        "order_status":null,
                        "biz_status":null,
                        "company_id":$scope.ruzhangdanwei.company_id,
                        "ou_id":2,
                        "proxy_user":3,
                        "vendor_type":null,
                        "vendor_id":null,
                        "vendor_code":null,
                        "vendor_name":"供应商",
                        "vendor_site_id":1,
                        "vendor_site_code":413200,
                        "vendor_site_name":"顺德农商银行",
                        "imp_erp_type":"AP",
                        "charge_against_id":null,
                        "is_make_invoice":"Y",
                        "gl_date":null,
                        "against_date":null,
                        "budget_code":null,
                        "project_code":null,
                        "contract_code":null,
                        "reason_desc":"调账申请",
                        "bank_account_id":12345678,
                        "bank_name":"顺德农商银行",
                        "bank_account":"6214830200001111",
                        "customer_id":null,
                        "customer_code":null,
                        "customer_name":null,
                        "customer_site_id":null,
                        "customer_site_code":null,
                        "customer_site_name":null,
                        "invoice_type_code":null,
                        "invoice_tax_code":null,
                        "invoice_tax_amount":null,
                        "receivables_trx_name":null,
                        "receipt_type":null,
                        "receivables_trx_id":null,
                        "transit_code":null,
                        "ccust_trx_type_id":null,
                        "cust_trx_type_code":null,
                        "cust_trx_type_name":null,
                        "submited_time":null,
                        "completed_time":null,
                        "disabled_by":null,
                        "disabled_name":null,
                        "io_apportion_id":null,
                        "source_system":null,
                        "source_order_type":null,
                        "source_order_id ":null,
                        "source_order_code":null,
                        "source_order_url":null,
                        "source_processinst_id":null,
                        "emscaapportionls":[{
                            "_state":"added",
                            "tenant_id":null,
                            "apportion_l_id":null,
                            "apportion_id":null,
                            "budget_amount":400.00,
                            "approve_amount":null,
                            "currency_code":"CNY",
                            "currency_name":null,
                            "conversion_rate":null,
                            "eco_type_id":null,
                            "busi_org_id":null,
                            "fee_type_id":null,
                            "bill_type_id":null,
                            "product_line_id":null,
                            "fee_apply_id":null,
                            "fee_apply_l_id":null,
                            "recorded_company_id":2,
                            "imp_erp_type":null,
                            "budget_node_id":1,
                            "budget_node_desc":null,
                            "budget_headers_id":null,
                            "debit_credit_type":"DR",
                            "cust_trx_type_id":1,
                            "cust_trx_type_name":null,
                            "project_code":null,
                            "reason_desc":"调账明细",
                            "segment1":null,
                            "segment2":null,
                            "segment3":null,
                            "segment4":null,
                            "segment5":null,
                            "segment6":null,
                            "segment7":null,
                            "segment8":null,
                            "segment9":null,
                            "segment10":null,
                            "segment10_name":null,
                            "segment9_name":null,
                            "segment8_name":null,
                            "segment7_name":null,
                            "segment6_name":null,
                            "segment5_name":null,
                            "segment4_name":null,
                            "segment3_name":null,
                            "segment2_name":null,
                            "segment1_name":null
                        },{
                            "_state":"added",
                            "tenant_id":null,
                            "apportion_l_id":null,
                            "apportion_id":null,
                            "budget_amount":400.00,
                            "approve_amount":null,
                            "currency_code":"CNY",
                            "currency_name":null,
                            "conversion_rate":null,
                            "eco_type_id":null,
                            "busi_org_id":null,
                            "fee_type_id":null,
                            "bill_type_id":null,
                            "product_line_id":null,
                            "fee_apply_id":null,
                            "fee_apply_l_id":null,
                            "recorded_company_id":2,
                            "imp_erp_type":null,
                            "budget_node_id":1,
                            "budget_node_desc":null,
                            "budget_headers_id":null,
                            "debit_credit_type":"DR",
                            "cust_trx_type_id":1,
                            "cust_trx_type_name":null,
                            "project_code":null,
                            "reason_desc":"调账明细1",
                            "segment1":null,
                            "segment2":null,
                            "segment3":null,
                            "segment4":null,
                            "segment5":null,
                            "segment6":null,
                            "segment7":null,
                            "segment8":null,
                            "segment9":null,
                            "segment10":null,
                            "segment10_name":null,
                            "segment9_name":null,
                            "segment8_name":null,
                            "segment7_name":null,
                            "segment6_name":null,
                            "segment5_name":null,
                            "segment4_name":null,
                            "segment3_name":null,
                            "segment2_name":null,
                            "segment1_name":null
                        }],
                        "emscaapportionhexts":[{
                            "_state":"added",
                            "id":null,
                            "apportion_id":null,
                            "tenant_id":null,
                            "field_name":"扩展字段",
                            "key_desc":null,
                            "field_value":null,
                            "field_type":null,
                            "field_level":null
                        }],
                        "emscainvoicetaxrs":[{
                            "_state":"added",
                            "invoice_tax_r_id":null,
                            "tenant_id":null,
                            "apportion_id":null,
                            "fee_type_id":null,
                            "tax_rate":null,
                            "vato_code":"123",
                            "vato_name":"税码",
                            "tax_amount":200,
                            "invoice_amount":800,
                            "remark":null
                        }]
                    }
                }
            }
            $http(getconfig).success(function (response) {
                console.log(response);
                if (response.data && response.code=='0000') {
                    $scope.viewData = response;
                }else {
                    $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                        .textContent('' + response.msg + "(" + response.code + ")"));
                }
            }).error(function (response) {
                console.log('请求失败!');
            });
        };

// 取数据结束
       //选中删除
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
        //单个删除数据
        $scope.onDelEmseaapplyls = function(i) {
            $scope.formdata.emseaapplyh.emseaapplyls.splice(i, 1);
            $scope.countmoney();
        };
        //点击展开弹出框
        $scope.onOpenAddrichang = function(ev, item) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/feePay/addFreeDetail.html',
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
        //点击展开弹出框结束
	});
//控制器范围到此结束
	return mdaddBill;
});