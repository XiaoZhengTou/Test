/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('processauth', []);
    test.controller('processauthCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q,$mdToast,publicmodel,$location){

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
                to_who_name:'',
                start_time:null,
                end_time:null,
                status:'ALL'
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
            to_who_name:'',
            start_time:null,
            end_time:null,
            status:'ALL'
        };
        $scope.type = '1';

        //搜索
        $scope.search_processauth = function(){
            getapp1();
        };

        $scope.settype = function(i){
            $scope.type = i;
            //getapp1();
        };

        function getapp1(){
            var type='';
            if($scope.type == '1'){
                type = '1'
            }else if($scope.type == '2'){
                type = '2'
            }
            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.JIEBAO_URL+'/cm/prsbranch/like_jtzk',
                url: 'http://10.73.37.47:8080/smart-expense-web/cm/prsbranch/like_jtzk',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    query_param:{
                        form_type:$scope.search.form_type == ''? undefined:$scope.search.form_type,
                        order_type:$scope.search.order_type == ''? undefined:$scope.search.order_type,
                        mainorg_layer:$scope.search.mainorg_layer == ''? undefined:$scope.search.mainorg_layer,
                        fee_type_name:$scope.search.fee_type_id == ''? undefined:$scope.search.fee_type_id,
                        status:$scope.search.status == 'ALL'? undefined:$scope.search.status,
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

        $scope.addtravel = addtravel;
        function addtravel(ev,selectitem1) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var currentUser = publicFunction.localGet("user")['data']['user'];
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/workflow/processauth-dialog1.html',
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
                        //url: APP_CONFIG.SMART_URL + '/cm/prsbranch/save_jtzk',
                        url: 'http://10.73.37.47:8080/smart-expense-web/cm/prsbranch/save_jtzk',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "cmemsprsbranckr": $scope.processauth
                        }
                    };
                    $http(getconfig)
                        .success(function (data, status, headers, config) {
                            $scope.content = headers('x-auth-token');
                            if ($scope.content != '' && $scope.content != null) {
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if (data.code == '0000') {
                                //alert('新增成功！');
                                $mdDialog.hide('新增成功！');
                                getapp1(pageindex, pagesize);
                            } else if (data.code == '6666') {

                            } else {
                                alert(data.msg)
                            }

                        })
                        .error(function (data, status, headers, config) {
                            //alert(status)
                        });
                };

                $scope.from_who_name = currentUser['userName'];

                if(selectitem1 != undefined){
                    $scope.processauth = {
                        from_who: currentUser['userId'],
                        start_time:selectitem1.start_time,
                        end_time:selectitem1.end_time,
                        to_who_account:selectitem1.to_who_account,
                        to_who_name:selectitem1.to_who_name
                    };
                }else{
                    $scope.processauth = {
                        from_who: currentUser['userId'],
                        start_time:null,
                        end_time:null,
                        to_who_account:'',
                        to_who_name:''
                    };
                }

                $scope.addperson = function(ev,item) {
                    var selectitem=item;
                    $mdDialog.show({
                        controller: DialogController4,
                        templateUrl: 'templates/shared/organization4.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: true
                    }).then(function(answer) {
                        if (answer) {
                            if (answer) {
                                selectitem.to_who_name = answer.user_full_name;
                                selectitem.to_who_account = answer.user_id
                            }
                            addtravel(ev,selectitem)
                        }
                    }, function() {

                    });
                };
                function DialogController4($scope, $mdDialog) {
                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function(answer) {
                        $mdDialog.hide(answer);
                    };

                    $scope.getDate = function(pid) {
                        // pid=(pid==null?"":pid;
                        console.log(pid);
                        var url = APP_CONFIG.CDP_URL+'/docker/tenantorg/queryOrgUsersByOrgId?org_id=' + pid;
                        //console.log(publicmodel.Token);
                        //$http.defaults.headers.common["x-auth-token"] = publicmodel.TokenOrg;
                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'x-auth-token':$cookies.get("JSESSION")
                            },
                        }).success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.code == "0000") {
                                $scope.orgData = data;
                            } else {
                                //$mdDialog.show(
                                //    $mdDialog.alert()
                                //        .parent(angular.element(document.body))
                                //        .clickOutsideToClose(true)
                                //        .title('提示信息')
                                //        .textContent('访问服务器异常：' + data.code + data.msg)
                                //        .ariaLabel('提示信息')
                                //        .ok('确定')
                                //);
                                alert(data.msg)
                            }
                        }).error(function(data, status, headers, config) {});

                    };
                    $scope.getDate("");
                    $scope.onSearch = function(key) {
                        if (key) {
                            key = encodeURIComponent(encodeURIComponent(key));
                            if (key) {
                                var url = APP_CONFIG.CDP_URL+'/docker/userinfo/queryUserListByName?user_name=' + key;
                                console.log(url);
                                $http({
                                    method: 'GET',
                                    url: url,
                                    headers: {
                                        'x-auth-token':$cookies.get("JSESSION")
                                    },
                                }).success(function(data, status, headers, config) {
                                    console.log(data);
                                    $scope.orgData = {
                                        data: {
                                            users: data.data.list,
                                        }
                                    };
                                    console.log($scope.orgData);
                                }).error(function(data, status, headers, config) {});
                            }
                        } else {
                            $scope.getDate("");
                        }

                    }

                }
            }
        };

        $scope.edittravel = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/workflow/processauth-dialog2.html',
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
                    $mdDialog.hide('修改成功！');
                };

                $scope.delete = function(){
                    var ids=[];
                    ids.push((item.id));
                    var getconfig = {
                        method: 'POST',
                        //url: APP_CONFIG.SMART_URL+'/cm/prsbranch/batchDisable',
                        url: 'http://10.73.37.47:8080/smart-expense-web/cm/prsbranch/batchDisable',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },data:{
                            ids:ids
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
                                $mdDialog.hide('作废成功！');
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

                $scope.processauth = {
                    id:item.id,
                    from_who: item.from_who,
                    from_who_name: item.from_who_name,
                    start_time:item.start_time,
                    end_time:item.end_time,
                    to_who_account:item.to_who_account,
                    to_who_name:item.to_who_name,
                    status:item.status
                };
            }
        };

        $scope.addyewu = function () {
            $location.path("/processauthyewu").search('status','add')
        };

        $scope.edityewu = function (item) {
            $location.path("/processauthyewu").search('status','edit').search('item',item)
        };

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        $scope.batch_failure = function(){
            console.log("parent", $scope.selected1);
            var ids=[];
            for(var i=0;i<$scope.selected1.length;i++){
                if($scope.selected1[i].status == '1'){
                    ids.push(($scope.selected1[i].id));
                }
            }
            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.SMART_URL+'/cm/prsbranch/batchDisable',
                url: 'http://10.73.37.47:8080/smart-expense-web/cm/prsbranch/batchDisable',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    ids:ids
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.selected1 = [];
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

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('processauth');
    return test;
});