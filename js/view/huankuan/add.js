define(['angular','js/shared/bankaccount.js',
'js/shared/feeapply.js',
'js/shared/ruzhangdanwei.js'], function(angular) {
    var add = angular.module('add', ['angularMoment','md.ruzhangdanwei']);
    add.controller('hkAddCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog,publicmodel) {
        // 初始化开始
        $scope.stop = function(ev){
            ev.stopPropagation();
        }
        $scope.clear = function(){
            $scope.selected = [];
        }
        var currentUser = publicFunction.localGet("user")['data']['user'];
        $scope.origindata = {
            currency : [
                {id:'CNY',name:'人民币'},
                {id:'USD',name:'美元'}
            ]
        };
        $scope.add = {
            desc : '',
            currency : null,
            remark : null,
            ruzhangdanwei : null
        };
        $scope.$watch('add.ruzhangdanwei', function (newValue, oldValue) {
            $scope.getData();
        });
        // 拉取借款单开始
        var bookmark;
        $scope.selected = [];
        $scope.query = {
            page_number: 1,
            page_size: 10,
            order_by: 'loan_info_code'
        };
        $scope.filter = {
            source : [
                {id:'loan_info_code',name:'借款单号'},
                {id:'reason_desc',name:'借款原因'},
                {id:'apply_name',name:'借款人'}
            ],
            value : {},
            setFilter : function(x){
                $scope.filter.value = x;
            },
            options: {
              debounce: 500
            }
        };
        $scope.filter.value = $scope.filter.source[0];
        $scope.getData = function(){
            if (!$scope.add.ruzhangdanwei || !$scope.add.currency) {
                return;
            }
            $scope.selected = [];
            $scope.promise = $timeout(function () {
            }, 1000);
            var getconfig = {
                // method: 'POST',
                method: 'POST',
                // url: feelapplyUrl + 'lm/loan/listMyLoan',
                url: feelapplyUrl + 'lm/loan/listMyLoan',
                noLoader : true,
                data : {
                    page_number: $scope.query.page_number,
                    page_size: $scope.query.page_size,
                    order_by: $scope.query.order_by,
                    query_param: {
                        status : "DHK",
                        company_id: $scope.add.ruzhangdanwei.company_id,
                        currency_code : $scope.add.currency.id
                    }
                }
            };
            getconfig.data.query_param[$scope.filter.value.id] = $scope.searchtext;
            $http(getconfig).success(function(response){
                var data = response.data.datalist;
                for(var j = 0, length = data.length; j < length; j++){
                    if (!data[j].already_repay_amount) {
                        data[j].already_repay_amount = 0;
                    }
                    data[j].max_repay_amount = data[j].amount - data[j].already_repay_amount;
                    data[j].repay_amount = data[j].max_repay_amount;
                }
                $scope.data = data;
                $scope.total = response.data.page.totalRow
            }).error(function(response){
                console.log('请求失败!') ;
            });
        };
        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.searchtext = '';
            $scope.getData();
        };
        // 拉取借款单结束
        $scope.$watch('searchText', function (newValue, oldValue) {
            if(!oldValue) {
                bookmark = $scope.query.page;
            }
            if(newValue !== oldValue) {
                $scope.query.page = 1;
            }
            if(!newValue) {
                $scope.query.page = bookmark;
            }
            $scope.getData();
        });
        // 拟合数据开始
        $scope.totalAmount = 0;
        $scope.calcTotal = function(){
            var total = 0;
            var selected = $scope.selected;
            for(var j = 0, length = selected.length; j < length; j++){
                total = selected[j].repay_amount + total;
            }
            $scope.totalAmount = total;
        };
        $scope.calcAmount = function(max,now,index){
            if (now > max) {
                var text = '你输入的金额' + now + '超过了这张借款单的剩余代还金额' + max + '，系统已自动将你的代还金额设置为：' + max;
                $scope.showSimpleToast(text,5000);
                $scope.data[index].repay_amount = max;
            }
        };
        // 拟合数据结束
        // 数据保存开始
        $scope.next = function(dostring){
            // 数据拼接开始
            var postdata = {
                "tenant_id": currentUser.tenantId,
                "user_id": currentUser['userId'],
                "emslmrepayh":{
                    "repay_info_id": null,
                    "apply_by": currentUser['userId'],
                    "apply_name": currentUser['userName'],
                    "org_id": currentUser['orginfo'][0].id,
                    "org_name": currentUser['orginfo'][0].name,
                    "position_id": currentUser['position'].id ? currentUser['position'].id : null,
                    "position_name":  currentUser['position'].name ? currentUser['position'].name : null,
                    "repay_type": "工资扣款",
                    "remark" : $scope.add.remark,
                    "repay_amount": $scope.totalAmount,
                    "currency_code": $scope.add.currency.id,
                    "currency_name": $scope.add.currency.name,
                    "form_template_id": null,
                    "order_template_id": null,
                    "form_template_name": null,
                    "order_template_name": null,
                    "emslmrepayls": []
                }
            }
            var origin = $scope.selected;
            for(var j = 0, length = origin.length; j < length; j++){
                subdata = {
                    loan_info_id : origin[j].loan_info_id,
                    repay_amount : origin[j].repay_amount
                }
                postdata.emslmrepayh.emslmrepayls.push(subdata);
            }
            // 获取表单数据开始
            $http({
                method: 'POST',
                url: feelapplyUrl + 'cm/formTemplate/getFormTemplates',
                data: publicmodel.TemplateModel.HuanKuan,
            }).success(function(data, status, headers, config){
                if (data.code == "0000") {
                    postdata.emslmrepayh.form_template_id = data.data.info[0].form_template_id.replace(/\s+/, "");
                    postdata.emslmrepayh.form_template_name = data.data.info[0].form_template_name;
                    postdata.emslmrepayh.order_template_id = data.data.info[0].order_template_id;
                    postdata.emslmrepayh.order_template_name = data.data.info[0].order_template_name;
                    // 数据保存开始
                    var getconfig = {
                        method: 'POST',
                        url: feelapplyUrl + '/rp/repay/saveRepay',
                        data : postdata
                    };
                    $http(getconfig).success(function(response){
                        if (response.code == '0000') {
                            console.log('恭喜你，保存成功！');
                            $scope.NextText = "数据保存成功，开始启动校验……";
                            if (dostring && dostring == 'save') {
                                $scope.go('/jiehuankuan/huankuan');
                                return;
                            }else{
                                // 保存审批需要数据
                                jhkPublic.ShenPi.forminstanceid = response.data.emslmrepayh.formInstanceId;
                                jhkPublic.ShenPi.formid = postdata.emslmrepayh.form_template_id;
                                jhkPublic.Add = response.data.emslmrepayh;
                                var loadid = response.data.emslmrepayh.repay_info_id;
                                var jyconfig = {
                                    method: 'POST',
                                    url: feelapplyUrl + 'rp/repay/checkRepay',
                                    data : {
                                        "repay_info_id" : loadid
                                    }
                                };
                                $http(jyconfig).success(function(response){
                                    if (response.code == '0000') {
                                        console.log("校验成功！");
                                        $scope.NextText = "数据校验通过，开始启动流程……";
                                        var lcconfig =  {
                                            method: 'POST',
                                            url: feelapplyUrl + 'rp/repay/startRepay',
                                            data : {
                                                "repay_info_id": loadid,
                                                "process_def_id": 11,
                                                "process_def_name": "11"
                                            }
                                        };
                                         $http(lcconfig).success(function(response){
                                            if (response.code == '0000'){
                                                console.log("流程启动成功！");
                                                $scope.NextText = "流程启动成功！";
                                                $scope.go("/jiehuankuan/huankuan/shenpi",'选择审批人');
                                            }
                                         });
                                    }
                                }).error(function(response){
                                    console.log('校验失败!') ;
                                });
                            }
                        }else{
                            console.log('保存失败，原因是：' + response.msg);
                        }
                    }).error(function(response){
                        console.log('请求失败!') ;
                    });
                    // 数据保存结束
                }else{
                    return;
                }
            });
            // 获取表单数据结束
            // 数据拼接结束
        };
        // /rp/repay/saveRepay
        // 数据保存结束
    });
})