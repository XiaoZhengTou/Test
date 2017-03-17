/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    var test = angular.module('editprocesstable', []);
    test.controller('editprocesstableCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
            adjust_desc: '',
            budget_headers_id:''
        };

        $scope.appdata = [];
        $scope.deletedata = [];
        $scope.control_value_error = false;

        var adjust_apply_h_id='';
        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().status != null && $location.search().status != undefined){
                if($location.search().status == 'add'){

                }else if($location.search().status == 'edit'){
                    if($location.search().order_status == 'edit'){

                    }else if($location.search().order_status == 'edit'){

                    }
                    adjust_apply_h_id=$location.search().adjustid;
                    getapp1();
                }
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/editbudget_process_list"
            }
        });

        function getapp1(){
            if(adjust_apply_h_id == ''){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/editbudget_process_list"
            }else{
                var getconfig = {
                    method: 'POST',
                    url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmAdjustApplyH/getAdjustApply',
                    //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
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
                            $scope.query.adjust_desc = data.data.emsbmadjustapplyh.adjust_desc;

                            var apply_date='';
                            if(data.data.emsbmadjustapplyh.apply_date != null && data.data.emsbmadjustapplyh.apply_date != undefined){
                                apply_date=data.data.emsbmadjustapplyh.apply_date.toString();
                                apply_date =  apply_date.replace(/-/g,"/");
                                $scope.query.apply_date = apply_date;
                            }else{
                                $scope.query.apply_date = null;
                            }

                        }else if(data.code=='0401'){
                            if(data.msg == '未登录.'){
                                $cookies.remove("managerId");
                                $cookies.remove("tenantId");
                                $cookies.remove("JSESSION");
                                $cookies.remove("userId");
                                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
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
                url:  APP_CONFIG.SMART_URL+'/' + 'bm/EmsBmBudgetH/pageQuery',
                //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
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

                    }else if(data.code=='0401'){
                        if(data.msg == '未登录.'){
                            $cookies.remove("managerId");
                            $cookies.remove("tenantId");
                            $cookies.remove("JSESSION");
                            $cookies.remove("userId");
                            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
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

        var watch2 = $scope.$watch('appdata',function(newValue,oldValue, scope){
            if($scope.appdata!= null && $scope.appdata != undefined && $scope.appdata.length >0 ){
                var aa=0;
                for(var i=0;i<$scope.appdata.length;i++){
                    aa=aa+parseInt($scope.appdata[i].adjust_amount)
                }
                if(aa !=0){
                    $scope.control_value_error = true;
                }else{
                    $scope.control_value_error = false;
                }
            }
        },true);

        //新增预算单元调整金额
        $scope.add = function(ev,id,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budgetadjust/editprocesstable-dialog1.html',
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
                        url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmBudgetNode/queryBudgetNodes',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            query_param:{
                                budget_headers_id:id,
                                enable_flag:"Y"
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

                            }else if(data.code=='0401'){
                                if(data.msg == '未登录.'){
                                    $cookies.remove("managerId");
                                    $cookies.remove("tenantId");
                                    $cookies.remove("JSESSION");
                                    $cookies.remove("userId");
                                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                                }

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
                url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmAdjustApplyH/saveAdjustApply',
                //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    emsbmadjustapplyh:{
                        adjust_desc:$scope.query.adjust_desc,
                        budget_headers_id:$scope.query.budget_headers_id,
                        order_type:'MONTH_CROSS',
                        emsbmadjustapplyls:$scope.appdata,
                        apply_name:"黄桥任",
                        apply_by:'1',
                        org_id: "1",
                        org_name:"IT部",
                        reason_desc: "调整事由",
                        form_template_id: "1",
                        form_template_name: "表单模板",
                        order_template_id: '1',
                        order_template_name: "单据模板名称"
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

                    }else if(data.code=='0401'){
                        if(data.msg == '未登录.'){
                            $cookies.remove("managerId");
                            $cookies.remove("tenantId");
                            $cookies.remove("JSESSION");
                            $cookies.remove("userId");
                            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                        }

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
            $location.path("/editbudget_process_process").search('adjustid1','111')
            //var getconfig = {
            //    method: 'POST',
            //    url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmAdjustApplyH/saveAdjustApply',
            //    //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
            //    headers: {
            //        'x-auth-token': $cookies.get("JSESSION")
            //    },
            //    data: {
            //        emsbmadjustapplyh:{
            //
            //        }
            //    }
            //};
            //$http(getconfig)
            //    .success(function(data, status, headers, config) {
            //        $scope.content=headers('x-auth-token');
            //        if($scope.content!=''&& $scope.content!=null){
            //            $cookies.put('JSESSION', $scope.content);
            //        }
            //        if(data.code=='0000'){
            //            var adjust_apply_h_id1 = data.data.emsbmadjustapplyh.adjust_apply_h_id;
            //            var getconfig = {
            //                method: 'POST',
            //                url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmAdjustApplyH/checkBeforeSubmit',
            //                //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
            //                headers: {
            //                    'x-auth-token': $cookies.get("JSESSION")
            //                },
            //                data: {
            //                    adjust_apply_h_id:adjust_apply_h_id1
            //                }
            //            };
            //            $http(getconfig)
            //                .success(function(data, status, headers, config) {
            //                    $scope.content=headers('x-auth-token');
            //                    if($scope.content!=''&& $scope.content!=null){
            //                        $cookies.put('JSESSION', $scope.content);
            //                    }
            //                    if(data.code=='0000'){
            //
            //                        $location.path("/editbudget_process_process").search('adjustid1',adjust_apply_h_id1)
            //
            //                    }else if(data.code=='6666'){
            //
            //                    }else{
            //                        alert(data.msg)
            //                    }
            //
            //                })
            //                .error(function(data, status, headers, config) {
            //                    //alert(status)
            //                });
            //
            //        }else if(data.code=='6666'){
            //
            //        }else{
            //            alert(data.msg)
            //        }
            //
            //    })
            //    .error(function(data, status, headers, config) {
            //        //alert(status)
            //    });

        };

        $scope.back = function (){
            $location.path("/editbudget_process_list")
        };

        $scope.changebudget = function(){
            $scope.appdata=[];
        }
    });


    angular._LoadModule('editprocesstable');
    return test;
});