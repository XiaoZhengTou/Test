/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('budgetcreatelist', []);
    test.controller('budgetcreatelistCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
            largeEditDialog: false
        };
        $scope.selected = [];
        $scope.getDesserts = function() {
            getapp1();
            $scope.promise = $timeout(function () {

            }, 1000);
        };
        $scope.clearFilter = function () {
            $scope.query = {
                order: 'name',
                limit: 5,
                page: 1,
                total:'',
                budget_name: '',
                budget_templet_id: '',
                invalid_date: null,
                valid_date: null
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:'',
            budget_name: '',
            budget_templet_id: '',
            invalid_date: null,
            valid_date: null
        };
        //搜索
        $scope.search_budgetcreatelist = function(){
            if($scope.query.limit != undefined){
                $scope.query.page = '1';
                getapp1();
            }
        };

        getapp1();
        function getapp1(){
            var invalid_date='';
            if($scope.query.invalid_date != null && $scope.query.invalid_date != undefined){
                invalid_date=$filter('date')($scope.query.invalid_date, "yyyy-MM-dd");
            }
            var valid_date='';
            if($scope.query.valid_date != null && $scope.query.valid_date != undefined){
                valid_date=$filter('date')($scope.query.valid_date, "yyyy-MM-dd");
            }

            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+'/' + 'bm/EmsBmBudgetH/pageQuery',
                //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "page_number": parseInt($scope.query.page),
                    "page_size": parseInt($scope.query.limit),
                    query_param:{
                        budget_name:$scope.query.budget_name == ''? null:$scope.query.budget_name,
                        budget_templet_name:$scope.query.budget_templet_id == ''? null:$scope.query.budget_templet_id,
                        invalid_date:$scope.query.invalid_date == null? null:invalid_date,
                        valid_date:$scope.query.valid_date == null? null:valid_date
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

                        $scope.appdata = data.data.datalist;
                        $scope.query.total = data.data.page.totalRow;
                        $scope.query.limit = data.data.page.pageSize;
                        $scope.query.page = data.data.page.pageNumber;

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

        //预算模板
        getbudgetlist11();
        function getbudgetlist11(){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/pageLike',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:1,
                    page_size:10000
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.getquerybudgetlist=data.data.info;

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

        //新增
        $scope.add = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budget/budgetcreatelist-dialog1.html',
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
                    var invalid_date=null;
                    if($scope.budgetcreatelist.invalid_date != null && $scope.budgetcreatelist.invalid_date != undefined){
                        invalid_date=$filter('date')($scope.budgetcreatelist.invalid_date, "yyyy-MM-dd");
                    }
                    var valid_date=null;
                    if($scope.budgetcreatelist.valid_date != null && $scope.budgetcreatelist.valid_date != undefined){
                        valid_date=$filter('date')($scope.budgetcreatelist.valid_date, "yyyy-MM-dd");
                    }
                    for(var i=0;i<$scope.getcurrency.length;i++){
                        if($scope.budgetcreatelist.currency_code == $scope.getcurrency[i].currency_code){
                            $scope.budgetcreatelist.currency_name=$scope.getcurrency[i].currency_name
                        }
                    }

                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetH/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            emsbmbudgeth:{
                                budget_name: $scope.budgetcreatelist.budget_name,
                                busi_org_id: $scope.budgetcreatelist.busi_org_id,
                                budget_templet_id: $scope.budgetcreatelist.budget_templet_id,
                                currency_code: $scope.budgetcreatelist.currency_code,
                                currency_name: $scope.budgetcreatelist.currency_name,
                                fee_type_tree_id: $scope.budgetcreatelist.fee_type_tree_id,
                                interval_id: $scope.budgetcreatelist.interval_id,
                                invalid_date: invalid_date,
                                valid_date: valid_date
                            }
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert('新增成功！');
                                $mdDialog.hide('新增成功！');
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

                $scope.budgetcreatelist = {
                    budget_name: '',
                    budget_status: '',
                    busi_org_id: '',
                    budget_templet_id: '',
                    currency_code: '',
                    currency_name: '',
                    fee_type_tree_id: '',
                    interval_id: '',
                    invalid_date: null,
                    valid_date: null
                };

                //币种
                getcurrency();
                function getcurrency(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/currencies/query',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            active_flag:'Y'
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.getcurrency=data.data;

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

                //预算科目
                getbudgetall();
                function getbudgetall(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetypetree/page',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:1,
                            page_size:10000,
                            enable_flag:'Y',
                            tree_type:'Y'
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.getbudgetall=data.data.info;

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

                //预算组织
                getbusiorg();
                function getbusiorg(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/queryMain',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:1,
                            page_size:10000,
                            enable_flag:'Y'
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.getbusiorg=data.data.info;

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

                //预算模板
                getbudgetlist();
                function getbudgetlist(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/pageLike',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:1,
                            page_size:10000
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.getbudgetlist=data.data.info;

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

                //预算区间
                getbudgetInverval();
                function getbudgetInverval(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetH/pageQueryBudgetInverval',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:1,
                            page_size:10000,
                            query_param:{

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

                                $scope.getbudgetInverval=data.data.datalist;

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

        //编辑
        $scope.edit = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController33,
                templateUrl: 'templates/basicdata/budget/budgetcreatelist-dialog2.html',
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
            function DialogController33($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    var invalid_date=null;
                    if($scope.budgetcreatelist.invalid_date != null && $scope.budgetcreatelist.invalid_date != undefined){
                        invalid_date=$filter('date')($scope.budgetcreatelist.invalid_date, "yyyy-MM-dd");
                    }
                    var valid_date=null;
                    if($scope.budgetcreatelist.valid_date != null && $scope.budgetcreatelist.valid_date != undefined){
                        valid_date=$filter('date')($scope.budgetcreatelist.valid_date, "yyyy-MM-dd");
                    }
                    //for(var i=0;i<$scope.getcurrency.length;i++){
                    //    if($scope.budgetcreatelist.currency_code == $scope.getcurrency[i].currency_code){
                    //        $scope.budgetcreatelist.currency_name=$scope.getcurrency[i].currency_name
                    //    }
                    //}

                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetH/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            emsbmbudgeth:{
                                budget_headers_id:$scope.budgetcreatelist.budget_headers_id,
                                budget_name: $scope.budgetcreatelist.budget_name,
                                //busi_org_id: $scope.budgetcreatelist.busi_org_id,
                                //budget_templet_id: $scope.budgetcreatelist.budget_templet_id,
                                //currency_code: $scope.budgetcreatelist.currency_code,
                                //currency_name: $scope.budgetcreatelist.currency_name,
                                //fee_type_tree_id: $scope.budgetcreatelist.fee_type_tree_id,
                                //interval_id: $scope.budgetcreatelist.interval_id,
                                invalid_date: invalid_date,
                                valid_date: valid_date
                            }
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert('新增成功！');
                                $mdDialog.hide('新增成功！');
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

                $scope.delete = function(){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetH/disabledBudget',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            budget_headers_id:item.budget_headers_id
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert('新增成功！');
                                $mdDialog.hide('作废成功！');
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

                $scope.sure = function(){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetH/approveBudget',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            budget_headers_id:item.budget_headers_id
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert('新增成功！');
                                $mdDialog.hide('确认成功！');
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

                var invalid_date='';
                if(item.invalid_date != null && item.invalid_date != undefined){
                    invalid_date=item.invalid_date.toString();
                    invalid_date =  invalid_date.replace(/-/g,"/");
                }
                var valid_date='';
                if(item.valid_date != null && item.valid_date != undefined){
                    valid_date=item.valid_date.toString();
                    valid_date =  valid_date.replace(/-/g,"/");
                }
                $scope.budgetcreatelist = {
                    budget_headers_id:item.budget_headers_id,
                    budget_name: item.budget_name,
                    budget_status: item.budget_status,
                    busi_org_id: item.busi_org_id,
                    budget_templet_id: item.budget_templet_id,
                    currency_code: item.currency_code,
                    currency_name: item.currency_name,
                    fee_type_tree_id: item.fee_type_tree_id,
                    interval_id: item.interval_id,
                    invalid_date: invalid_date == ''? null:new Date(invalid_date),
                    valid_date: valid_date == ''? null:new Date(valid_date)
                };

                $scope.getcurrency=[{currency_code:item.currency_code,currency_name:item.currency_name}];
                $scope.getbudgetall=[{fee_type_tree_id:item.fee_type_tree_id,fee_type_tree_name:item.fee_type_tree_name}];
                $scope.getbusiorg=[{busi_org_id:item.busi_org_id,busi_org_name:item.busi_org_name}];
                $scope.getbudgetlist=[{budget_templet_id:item.budget_templet_id,budget_templet_name:item.budget_templet_name}];
                $scope.getbudgetInverval=[{interval_id:item.interval_id,interval_name:item.interval_name}];
            }
        };

        //明细
        $scope.detail = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController44,
                templateUrl: 'templates/basicdata/budget/budgetcreatelist-dialog3.html',
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
            function DialogController44($scope, $mdDialog) {
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
                    largeEditDialog: true
                };
                $scope.selected = [];
                $scope.getDesserts = function() {
                    getapp1();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };
                $scope.query = {
                    order: 'name'
                };

                $scope.answer = function(answer) {
                    var invalid_date=null;
                    if($scope.budgetcreatelist.invalid_date != null && $scope.budgetcreatelist.invalid_date != undefined){
                        invalid_date=$filter('date')($scope.budgetcreatelist.invalid_date, "yyyy-MM-dd");
                    }
                    var valid_date=null;
                    if($scope.budgetcreatelist.valid_date != null && $scope.budgetcreatelist.valid_date != undefined){
                        valid_date=$filter('date')($scope.budgetcreatelist.valid_date, "yyyy-MM-dd");
                    }
                    var dataBM=[];
                    var list=[];
                    for(var i =0;i<$scope.appdata.length;i++){
                        dataBM=[];
                        for(var j=0;j<$scope.appdata[i].level_id.length;j++){
                            for(var h=0;h<$scope.level_number[j].level.length;h++){
                                if($scope.appdata[i].level_id[j] == $scope.level_number[j].level[h].id){
                                    dataBM.push({
                                        level_id:$scope.appdata[i].level_id[j],
                                        level_code:$scope.level_number[j].level[h].code,
                                        level_name:$scope.level_number[j].level[h].name
                                    })
                                }
                            }
                        }
                        list.push({
                            budget_amount: $scope.appdata[i].budget_amount,
                            fee_type_id: $scope.appdata[i].fee_type_id,
                            is_apply: $scope.appdata[i].is_apply,
                            control_amount_type: $scope.appdata[i].control_amount_type,
                            control_process_type: $scope.appdata[i].control_process_type,
                            enable_flag: $scope.appdata[i].enable_flag,
                            budget_headers_id:item.budget_headers_id
                        });
                        if(dataBM.length==1){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                        }else if(dataBM.length==2){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                        }else if(dataBM.length==3){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                        }else if(dataBM.length==4){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                            list[i].level_id4=dataBM[3].level_id;list[i].level_code4=dataBM[3].level_code;list[i].level_name4=dataBM[3].level_name;
                        }else if(dataBM.length==5){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                            list[i].level_id4=dataBM[3].level_id;list[i].level_code4=dataBM[3].level_code;list[i].level_name4=dataBM[3].level_name;
                            list[i].level_id5=dataBM[4].level_id;list[i].level_code5=dataBM[4].level_code;list[i].level_name5=dataBM[4].level_name;
                        }else if(dataBM.length==6){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                            list[i].level_id4=dataBM[3].level_id;list[i].level_code4=dataBM[3].level_code;list[i].level_name4=dataBM[3].level_name;
                            list[i].level_id5=dataBM[4].level_id;list[i].level_code5=dataBM[4].level_code;list[i].level_name5=dataBM[4].level_name;
                            list[i].level_id6=dataBM[5].level_id;list[i].level_code6=dataBM[5].level_code;list[i].level_name6=dataBM[5].level_name;
                        }else if(dataBM.length==7){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                            list[i].level_id4=dataBM[3].level_id;list[i].level_code4=dataBM[3].level_code;list[i].level_name4=dataBM[3].level_name;
                            list[i].level_id5=dataBM[4].level_id;list[i].level_code5=dataBM[4].level_code;list[i].level_name5=dataBM[4].level_name;
                            list[i].level_id6=dataBM[5].level_id;list[i].level_code6=dataBM[5].level_code;list[i].level_name6=dataBM[5].level_name;
                            list[i].level_id7=dataBM[6].level_id;list[i].level_code7=dataBM[6].level_code;list[i].level_name7=dataBM[6].level_name;
                        }else if(dataBM.length==8){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                            list[i].level_id4=dataBM[3].level_id;list[i].level_code4=dataBM[3].level_code;list[i].level_name4=dataBM[3].level_name;
                            list[i].level_id5=dataBM[4].level_id;list[i].level_code5=dataBM[4].level_code;list[i].level_name5=dataBM[4].level_name;
                            list[i].level_id6=dataBM[5].level_id;list[i].level_code6=dataBM[5].level_code;list[i].level_name6=dataBM[5].level_name;
                            list[i].level_id7=dataBM[6].level_id;list[i].level_code7=dataBM[6].level_code;list[i].level_name7=dataBM[6].level_name;
                            list[i].level_id8=dataBM[7].level_id;list[i].level_code8=dataBM[7].level_code;list[i].level_name8=dataBM[7].level_name;
                        }else if(dataBM.length==9){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                            list[i].level_id4=dataBM[3].level_id;list[i].level_code4=dataBM[3].level_code;list[i].level_name4=dataBM[3].level_name;
                            list[i].level_id5=dataBM[4].level_id;list[i].level_code5=dataBM[4].level_code;list[i].level_name5=dataBM[4].level_name;
                            list[i].level_id6=dataBM[5].level_id;list[i].level_code6=dataBM[5].level_code;list[i].level_name6=dataBM[5].level_name;
                            list[i].level_id7=dataBM[6].level_id;list[i].level_code7=dataBM[6].level_code;list[i].level_name7=dataBM[6].level_name;
                            list[i].level_id8=dataBM[7].level_id;list[i].level_code8=dataBM[7].level_code;list[i].level_name8=dataBM[7].level_name;
                            list[i].level_id9=dataBM[8].level_id;list[i].level_code9=dataBM[8].level_code;list[i].level_name9=dataBM[8].level_name;
                        }else if(dataBM.length==10){
                            list[i].level_id1=dataBM[0].level_id;list[i].level_code1=dataBM[0].level_code;list[i].level_name1=dataBM[0].level_name;
                            list[i].level_id2=dataBM[1].level_id;list[i].level_code2=dataBM[1].level_code;list[i].level_name2=dataBM[1].level_name;
                            list[i].level_id3=dataBM[2].level_id;list[i].level_code3=dataBM[2].level_code;list[i].level_name3=dataBM[2].level_name;
                            list[i].level_id4=dataBM[3].level_id;list[i].level_code4=dataBM[3].level_code;list[i].level_name4=dataBM[3].level_name;
                            list[i].level_id5=dataBM[4].level_id;list[i].level_code5=dataBM[4].level_code;list[i].level_name5=dataBM[4].level_name;
                            list[i].level_id6=dataBM[5].level_id;list[i].level_code6=dataBM[5].level_code;list[i].level_name6=dataBM[5].level_name;
                            list[i].level_id7=dataBM[6].level_id;list[i].level_code7=dataBM[6].level_code;list[i].level_name7=dataBM[6].level_name;
                            list[i].level_id8=dataBM[7].level_id;list[i].level_code8=dataBM[7].level_code;list[i].level_name8=dataBM[7].level_name;
                            list[i].level_id9=dataBM[8].level_id;list[i].level_code9=dataBM[8].level_code;list[i].level_name9=dataBM[8].level_name;
                            list[i].level_id10=dataBM[9].level_id;list[i].level_code10=dataBM[9].level_code;list[i].level_name10=dataBM[9].level_name;
                        }
                    }

                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetNode/createBudgetNode',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            budget_headers_id:item.budget_headers_id,
                            emsbmbudgetnodes:list
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert('新增成功！');
                                $mdDialog.hide('新增成功！');
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

                var invalid_date='';
                if(item.invalid_date != null && item.invalid_date != undefined){
                    invalid_date=item.invalid_date.toString();
                    invalid_date =  invalid_date.replace(/-/g,"/");
                }
                var valid_date='';
                if(item.valid_date != null && item.valid_date != undefined){
                    valid_date=item.valid_date.toString();
                    valid_date =  valid_date.replace(/-/g,"/");
                }
                $scope.budgetcreatelist = {
                    budget_headers_id:item.budget_headers_id,
                    budget_name: item.budget_name,
                    budget_status: item.budget_status,
                    busi_org_id: item.busi_org_id,
                    budget_templet_id: item.budget_templet_id,
                    currency_code: item.currency_code,
                    currency_name: item.currency_name,
                    fee_type_tree_id: item.fee_type_tree_id,
                    interval_id: item.interval_id,
                    budget_templet_name: item.budget_templet_name,
                    interval_name: item.interval_name,
                    fee_type_tree_name: item.fee_type_tree_name,
                    busi_org_name: item.busi_org_name,
                    invalid_date: invalid_date == ''? null:new Date(invalid_date),
                    valid_date: valid_date == ''? null:new Date(valid_date)
                };

                $scope.appdata=[];

                getapp2();
                function getapp2(){
                    var getconfig = {
                        method: 'GET',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/getHead/'+item.budget_templet_id,
                        //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
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

                                //$scope.appdata = data.data.emsBmTemplet.emsBmStructures;

                                $scope.level_number = [];
                                for(var i=1;i<=parseInt(data.data.emsBmTemplet.level_number);i++){
                                    $scope.level_number.push({
                                        levelname:data.data.emsBmTemplet.emsBmStructures[i-1].budget_structure_name,
                                        levelcode:'level'+i,
                                        levelid:'level_id'+i,
                                        level:[]
                                        //level2:'',
                                        //level3:'',
                                        //level4:'',
                                        //level5:'',
                                        //level6:'',
                                        //level7:'',
                                        //level8:'',
                                        //level9:'',
                                        //level10:''
                                    });
                                    for(var j=0;j<data.data.emsBmTemplet.emsBmStructures.length;j++){
                                        if(i == data.data.emsBmTemplet.emsBmStructures[j].n_level){
                                            getapp3(data.data.emsBmTemplet.emsBmStructures[j].budget_structure_id,i,$scope.level_number)
                                        }
                                    }
                                }
                                $scope.ap='1';

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

                function getapp3(id,i,item11){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmBudgetNode/queryLevelDatas',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            budget_structure_id:id,
                            busi_org_id:item.busi_org_id,
                            fee_type_tree_id:item.fee_type_tree_id,
                            interval_id:item.interval_id
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                item11[i-1].level = data.data.list;
                                //if(i==1){
                                //    $scope.level1 = data.data.list;
                                //}else if(i==2){
                                //    $scope.level2 = data.data.list;
                                //}else if(i==3){
                                //    $scope.level3 = data.data.list;
                                //}else if(i==4){
                                //    $scope.level4 = data.data.list;
                                //}else if(i==5){
                                //    $scope.level5 = data.data.list;
                                //}else if(i==6){
                                //    $scope.level6 = data.data.list;
                                //}else if(i==7){
                                //    $scope.level7 = data.data.list;
                                //}else if(i==8){
                                //    $scope.level8 = data.data.list;
                                //}else if(i==9){
                                //    $scope.level9 = data.data.list;
                                //}else if(i==10){
                                //    $scope.level10 = data.data.list;
                                //}

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
                                //alert(data.msg)
                            }

                        })
                        .error(function(data, status, headers, config) {
                            //alert(status)
                        });
                }

                //添加
                $scope.addrow = function () {
                    $scope.appdata.push({
                        level_id:[],
                        budget_amount: '',
                        is_apply: '',
                        control_amount_type: '',
                        control_process_type: '',
                        enable_flag: '',
                        budget_headers_id:item.budget_headers_id
                    })
                };

                //批量删除
                $scope.deleterow = function(){
                    var a=$scope.selected;
                    for(var i=0;i<a.length;i++){
                        for(var j = i + 1;j<a.length;j++){
                            if(a[i]<a[j]){
                                var tmp = a[i];
                                a[i] = a[j];
                                a[j] = tmp;
                            }
                        }
                    }
                    for(var i=0;i<a.length;i++){
                        //if($scope.appdata[a[i]-1]._state == 'old'){
                        //    for(var h=0;h<$scope.appdata1.length;h++){
                        //        if($scope.appdata1[h].budget_structure_id == $scope.appdata[a[i]-1].budget_structure_id){
                        //            $scope.appdata1[h]._state = 'deleted';
                        //        }
                        //    }
                        //}
                        $scope.appdata.splice(a[i]-1,1)
                    }
                    $scope.selected = [];
                };

                //逐个删除
                $scope.deleteone = function (item) {
                    //if($scope.appdata[item]._state == 'old'){
                    //    for(var h=0;h<$scope.appdata1.length;h++){
                    //        if($scope.appdata1[h].budget_structure_id == $scope.appdata[item].budget_structure_id){
                    //            $scope.appdata1[h]._state = 'deleted';
                    //        }
                    //    }
                    //}
                    $scope.appdata.splice(item,1)
                };

                $scope.edit_budget_amount = function (event, item) {
                    event.stopPropagation();
                    var dialog = {
                        modelValue: item.budget_amount,
                        placeholder: 'Add a comment',
                        save: function (input) {
                            item.budget_amount = input.$modelValue;
                        },
                        type:'number',
                        targetEvent: event,
                        title: '修改预算金额'
                    };
                    var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
                    promise.then(function (ctrl) {
                        //var input = ctrl.getInput();
                        //input.$viewChangeListeners.push(function () {
                        //    input.$setValidity('test', input.$modelValue !== 'test');
                        //});
                    });
                };

                getfeetype();
                function getfeetype(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/page',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:1,
                            page_size:10000,
                            fee_type_tree_id:item.fee_type_tree_id,
                            enable_flag:'Y'
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.fee_type = data.data.data.list;

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


    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });


    angular._LoadModule('budgetcreatelist');
    return test;
});