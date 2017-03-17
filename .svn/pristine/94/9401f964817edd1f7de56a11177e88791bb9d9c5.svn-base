/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('dictdetail', []);
    test.controller('dictdetailCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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
                item_value:'',
                status:'ALL',
                item_name:''
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        $scope.search = {
            item_value:'',
            status:'ALL',
            item_name:''
        };

        //搜索
        $scope.search_dictdetail = function(){
            getapp1('1',$scope.pagesize);
        };

        $scope.dictdetail_name='';
        $scope.dictdetail_code='';
        $scope.dictdetail_id='';
        var id='';

        //页面跳转后的操作
        var watch = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().dictdetailname != null && $location.search().dictdetailname != undefined){

                $scope.dictdetail_name=$location.search().dictdetailname.name;
                $scope.dictdetail_code=$location.search().dictdetailname.code;
                $scope.dictdetail_id=$location.search().dictdetailname.id;
                id=$location.search().dictdetailname.id;

                if(id != null && id != undefined && id !=''){
                    getapp1();
                }else{
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/dict"
                }
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/dict"
            }
        });

        $scope.back = function (){
            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/dict"
        };

        //getapp1();
        function getapp1(page,size){
            if($scope.dictdetail_id == '' ||$scope.dictdetail_id == null ||$scope.dictdetail_id == undefined){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/dict"
            }else{
                var getconfig = {
                    method: 'POST',
                    //url: APP_CONFIG.CDP_URL+'/docker/dict/queryChild',
                    url: APP_CONFIG.CDP_URL+'/docker/dictitem/pageQuery',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data:{
                        pageNumber:parseInt($scope.query.page),
                        pageSize:parseInt($scope.query.limit),
                        dict_id:id,
                        item_name:$scope.search.item_name == ''? undefined:$scope.search.item_name,
                        item_value:$scope.search.item_value == ''? undefined:$scope.search.item_value,
                        status:$scope.search.status == 'ALL'? undefined:$scope.search.status
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&& $scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){

                            $scope.appdata = data.data.list;
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

        //修改状态
        $scope.editstatus = function(item,status){
            var sta='';
            if(status == '0'){
                sta='1'
            }else if(status == '1'){
                sta='0'
            }
            var getconfig = {
                method: 'PUT',
                //url: APP_CONFIG.CDP_URL+'/docker/dict/yz',
                url: APP_CONFIG.CDP_URL+'/docker/dictitem/',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    status:sta,
                    dict_id:item.dict_id,
                    id:item.id,
                    item_name:item.item_name,
                    item_value:item.item_value,
                    order_num:item.order_num,
                    attribute1:item.attribute1
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
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

        //新增
        $scope.add =  add1;
        function add1(ev) {
            var id1=$scope.dictdetail_id;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/dictdetail-dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
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
                        //url: APP_CONFIG.CDP_URL+'/docker/dict/ys',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            dict_id:$scope.dictdetail.dict_id,
                            item_name:$scope.dictdetail.item_name,
                            item_value:$scope.dictdetail.item_value,
                            order_num:$scope.dictdetail.order_num,
                            attribute1:$scope.dictdetail.attribute1,
                            status: $scope.dictdetail.status
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

                $scope.dictdetail ={
                    dict_id:id1,
                    item_name:'',
                    item_value:'',
                    order_num:'',
                    attribute1:'',
                    status:'1'
                };

            }
        };

        //编辑
        $scope.edit = edit1;
        function edit1(ev,item) {
            var id1=$scope.dictdetail_id;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/dictdetail-dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
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
                        method: 'PUT',
                        //url: APP_CONFIG.CDP_URL+'/docker/dict/ys',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            dict_id:$scope.dictdetail.dict_id,
                            id:$scope.dictdetail.id,
                            item_name:$scope.dictdetail.item_name,
                            item_value:$scope.dictdetail.item_value,
                            order_num:$scope.dictdetail.order_num,
                            attribute1:$scope.dictdetail.attribute1,
                            "status": $scope.dictdetail.status
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

                $scope.dictdetail = {
                    dict_id:item.dict_id,
                    id:item.id,
                    item_name:item.item_name,
                    item_value:item.item_value,
                    order_num:item.order_num,
                    attribute1:item.attribute1,
                    status:item.status
                };

            }
        };

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        $scope.batch_failure = function(){
            var ba2='';
            for(var i=0;i<$scope.selected1.length;i++){
                if(i == 0){
                    ba2=$scope.selected1[i].id;
                }else{
                    ba2 = ba2 + ',' + $scope.selected1[i].id
                }
            }
            var getconfig = {
                method: 'PUT',
                //url: APP_CONFIG.CDP_URL+'/docker/dict/ys/batchdelete',
                url: APP_CONFIG.CDP_URL+'/docker/dictitem/updateBatch',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    dictId:id,
                    dictItemIds:ba2
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        getapp1();
                        $scope.selected1 = [];
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

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });
    angular._LoadModule('dictdetail');
    return test;
});