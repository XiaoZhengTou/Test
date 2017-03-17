/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('budgeteditlistedit', []);
    test.controller('budgeteditlisteditCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
            busi_org_name: '',
            fee_type_name: '',
            budget_node_name: '',
            n_level: '',
            enable_flag: ''
        };
        //搜索
        $scope.search_budgeteditlistedit = function(){
            if($scope.query.limit != undefined){
                $scope.query.page = '1';
                getapp1();
            }
        };
        $scope.selected = [];

        var budget_headers_id='';
        var budget_templet_id='';
        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().budget_edit_list_edit_detail != null && $location.search().budget_edit_list_edit_detail != undefined){
                budget_headers_id=$location.search().budget_edit_list_edit_detail;
                budget_templet_id=$location.search().budget_templet_id;
                if($location.search().budget_edit_list_edit_detail == ''){
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
                }
                getbudgetlist11();
                //getapp1();
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
            }
        });

        function getapp1(){
            var invalid_date='';
            if($scope.query.invalid_date != null && $scope.query.invalid_date != undefined){
                invalid_date=$filter('date')($scope.query.invalid_date, "yyyy-MM-dd");
            }
            var valid_date='';
            if($scope.query.valid_date != null && $scope.query.valid_date != undefined){
                valid_date=$filter('date')($scope.query.valid_date, "yyyy-MM-dd");
            }
            if(budget_headers_id == ''){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
            }else{
                var getconfig = {
                    method: 'POST',
                    url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmBudgetNode/queryBudgetNodes',
                    //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data: {
                        query_param:{
                            budget_headers_id:budget_headers_id,
                            busi_org_name:$scope.query.busi_org_name == ''? undefined:$scope.query.busi_org_name,
                            fee_type_name:$scope.query.fee_type_name == ''? undefined:$scope.query.fee_type_name,
                            budget_node_name:$scope.query.budget_node_name == ''? undefined:$scope.query.budget_node_name,
                            n_level:$scope.query.n_level == ''? undefined:$scope.query.n_level,
                            enable_flag:$scope.query.enable_flag == ''? undefined:$scope.query.enable_flag
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

                            $scope.appdata = data.data;

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

        //预算模板
        function getbudgetlist11(){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/getHead/'+budget_templet_id,
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

                        var n_level=data.data.emsBmTemplet.level_number;
                        $scope.getn_level=[];
                        for(var i=1;i<=parseInt(n_level);i++){
                            $scope.getn_level.push(i);
                        }
                        $scope.query.n_level = n_level;
                        getapp1();
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

        //控制和是否滚动的编辑
        $scope.saveedit = function (item) {
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetNode/updateBudgetNodeProperty',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    emsbmbudgetnodes:[{
                        budget_node_id:item.budget_node_id,
                        control_amount_type:item.control_amount_type,
                        control_process_type:item.control_process_type,
                        roll_flag:item.roll_flag
                    }]
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

        //批量控制和是否滚动
        $scope.batchcontrol = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budget/budgeteditlistedit-dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(item)
                                .position('top right')
                                .hideDelay(1500)
                        );
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

                $scope.answer = function(answer) {
                    var aa=[];
                    for(var i=0;i<item.length;i++){
                       aa.push({
                           budget_node_id:item[i],
                           control_amount_type:$scope.budgeteditlistedit.control_amount_type,
                           control_process_type:$scope.budgeteditlistedit.control_process_type,
                           roll_flag:$scope.budgeteditlistedit.roll_flag
                       })
                    }

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetNode/updateBudgetNodeProperty',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            emsbmbudgetnodes:aa
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                $mdDialog.hide('修改成功！');
                                getapp1();
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

                $scope.budgeteditlistedit = {
                    //budget_node_id:item.budget_node_id,
                    control_amount_type:'',
                    control_process_type:'',
                    roll_flag:''
                };
            }
        };

        //状态的编辑
        $scope.saveenable = function (item) {
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetNode/updateBudgetNodeProperty',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    emsbmbudgetnodes:[{
                        budget_node_id:item.budget_node_id,
                        enable_flag:item.enable_flag
                    }]
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

        //批量状态
        $scope.batchenable = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budget/budgeteditlistedit-dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(item)
                                .position('top right')
                                .hideDelay(1500)
                        );
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

                $scope.answer = function(answer) {
                    var aa=[];
                    for(var i=0;i<item.length;i++){
                        aa.push({
                            budget_node_id:item[i]
                        })
                    }

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetNode/batchDisableBudgetNode',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            budget_node_ids:aa
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                $mdDialog.hide('修改成功！');
                                getapp1();
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

                $scope.budgeteditlistedit = {
                    enable_flag:'N'
                };
            }
        };

        //预算金额查询
        $scope.getbudget = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budget/budgeteditlistedit-dialog3.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(item)
                                .position('top right')
                                .hideDelay(1500)
                        );
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

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
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
                    budget_type: '',
                    source_order_code: '',
                    source_order_type:''
                };
                //搜索
                $scope.search_budgeteditlist = function(){
                    if($scope.query.limit != undefined){
                        $scope.query.page = '1';
                        getapp1();
                    }
                };

                getapp1();
                function getapp1(){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmBudgetNode/pageQueryBudgetDetails',
                        //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "page_number": parseInt($scope.query.page),
                            "page_size": parseInt($scope.query.limit),
                            query_param:{
                                budget_type:$scope.query.budget_type == ''? undefined:$scope.query.budget_type,
                                source_order_type:$scope.query.source_order_type == ''? undefined:$scope.query.source_order_type,
                                source_order_code:$scope.query.source_order_code == ''? undefined:$scope.query.source_order_code
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

                                $scope.appdata = data.data.info;
                                $scope.query.total = data.data.totalRow;
                                $scope.query.limit = data.data.pageSize;
                                $scope.query.page = data.data.pageNumber;

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

                //$scope.budgeteditlistedit = {
                //    enable_flag:'N'
                //};
            }
        };

        //已用金额查询
        $scope.getfee = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budget/budgeteditlistedit-dialog4.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(item)
                                .position('top right')
                                .hideDelay(1500)
                        );
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

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
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
                    source_order_code: '',
                    source_order_type:''
                };
                //搜索
                $scope.search_budgeteditlist = function(){
                    if($scope.query.limit != undefined){
                        $scope.query.page = '1';
                        getapp1();
                    }
                };

                getapp1();
                function getapp1(){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmBudgetNode/pageQueryFeeDetails',
                        //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "page_number": parseInt($scope.query.page),
                            "page_size": parseInt($scope.query.limit),
                            query_param:{
                                source_order_type:$scope.query.source_order_type == ''? undefined:$scope.query.source_order_type,
                                source_order_code:$scope.query.source_order_code == ''? undefined:$scope.query.source_order_code
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

                                $scope.appdata = data.data.info;
                                $scope.query.total = data.data.totalRow;
                                $scope.query.limit = data.data.pageSize;
                                $scope.query.page = data.data.pageNumber;

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
        };

        $scope.process = function(item){
            $location.path("/budget_process").search('budget_node_id',item.budget_node_id)
        };

        $scope.batchprocess = function(item){
            $location.path("/budget_processbatch")
        }

        $scope.back = function (){
            $location.path("/budget_edit_list")
        };
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });


    angular._LoadModule('budgeteditlistedit');
    return test;
});