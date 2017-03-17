/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('addmoneytable', []);
    test.controller('addmoneytableCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog,busiorgPublic){

        $scope.filter = {
            options: {
                debounce: 500
            }
        };
        $scope.removeFilter = removeFilter;
        $scope.query={
            filter:''
        };
        function removeFilter() {
            $scope.filter.show = false;
            $scope.query.filter = '';
        }
        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: false,
            decapitate: false,
            largeEditDialog: true
        };
        $scope.selected = [];
        $scope.getDesserts = function() {
            getapp1();
            $scope.promise = $timeout(function () {

            }, 1000);
        };
        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:'',
            apply_date: null,
            reason_desc: '',
            budget_headers_id:''
        };

        $scope.appdata = [];
        $scope.deletedata = [];

        var adjust_apply_h_id='';
        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().status != null && $location.search().status != undefined){
                if($location.search().status == 'add'){

                }else if($location.search().status == 'edit'){
                    adjust_apply_h_id=$location.search().adjustid;
                    getapp1();
                }
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/addbudget_money_list"
            }


        });

        function getapp1(){
            if(adjust_apply_h_id == ''){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/addbudget_money_list"
            }else{
                var getconfig = {
                    method: 'POST',
                    url:  APP_CONFIG.SMART_URL +'/bm/EmsBmAdjustApplyH/getAdjustApply',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data: {
                        adjust_apply_h_id:adjust_apply_h_id
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&& $scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){
                            var aa= data.data.emsbmadjustapplyh.emsbmadjustapplyls;
                            for(var i=0;i<aa.length;i++){
                                aa[i].status = 'old';
                            }
                            $scope.appdata = aa;
                            $scope.query.reason_desc = data.data.emsbmadjustapplyh.reason_desc;

                            $scope.query.budget_headers_id = data.data.emsbmadjustapplyh.budget_headers_id;
                            $scope.budget_name1 = data.data.emsbmadjustapplyh.budget_name;

                            var apply_date='';
                            if(data.data.emsbmadjustapplyh.apply_date != null && data.data.emsbmadjustapplyh.apply_date != undefined){
                                apply_date=data.data.emsbmadjustapplyh.apply_date.toString();
                                apply_date =  apply_date.replace(/-/g,"/");
                                $scope.query.apply_date = apply_date;
                            }else{
                                $scope.query.apply_date = null;
                            }

                        }else if(data.code=='6666'){

                        }else{
                            alert(data.msg)
                        }

                    })
                    .error(function(data, status, headers, config) {
                        //alert(status)
                    });
            }
        }

        getbudgetlist();
        //获取预算模板
        function getbudgetlist(){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL + '/bm/EmsBmBudgetH/pageQuery',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "page_number": 1,
                    "page_size": 10000,
                    query_param:{
                        budget_status:'AUDITED'
                    }
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.budgetlist = data.data.datalist;

                    }else if(data.code=='6666'){

                    }else{
                        alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        }

        var n_level='';
        //预算模板层级
        $scope.getbudgetlist11 = function(id){
            var aa='';
            for(var i=0;i<$scope.budgetlist.length;i++){
                if($scope.budgetlist[i].budget_headers_id == id){
                    aa = $scope.budgetlist[i].budget_templet_id
                }
            }
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/getHead/'+aa,
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        n_level=data.data.emsBmTemplet.level_number;

                    }else if(data.code=='6666'){

                    }else{
                        alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        };

        //新增预算单元调整金额
        $scope.add = function(ev,id,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budgetadjust/addmoneytable-dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        for(var i=0;i<item.length;i++){
                            $scope.appdata.push(item[i])
                        }
                    }
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
            function DialogController22($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.selected = [];
                $scope.adjust_amount = '';
                $scope.budget_name = '';

                $scope.answer = function(answer,amount) {
                    for(var i=0;i<answer.length;i++){
                        answer[i].status = 'add';
                        answer[i].adjust_amount = amount;
                    }
                    $mdDialog.hide(answer);
                };


                //获取预算单元
                $scope.getbudgetnodes = function(){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL + '/bm/EmsBmBudgetNode/queryBudgetNodes',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            query_param:{
                                budget_headers_id:id,
                                enable_flag:"Y",
                                n_level:n_level
                            }
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.budgetnodes = data.data;
                                for(var i =0;i<$scope.budgetnodes.length;i++){
                                    for(var j=0;j<item.length;j++){
                                        if($scope.budgetnodes[i].budget_node_id == item[j].budget_node_id){
                                            $scope.budgetnodes[i].disabled1=true;
                                        }
                                    }
                                }
                                //$scope.budget_name = name;

                            }else if(data.code=='6666'){

                            }else{
                                alert(data.msg)
                            }

                        })
                        .error(function(data, status, headers, config) {
                            //alert(status)
                        });
                };
                $scope.getbudgetnodes();

                //批量失效(查询时候要重置)
                var selectdata='';
                $scope.toggle = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.budget_node_id);
                    },ids);
                    var idx = ids.indexOf(item.budget_node_id);
                    if (idx > -1) {
                        $scope.selected.splice(idx, 1);
                    }
                    else {
                        //item.budget_name=$scope.budget_name;
                        $scope.selected.push(item);
                    }
                };
                $scope.exists = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.budget_node_id);
                    },ids);
                    if(ids.indexOf(item.budget_node_id) > -1){
                        item.check1=true;
                    }else{
                        item.check1=false
                    }
                };
            }
        };

        //批量删除
        $scope.deleteall = function (item) {
            for(var i= item.length-1;i>=0;i--){
                if($scope.appdata[item[i]].status == 'old'){
                    $scope.deletedata.push($scope.appdata[item[i]]);
                    $scope.appdata.splice(item[i],1)
                }else if($scope.appdata[item[i]].status == 'add'){
                    $scope.appdata.splice(item[i],1)
                }
            }
            $scope.selected = [];
        };

        //逐个删除
        $scope.deleteone = function (item) {
            if($scope.appdata[item].status == 'old'){
                $scope.deletedata.push($scope.appdata[item]);
                $scope.appdata.splice(item,1)
            }else if($scope.appdata[item].status == 'add'){
                $scope.appdata.splice(item,1)
            }
        };

        //暂存
        $scope.save = function(item){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+ '/bm/EmsBmAdjustApplyH/saveAdjustApply',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    emsbmadjustapplyh:{
                        adjust_desc:$scope.query.adjust_desc,
                        budget_headers_id:$scope.query.budget_headers_id,
                        order_type:'BESIDE_BUDGET',
                        emsbmadjustapplyls:$scope.appdata,
                        apply_name:"黄桥任",
                        apply_by:'1',
                        org_id: "1",
                        org_name:"IT部",
                        reason_desc: $scope.query.reason_desc,
                        form_template_id: $scope.formTemplate.form_template_id,
                        form_template_name: $scope.formTemplate.form_template_name,
                        order_template_id: $scope.formTemplate.order_template_id,
                        order_template_name: $scope.formTemplate.order_template_name,
                        process_def_name:'11',
                        process_def_id:11
                    }
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                    }else if(data.code=='6666'){

                    }else{
                        alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        };

        //下一步
        $scope.next_list = function(item){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+'/bm/EmsBmAdjustApplyH/saveAdjustApply',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    emsbmadjustapplyh:{
                        adjust_desc:$scope.query.adjust_desc,
                        budget_headers_id:$scope.query.budget_headers_id,
                        order_type:'BESIDE_BUDGET',
                        emsbmadjustapplyls:$scope.appdata,
                        apply_name:"黄桥任",
                        apply_by:'1',
                        org_id: "1",
                        org_name:"IT部",
                        reason_desc: $scope.query.reason_desc,
                        form_template_id: $scope.formTemplate.form_template_id,
                        form_template_name: $scope.formTemplate.form_template_name,
                        order_template_id: $scope.formTemplate.order_template_id,
                        order_template_name: $scope.formTemplate.order_template_name,
                        process_def_name:'11',
                        process_def_id:11
                    }
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        var adjust_apply_h_id1 = data.data.emsbmadjustapplyh.adjust_apply_h_id;
                        var getconfig = {
                            method: 'POST',
                            url:  APP_CONFIG.SMART_URL+'/bm/EmsBmAdjustApplyH/checkBeforeSubmit',
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
                            },
                            data: {
                                adjust_apply_h_id:adjust_apply_h_id1
                            }
                        };
                        $http(getconfig)
                            .success(function(data, status, headers, config) {
                                $scope.content=headers('x-auth-token');
                                if($scope.content!=''&& $scope.content!=null){
                                    $cookies.put('JSESSION', $scope.content);
                                }
                                if(data.code=='0000'){

                                    busiorgPublic.ShenPi.forminstanceid = data.data.formInstanceId;
                                    busiorgPublic.ShenPi.formid = $scope.formTemplate.form_template_id;
                                    $location.path("/addbudget_money_process")

                                }else if(data.code=='6666'){

                                }else{
                                    alert(data.msg)
                                }

                            })
                            .error(function(data, status, headers, config) {
                                //alert(status)
                            });

                    }else if(data.code=='6666'){

                    }else{
                        alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        };

        $scope.formTemplate = {
            form_template_id:'',
            form_template_name:'',
            order_template_id:'',
            order_template_name:''
        };

        $scope.getfoemtemplateid = function (){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+ '/cm/formTemplate/getFormTemplates',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "module_type": "BM",
                    "order_type": 'BESIDE_BUDGET'
                    //"order_type": "MONTH_CROSS"
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.formTemplate.form_template_id = data.data.info[0].form_template_id;
                        $scope.formTemplate.form_template_name = data.data.info[0].form_template_name;
                        $scope.formTemplate.order_template_id = data.data.info[0].order_template_id;
                        $scope.formTemplate.order_template_name = data.data.info[0].order_template_name;

                    }else if(data.code=='6666'){

                    }else{
                        alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        };
        $scope.getfoemtemplateid();

        $scope.back = function (){
            $location.path("/addbudget_money_list")
        };

        $scope.changebudget = function(){
            $scope.appdata=[];
        }
    });


    angular._LoadModule('addmoneytable');
    return test;
});