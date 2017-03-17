/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('currency', []);
    test.controller('currencyCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$mdToast,$timeout){
        $scope.breadcrumbs.crumbs='基础数据';
        $scope.breadcrumbs.crumbs1='币种';
        $scope.layout.activeItem='币种';
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

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        //$scope.pagesize = '5';
        //$scope.pageindex = '1';

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.JIEBAO_URL+'/docker/currencies/queryAllPage?pageIndex='+$scope.query.page+'&pageSize='+$scope.query.limit,
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



        $scope.editstatus = function(item,status){
            var sta='';
            if(status == true){
                sta='Y'
            }else{
                sta='N'
            }
            var getconfig = {
                method: 'PUT',
                url: APP_CONFIG.JIEBAO_URL+'/docker/currencies',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    currency_id:item.currency_id,
                    currency_code:item.currency_code,
                    currency_name:item.currency_name,
                    issuing_territory_code:item.issuing_territory_code,
                    preci:parseInt(item.preci),
                    symbol:item.symbol,
                    extended_precision:item.extended_precision,
                    minimum_accountable_unit:item.minimum_accountable_unit,
                    load_date:(item.load_date=='' || item.load_date== null)?null:$filter('date')(item.load_date, "yyyy-MM-dd hh:mm:ss"),
                    iso_flag:item.iso_flag,
                    active_flag:sta
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
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

        $scope.add = function(ev) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/currency-dialog1.html',
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
                        url: APP_CONFIG.JIEBAO_URL+'/docker/currencies',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            currency_code:$scope.currency.currency_code,
                            currency_name:$scope.currency.currency_name,
                            issuing_territory_code:$scope.currency.issuing_territory_code,
                            preci:$scope.currency.preci != ''?parseInt($scope.currency.preci):null,
                            symbol:$scope.currency.symbol,
                            extended_precision:$scope.currency.extended_precision != ''?parseInt($scope.currency.extended_precision):null,
                            minimum_accountable_unit:$scope.currency.minimum_accountable_unit,
                            load_date:$filter('date')($scope.currency.load_date, "yyyy-MM-dd hh:mm:ss"),
                            iso_flag:$scope.currency.iso_flag,
                            active_flag:'N'
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

                $scope.currency = {
                    currency_code:'',
                    currency_name:'',
                    issuing_territory_code:'',
                    preci:'',
                    symbol:'',
                    extended_precision:'',
                    minimum_accountable_unit:'',
                    load_date:null,
                    iso_flag:'',
                    enable_flag:'',
                    active_flag:''
                };
            }
        };

        $scope.edit = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/currency-dialog2.html',
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
                        method: 'PUT',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/currencies',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            currency_id:$scope.currency.currency_id,
                            currency_code:$scope.currency.currency_code,
                            currency_name:$scope.currency.currency_name,
                            issuing_territory_code:$scope.currency.issuing_territory_code,
                            preci:parseInt($scope.currency.preci),
                            symbol:$scope.currency.symbol,
                            extended_precision:$scope.currency.extended_precision,
                            minimum_accountable_unit:$scope.currency.minimum_accountable_unit,
                            load_date:$filter('date')($scope.currency.load_date, "yyyy-MM-dd hh:mm:ss"),
                            iso_flag:$scope.currency.iso_flag,
                            active_flag:$scope.currency.active_flag
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
                        method: 'DELETE',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/currencies/'+$scope.currency.currency_id,
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
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

                var str='';
                if(item.load_date != null && item.load_date != undefined){
                    str=item.load_date.toString();
                    str =  str.replace(/-/g,"/");
                }

                $scope.currency = {
                    currency_code:item.currency_code,
                    currency_name:item.currency_name,
                    issuing_territory_code:item.issuing_territory_code,
                    preci:item.preci,
                    symbol:item.symbol,
                    extended_precision:item.extended_precision,
                    minimum_accountable_unit:item.minimum_accountable_unit,
                    load_date:str == ''? null:new Date(str),
                    iso_flag:item.iso_flag,
                    active_flag:item.active_flag,
                    tenant_id:item.tenant_id,
                    currency_id:item.currency_id
                };
            }
        };

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        $scope.draftSelectcheck = false;
        $scope.addtablealldelete = false;
        $scope.$on("draftSelectcheckChange", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
        $scope.addtoggle2 = function () {
            if ($scope.draftSelectcheck) {
                $scope.selected1 = [];
                $scope.addtablealldelete = false;
            } else {
                for (var i = 0; i < goodsdata.length; i++) {
                    $scope.selected1.push(goodsdata[i].currency_id)
                }
                $scope.addtablealldelete = true;
            }
        };
        $scope.addtoggle1 = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
            if (list.length == goodsdata.length) {
                $scope.draftSelectcheck = true;
                $scope.$broadcast("draftSelectcheckChange1", $scope.draftSelectcheck);
            } else {
                $scope.draftSelectcheck = false;
                $scope.$broadcast("draftSelectcheckChange1", $scope.draftSelectcheck);
            }
            if (list.length != 0) {
                $scope.addtablealldelete = true;
            } else {
                $scope.addtablealldelete = false;
            }
        };
        $scope.addexists1 = function (item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.batch_failure = function(){
            console.log("parent", $scope.selected1);
        };
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    test.controller('currencyCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('currency');
    return test;
});