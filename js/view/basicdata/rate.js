/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('rate', []);
    test.controller('rateCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element, $mdBottomSheet, $mdToast,$timeout){

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
            $scope.search.from_currency='';
            $scope.search.load_date=null;
            $scope.search.to_currency='';
            //if($scope.filter.form.$dirty) {
            //    $scope.filter.form.$setPristine();
            //}
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
                from_currency:'',
                to_currency:'',
                load_date:null
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
            from_currency:'',
            to_currency:'',
            load_date:null
        };


        //搜索
        $scope.search_rate = function(){
                getapp1('1',$scope.pagesize);

        };

        getapp1();
        function getapp1(page,size){
            var str='';
            if($scope.search.load_date != null && $scope.search.load_date != undefined){
                str=$filter('date')($scope.search.load_date, "yyyy-MM-dd");
            }

            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/rates/page',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    from_currency:$scope.search.from_currency == ''? undefined:$scope.search.from_currency,
                    to_currency:$scope.search.to_currency == ''? undefined:$scope.search.to_currency,
                    conversion_date:$scope.search.load_date == null? undefined:str
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.appdata = data.data.data;
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

        //获取货币
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
                        $scope.currencydata_form=data.data;
                        $scope.currencydata_to=data.data;
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

        $scope.add = function(ev) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/rate-dialog1.html',
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
                    for(var i=0;i<$scope.currencydata_form.length;i++){
                        if($scope.rate.from_currency == $scope.currencydata_form[i].currency_code){
                            $scope.rate.from_currency_name=$scope.currencydata_form[i].currency_name
                        }
                    }
                    for(var i=0;i<$scope.currencydata_to.length;i++){
                        if($scope.rate.to_currency == $scope.currencydata_to[i].currency_code){
                            $scope.rate.to_currency_name=$scope.currencydata_to[i].currency_name
                        }
                    }
                    var date=null;
                    if($scope.rate.conversion_date != null && $scope.rate.conversion_date != undefined){
                        date=$filter('date')($scope.rate.conversion_date, "yyyy-MM-dd");
                    }

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/rates',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "from_currency_name": $scope.rate.from_currency_name,
                            "from_currency": $scope.rate.from_currency,
                            "to_currency_name": $scope.rate.to_currency_name,
                            "conversion_type": $scope.rate.conversion_type,
                            "conversion_rate": $scope.rate.conversion_rate,
                            "conversion_date": date,
                            "to_currency": $scope.rate.to_currency
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

                //获取货币
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

                                $scope.currencydata_form=data.data;
                                $scope.currencydata_to=data.data;

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

                $scope.changedate = function(type){
                    $scope.rate.conversion_date = null;
                    if(type == 'CORPORATE'){
                        $scope.onlyWeekendsPredicate = function(date) {
                            var day = date.getDate();
                            return day === 1;
                        };
                    }else if(type == 'N'){
                        $scope.onlyWeekendsPredicate = function(date) {
                            var day = new Date();
                            return day;
                        };
                    }
                };

                $scope.rate = {
                    "from_currency_name": "",
                    "from_currency": "",
                    "to_currency_name": "",
                    "conversion_type": '',
                    "conversion_rate": null,
                    "conversion_date": null,
                    "to_currency": ''
                };
            }
        };

        $scope.edit = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/rate-dialog2.html',
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
                    for(var i=0;i<$scope.currencydata_form.length;i++){
                        if($scope.rate.from_currency == $scope.currencydata_form[i].currency_code){
                            $scope.rate.from_currency_name=$scope.currencydata_form[i].currency_name
                        }
                    }
                    for(var i=0;i<$scope.currencydata_to.length;i++){
                        if($scope.rate.to_currency == $scope.currencydata_to[i].currency_code){
                            $scope.rate.to_currency_name=$scope.currencydata_to[i].currency_name
                        }
                    }
                    var date=null;
                    if($scope.rate.conversion_date != null && $scope.rate.conversion_date != undefined){
                        date=$filter('date')($scope.rate.conversion_date, "yyyy-MM-dd");
                    }

                    var getconfig = {
                        method: 'PUT',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/rates',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "conversion_id":$scope.rate.conversion_id,
                            "from_currency_name": $scope.rate.from_currency_name,
                            "from_currency": $scope.rate.from_currency,
                            "to_currency_name": $scope.rate.to_currency_name,
                            "conversion_type": $scope.rate.conversion_type,
                            "conversion_rate": $scope.rate.conversion_rate,
                            "conversion_date": date,
                            "to_currency": $scope.rate.to_currency
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                //alert();
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
                        url: APP_CONFIG.JIEBAO_URL+'/docker/rates/'+$scope.rate.conversion_id,
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
                                //alert();
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

                //获取货币
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

                                $scope.currencydata_form=data.data;
                                $scope.currencydata_to=data.data;

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

                $scope.changedate = function(type){
                    $scope.rate.conversion_date = null;
                    if(type == 'CORPORATE'){
                        $scope.onlyWeekendsPredicate = function(date) {
                            var day = date.getDate();
                            return day === 1;
                        };
                    }else if(type == 'N'){
                        $scope.onlyWeekendsPredicate = function(date) {
                            var day = new Date();
                            return day;
                        };
                    }
                };

                var str='';
                if(item.conversion_date != null && item.conversion_date != undefined){
                    str=item.conversion_date.toString();
                    str =  str.replace(/-/g,"/");
                }

                $scope.rate = {
                    "conversion_id":item.conversion_id,
                    "from_currency_name": item.from_currency_name,
                    "from_currency": item.from_currency,
                    "to_currency_name": item.to_currency_name,
                    "conversion_type": item.conversion_type,
                    "conversion_rate": item.conversion_rate,
                    "conversion_date": str == ''? null:new Date(str),
                    "to_currency": item.to_currency
                };
            }
        };

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        var selectdata='';
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
                for (var i = 0; i < selectdata.length; i++) {
                    $scope.selected1.push(selectdata[i].conversion_id)
                }
                $scope.addtablealldelete = true;
            }
        };
        $scope.addtoggle1 = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
            if (list.length == selectdata.length) {
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

    test.controller('rateCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('rate');
    return test;
});