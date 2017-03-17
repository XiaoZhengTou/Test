/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('costbudgetall', []);
    test.controller('costbudgetallCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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
            $scope.search = {
                fee_type_tree_name:'',
                enable_flag:'ALL',
                tree_type:'Y',
                fee_type_desc:'',
                fee_type_code:''
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        //$scope.pagesize = '5';
        //$scope.pageindex = '1';
        $scope.search = {
            fee_type_tree_name:'',
            enable_flag:'ALL',
            tree_type:'Y',
            fee_type_desc:'',
            fee_type_code:''
        };

        //搜索
        $scope.search_cost_basic = function(){
                getapp1('1',$scope.pagesize);
        };

        //跳转到预算科目
        $scope.tobudget = function (item) {
            $location.path("/cost_budget").search('name',item)
        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/feetypetree/page',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    fee_type_tree_name:$scope.search.fee_type_tree_name == ''? undefined:$scope.search.fee_type_tree_name,
                    tree_type:$scope.search.tree_type == ''? undefined:$scope.search.tree_type,
                    prefix_code:$scope.search.prefix_code == ''? undefined:$scope.search.prefix_code,
                    fee_type_desc:$scope.search.fee_type_desc == ''? undefined:$scope.search.fee_type_desc,
                    enable_flag:$scope.search.enable_flag == 'ALL'? undefined:$scope.search.enable_flag
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

        //修改状态
        $scope.editstatus = function(item,status){
            var sta='';
            if(status == 'N'){
                sta='Y'
            }else if(status == 'Y'){
                sta='N'
            }
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/feetypetree',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "feeTypeTreeList" :[{
                        fee_type_desc:item.fee_type_desc,
                        fee_type_tree_name:item.fee_type_tree_name,
                        tree_type:'Y',
                        prefix_code:item.prefix_code,
                        _state:'modified',
                        enable_flag:sta,
                        fee_type_tree_id:item.fee_type_tree_id
                    }]
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        getapp1($scope.pageindex,$scope.pagesize);
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

        //新增
        $scope.add = function(ev) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/cost/costbudgetall-dialog1.html',
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
            function DialogController1($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetypetree',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "feeTypeTreeList" :[$scope.costbudgetall]
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
                                getapp1(pageindex,pagesize);
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

                $scope.costbudgetall = {
                    fee_type_desc:'',
                    fee_type_tree_name:'',
                    tree_type:'Y',
                    _state:"added",
                    enable_flag:'Y',
                    prefix_code:''
                };
            }
        };

        //编辑
        $scope.edit = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/cost/costbudgetall-dialog2.html',
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
            function DialogController2($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetypetree',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "feeTypeTreeList" :[{
                                fee_type_desc:$scope.costbudgetall.fee_type_desc,
                                fee_type_tree_name:$scope.costbudgetall.fee_type_tree_name,
                                tree_type:'Y',
                                prefix_code:$scope.costbudgetall.prefix_code,
                                _state:'modified',
                                enable_flag:$scope.costbudgetall.enable_flag,
                                fee_type_tree_id:$scope.costbudgetall.fee_type_tree_id
                            }]
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert('修改成功！');
                                $mdDialog.hide('修改成功！');
                                getapp1(pageindex,pagesize);
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
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetypetree',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "feeTypeTreeList" :[{
                                fee_type_desc:$scope.costbudgetall.fee_type_desc,
                                fee_type_tree_name:$scope.costbudgetall.fee_type_tree_name,
                                tree_type:$scope.costbudgetall.tree_type,
                                prefix_code:$scope.costbudgetall.prefix_code,
                                _state:'deleted',
                                enable_flag:$scope.costbudgetall.enable_flag,
                                fee_type_tree_id:$scope.costbudgetall.fee_type_tree_id
                            }]
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert('删除成功！');
                                $mdDialog.hide('删除成功！');
                                getapp1(pageindex,pagesize);
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

                $scope.costbudgetall = {
                    fee_type_desc:item.fee_type_desc,
                    fee_type_tree_name:item.fee_type_tree_name,
                    tree_type:item.tree_type,
                    prefix_code:item.prefix_code,
                    _state:item._state,
                    enable_flag:item.enable_flag,
                    fee_type_tree_id:item.fee_type_tree_id
                };
            }
        };

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });
    angular._LoadModule('costbudgetall');
    return test;
});