
define(['angular','js/shared/receving','js/shared/dictitem','js/shared/currency','js/shared/ruzhangdanwei','js/shared/organization'], function(angular) {
    var add_bills = angular.module('add_contract',['angularMoment','md.receving','mddictitem','md.ruzhangdanwei','mdorganization']);

    add_bills.controller('adddanju',function($scope, $rootScope, $mdDialog, $mdMedia, $http, $cookies, $filter, jhkPublic, moment,$mdToast,$routeParams){
        //保存数据
        $scope.saveData = {
                "_state":"added",//新增
                "apply_by":"123",//申请人，当前用户
                "apply_name":"当前用户",//申请人姓名
                "position_id":"12345",//职位id
                "position_name":"12345",//职位名称
                "amount":0,
                "source_system":"1235678",
                "emsHtContractLs":[]
        };
        //获取表单模板
        var getTemplate = function(){
            $http({
                method:'post',
                url:feelapplyUrl + 'cm/formTemplate/getFormTemplates',
                data:{
                    'module_type':'HT',
                    'order_type':'HT'
                }
            }).success(function(response) {
                $scope.saveData.form_template_id = response.data.info[0].form_template_id;
                $scope.saveData.form_template_name = response.data.info[0].form_template_name;
                $scope.saveData.order_template_id = response.data.info[0].order_template_id;
                $scope.saveData.order_template_name = response.data.info[0].order_template_name;
            }).error(function(response) {
                console.log('请求失败!') ;
            });
        };
        getTemplate();
        //保存数据
        $scope.currency = {tmp_currency:null};
        $scope.vendor = {};
        $scope.ruzhangdanwei = {};
        $scope.receving = {};
        $scope.orgs={};
        $scope.add_detial= function(ev, index) {

            if (index != undefined && index != null) {
                var emscaapportionl = $scope.saveData.emsHtContractLs[index]; //账务明细
                var nochange_amount = emscaapportionl.schedule_amount;
            }else{
                var emscaapportionl={};
            }
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/fenqifukuanjihua/add_accounting.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function(answer) {
                    if (index != undefined && index != null) {
                        //修改一条账务明细
                        $scope.saveData.amount = parseFloat($scope.saveData.amount) - parseFloat(nochange_amount) + parseFloat(answer.schedule_amount);
                        $scope.saveData.emsHtContractLs.splice(index, 1, answer);
                    } else {
                        //添加一条账务明细
                        answer.pay_period = $scope.saveData.emsHtContractLs.length+1;
                        $scope.saveData.emsHtContractLs.push(answer);
                        $scope.saveData.amount += parseFloat(answer.schedule_amount);
                    }

                }, function() {
                    //alert("关闭窗口");
                });

            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });

            function DialogController($scope, $mdDialog) {
                $scope.emscaapportionl = emscaapportionl;
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.answer = function () {
                    $scope.emscaapportionl.payment_method=$scope.itemValue;
                    //$scope.emscaapportionl.paymentmethod=$scope.itemName;
                    $scope.emscaapportionl.pay_time=$filter('date')(new Date($scope.pay_time),"yyyy-MM-dd HH:mm:ss")
                    //校验
                    if($scope.pay_time==undefined || $scope.pay_time==null){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('付款时间不能为空!')
                                .position('top right')
                                .hideDelay(3000)
                        );
                        return false;
                    }
                    if($scope.emscaapportionl.payment_method==undefined || $scope.emscaapportionl.payment_method==null){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('请选择付款方式!')
                                .position('top right')
                                .hideDelay(3000)
                        );
                        return false;
                    }
                    if($scope.emscaapportionl.schedule_amount==undefined || $scope.emscaapportionl.schedule_amount==null){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('请输入付款金额!')
                                .position('top right')
                                .hideDelay(3000)
                        );
                        return false;
                    }
                    if($scope.emscaapportionl.pay_percent==undefined || $scope.emscaapportionl.pay_percent==null){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('请输入付款比例!')
                                .position('top right')
                                .hideDelay(3000)
                        );
                        return false;
                    }
                    if($scope.emscaapportionl.pay_percent<=0 || $scope.emscaapportionl.pay_percent>100){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('付款比例不能小于0或大于100!')
                                .position('top right')
                                .hideDelay(3000)
                        );
                        return false;
                    }
                    $mdDialog.hide($scope.emscaapportionl);
                }
            }

        }

        //删除账务明细
        $scope.del_detial = function(ev, index) {
            var confirm = $mdDialog.confirm().title('删除确认').textContent('确定删除此条明细？').ariaLabel('删除').targetEvent(event).ok('删除').cancel('取消');
            $mdDialog.show(confirm).then(function() {
            $scope.saveData.amount -= parseFloat($scope.saveData.emsHtContractLs[index].schedule_amount);
            $scope.saveData.emsHtContractLs.splice(index, 1);})
        }

        //保存一个单据申请/修改一个单据

        $scope.add_Data=function(){
            $scope.saveData.project_mng_name = $scope.orgs.user_full_name;
            $scope.saveData.project_mng = $scope.orgs.user_account;
            $scope.saveData.org_id = $scope.orgs.org_id;
            $scope.saveData.org_name = $scope.orgs.org_name;
            $scope.saveData.party_a = $scope.ruzhangdanwei.company_name;
            $scope.saveData.ou_id=$scope.ruzhangdanwei.ou_id;
            $scope.saveData.company_id=$scope.ruzhangdanwei.company_id;
            $scope.saveData.receiver = $scope.receving.receiver;
            $scope.saveData.vendor_name = $scope.receving.vendor_name;
            $scope.saveData.vendor_id = $scope.receving.vendor_id;
            $scope.saveData.vendor_code = $scope.receving.vendor_code;
            $scope.saveData.vendor_site_code = $scope.receving.vendor_site_code;
            $scope.saveData.vendor_site_id = $scope.receving.vendor_site_id;
            $scope.saveData.vendor_site_name = $scope.receving.vendor_site_name;
            $scope.saveData.vendor_type = $scope.receving.vendor_type;
            $scope.saveData.currency_code = $scope.currency.tmp_currency.currency_code;
            $scope.saveData.currency_name = $scope.currency.tmp_currency.currency_name;
            $scope.saveData.party_b = $scope.receving.vendor_name;
            $scope.saveData.bank_name = $scope.receving.bank_name;
            $scope.saveData.bank_account = $scope.receving.bank_account;
            $scope.saveData.bank_code = $scope.receving.bank_code;
            //验证功能开始
            if ($scope.saveData.contract_no == undefined || $scope.saveData.contract_no == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('合同编号不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.contract_name == undefined || $scope.saveData.contract_name == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('合同名称不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.project_mng_name == undefined || $scope.saveData.project_mng_name == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('项目经理不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.orgs.user_account == undefined || $scope.orgs.user_account == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('项目经理账号为空，请选择其他项目经理!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.party_a == undefined || $scope.saveData.party_a == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('甲方不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.party_b_contact == undefined || $scope.saveData.party_b_contact == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('乙方联系人不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.party_b_contact_phone == undefined || $scope.saveData.party_b_contact_phone == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('乙方手机号码不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            var phone = $scope.saveData.party_b_contact_phone;
            var myreg = /^1[3458]\d{9}$/;
            if (!myreg.exec(phone)) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('请输入正确的手机号码!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.receiver == undefined || $scope.saveData.receiver == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('收款方不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.contract_desc == undefined || $scope.saveData.contract_desc == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('业务描述不能为空!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.emsHtContractLs.length < 1) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('请最少加入一条付款计划明细!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if ($scope.saveData.currency_code == undefined || $scope.saveData.currency_code == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('请选择币种!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            var sum = 0;
            angular.forEach($scope.saveData.emsHtContractLs, function (data, index, array) {
                sum += data.pay_percent;
            })
            if (sum !== 100) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('付款比例必须相加等于100!')
                        .position('top right')
                        .hideDelay(3000)
                );
                return false;
            }
            if($routeParams.obj==undefined||$routeParams.obj==null){
                $http({
                    method: 'POST',
                    url: bystagespayUrl + '/ht/EmsHtContract/add',
                    data: {
                        'emsHtContractH': $scope.saveData
                    }
                }).success(function (data, status, headers, config) {
                    if (data.code == "0000") {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent("保存成功！")
                                .position('top right')
                                .hideDelay(3000)
                        );
                    } else {
                        $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭').textContent('' + data.msg + '(' + data.code + ')'))
                    }
                }).error(function (data, status, headers, config) {
                    alert(data);
                });
            }else {
                    $scope.saveData._state="modified";
                    $http({
                        method: 'POST',
                        url: bystagespayUrl + '/ht/EmsHtContract/add',
                        data: {
                            'emsHtContractH': $scope.saveData
                        }
                    }).success(function (data, status, headers, config) {
                        if (data.code == "0000") {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent("修改成功！")
                                    .position('top right')
                                    .hideDelay(3000)
                            );
                        } else {
                            $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭').textContent('' + data.msg + '(' + data.code + ')'))
                        }
                    }).error(function (data, status, headers, config) {
                        alert(data);
                    });
            }
            //
        }
        //获取单据详情
        if($routeParams.obj!=undefined&&$routeParams.obj!=null){
            var contract_id=$routeParams.obj;
            var contractDetail=function(){
                $http({
                    method:'get',
                    url:bystagespayUrl +'/ht/EmsHtContract/getHead/'+contract_id
                }).success(function(response) {
                    $scope.saveData = response.data.emsHtContractH;

                }).error(function(response) {
                    console.log('请求失败!') ;
                });
            }
            contractDetail();
        }
    });
})
