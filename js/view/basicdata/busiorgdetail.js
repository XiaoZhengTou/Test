/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('busiorgdetail', []);
    test.controller('busiorgdetailCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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
                busi_org_desc:'',
                enable_flag:'Y',
                busi_org_code:'',
                busi_org_name:''
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
            busi_org_desc:'',
            enable_flag:'Y',
            busi_org_code:'',
            busi_org_name:''
        };

        //搜索
        $scope.search_cost_basic = function(){
                getapp1('1',$scope.pagesize);
        };

        $scope.busiorgdetail_name='';
        $scope.busiorgdetail_remark='';
        $scope.busiorgdetail_id='';
        var id='';

        //页面跳转后的操作
        var watch = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().busiorgdetailname != null && $location.search().busiorgdetailname != undefined){
                //alert($location.search().name.fee_type_tree_name)
                $scope.busiorgdetail_name=$location.search().busiorgdetailname.busi_org_name;
                $scope.busiorgdetail_remark=$location.search().busiorgdetailname.busi_org_desc;
                $scope.busiorgdetail_id=$location.search().busiorgdetailname.busi_org_id;
                id=$location.search().busiorgdetailname.busi_org_id;
                if(id != null && id != undefined && id !=''){
                    getapp1();
                }else{
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/busiorg"
                }
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/busiorg"
            }
        });

        $scope.back = function (){
            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/busiorg"
        };

        //getapp1();
        function getapp1(page,size){
            if($scope.busiorgdetail_id == '' ||$scope.busiorgdetail_id == null ||$scope.busiorgdetail_id == undefined){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/busiorg"
            }else{
                var getconfig = {
                    method: 'POST',
                    //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/queryChild',
                    url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/queryChild',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data:{
                        page_number:parseInt($scope.query.page),
                        page_size:parseInt($scope.query.limit),
                        parent_org_id:id,
                        busi_org_name:$scope.search.busi_org_name == ''? undefined:$scope.search.busi_org_name,
                        busi_org_code:$scope.search.busi_org_code == ''? undefined:$scope.search.busi_org_code,
                        busi_org_desc:$scope.search.busi_org_desc == ''? undefined:$scope.search.busi_org_desc,
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
                method: 'PUT',
                //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/yz',
                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    enable_flag:sta,
                    busi_org_id:item.busi_org_id,
                    busi_org_code:item.busi_org_code,
                    busi_org_name:item.busi_org_name,
                    busi_org_desc:item.busi_org_desc,
                    org_attribute:item.org_attribute,
                    parent_org_id:item.parent_org_id,
                    manage_org_name:item.manage_org_name,
                    manage_org_person:item.manage_org_person
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
        $scope.add =  add1;
        function add1(ev,selectitem1) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var id1=$scope.busiorgdetail_id;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/busiorgdetail-dialog1.html',
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
                        //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            busi_org_code:$scope.busiorgdetail.busi_org_code,
                            busi_org_name:$scope.busiorgdetail.busi_org_name,
                            busi_org_desc:$scope.busiorgdetail.busi_org_desc,
                            org_attribute:$scope.busiorgdetail.org_attribute,
                            manage_org_name:$scope.busiorgdetail.manage_org_name,
                            manage_org_person:$scope.busiorgdetail.manage_org_person,
                            parent_org_id:id,
                            "enable_flag": "Y"
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

                if(selectitem1 != undefined){
                    $scope.busiorgdetail ={
                        busi_org_code:selectitem1.busi_org_code,
                        busi_org_name:selectitem1.busi_org_name,
                        busi_org_desc:selectitem1.busi_org_desc,
                        org_attribute:selectitem1.org_attribute,
                        parent_org_id:selectitem1.parent_org_id,
                        enable_flag:selectitem1.enable_flag,
                        manage_org_name:selectitem1.manage_org_name,
                        manage_org_person:selectitem1.manage_org_person
                    };
                }else{
                    $scope.busiorgdetail ={
                        busi_org_code:'',
                        busi_org_name:'',
                        busi_org_desc:'',
                        org_attribute:'',
                        parent_org_id:id,
                        enable_flag:'Y',
                        manage_org_name:'',
                        manage_org_person:''
                    };
                }

                $scope.addarea1 = function(ev,item1,type) {
                    var modeldata = $scope.$eval("{'model':'busiorgdetail'}");
                    var selectitem=item1;
                    console.log(modeldata.model);
                    $mdDialog.show({
                        controller: DialogController4,
                        templateUrl: 'templates/shared/organization4.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: true
                    }).then(function(answer) {
                        //截取传过来的ng-model
                        //$parse(modeldata.model).assign(scope, answer);
                        if (answer) {
                            selectitem.manage_org_person = answer.user_id;
                            selectitem.manage_org_name = answer.user_full_name
                        }
                        if(type == 'add'){
                            add1(ev,selectitem)
                        }else if(type == 'edit'){
                            edit1(ev,'',selectitem)
                        }
                    }, function() {

                    });
                };
            }
        };

        //编辑
        $scope.edit = edit1;
        function edit1(ev,item,selectitem1) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var id1=$scope.busiorgdetail_id;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/busiorgdetail-dialog2.html',
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
                        //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            busi_org_id:$scope.busiorgdetail.busi_org_id,
                            busi_org_code:$scope.busiorgdetail.busi_org_code,
                            busi_org_name:$scope.busiorgdetail.busi_org_name,
                            busi_org_desc:$scope.busiorgdetail.busi_org_desc,
                            org_attribute:$scope.busiorgdetail.org_attribute,
                            parent_org_id:id,
                            "enable_flag": $scope.busiorgdetail.enable_flag,
                            "manage_org_person": $scope.busiorgdetail.manage_org_person,
                            "manage_org_name": $scope.busiorgdetail.manage_org_name
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

                if(selectitem1 != undefined){
                    $scope.busiorgdetail ={
                        busi_org_id:selectitem1.busi_org_id,
                        busi_org_code:selectitem1.busi_org_code,
                        busi_org_name:selectitem1.busi_org_name,
                        busi_org_desc:selectitem1.busi_org_desc,
                        org_attribute:selectitem1.org_attribute,
                        parent_org_id:selectitem1.parent_org_id,
                        enable_flag:selectitem1.enable_flag,
                        manage_org_name:selectitem1.manage_org_name,
                        manage_org_person:selectitem1.manage_org_person
                    };
                }else{
                    $scope.busiorgdetail = {
                        busi_org_id:item.busi_org_id,
                        busi_org_code:item.busi_org_code,
                        busi_org_name:item.busi_org_name,
                        busi_org_desc:item.busi_org_desc,
                        org_attribute:item.org_attribute,
                        parent_org_id:item.parent_org_id,
                        enable_flag:item.enable_flag,
                        manage_org_name:item.manage_org_name,
                        manage_org_person:item.manage_org_person
                    };
                }

                $scope.addarea1 = function(ev,item1,type) {
                    var modeldata = $scope.$eval("{'model':'busiorgdetail'}");
                    var selectitem=item1;
                    console.log(modeldata.model);
                    $mdDialog.show({
                        controller: DialogController4,
                        templateUrl: 'templates/shared/organization4.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: true
                    }).then(function(answer) {
                        //截取传过来的ng-model
                        //$parse(modeldata.model).assign(scope, answer);
                        if (answer) {
                            selectitem.manage_org_person = answer.user_id;
                            selectitem.manage_org_name = answer.user_full_name
                        }
                        if(type == 'add'){
                            add1(ev,selectitem)
                        }else if(type == 'edit'){
                            edit1(ev,'',selectitem)
                        }
                    }, function() {

                    });
                };
            }
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

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        $scope.batch_failure = function(){
            var ba2=[];
            for(var i=0;i<$scope.selected1.length;i++){
                ba2.push($scope.selected1[i].busi_org_id);
            }
            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys/batchdelete',
                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys/batchdelete',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: ba2
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
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    test.controller('busiorgdetailCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('busiorgdetail');
    return test;
});