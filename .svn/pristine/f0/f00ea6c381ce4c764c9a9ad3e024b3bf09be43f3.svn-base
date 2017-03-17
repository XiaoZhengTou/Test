/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular','js/shared/ruzhangdanwei.js'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('processauthyewu', ['md.ruzhangdanwei']);
    test.controller('processauthyewuCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q,$mdToast){

        $scope.selected = [];
        $scope.search = {
            from_who:'',
            from_who_name:'',
            to_who_account:'',
            to_who_name:'',
            start_amount:'',
            end_amount:'',
            start_time:null,
            end_time:null,
            form_type:'',
            orgid:'',
            org_name:'',
            busi_org_id:'',
            company_id:'',
            rule_id:'',
            fee_type_tree_id:'',
            fee_type_id:'',
            status:'2'
        };

        function getapp1(page,size){
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

        $scope.save = function () {

        };

        $scope.delete = function () {

        };

        $scope.back = function () {
            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/processauth"
        };

        //授权人
        var currentUser = publicFunction.localGet("user")['data']['user'];
        $scope.search.from_who_name = currentUser['userName'];
        $scope.search.from_who = currentUser['userId'];

        //被授权人
        $scope.addperson2 = function(ev) {
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/shared/organization4.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(answer) {
                if (answer) {
                    if (answer) {
                        $scope.search.to_who_name = answer.user_full_name;
                        $scope.search.to_who_account = answer.user_id
                    }
                }
            }, function() {

            });
        };
        function DialogController2($scope, $mdDialog) {
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

        //授权节点
        $scope.ruleselected=[];
        $scope.getrule = function(ev,item){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/workflow/processauthyewu-rule.html',
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
                    $mdDialog.hide();
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.selected = item;
                $scope.getDesserts = function() {
                    getctype();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };
                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                //获取模块
                getctype();
                function getctype(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/getItemsByCode?code=C_ALL_MODULE_TYPE',
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
        };

        //模块
        $scope.moduleselected=[];
        $scope.getmodule = function(ev,item){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/workflow/processauthyewu-module.html',
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
                    $mdDialog.hide();
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.selected = item;
                $scope.getDesserts = function() {
                    getctype();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };
                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                //获取模块
                getctype();
                function getctype(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/getItemsByCode?code=C_ALL_MODULE_TYPE',
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
        };

        //行政部门
        $scope.orgselected = [];
        $scope.addorg = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController4,
                templateUrl: 'templates/shared/organization3.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                cache:false,
                fullscreen: useFullScreen
            }).then(function(answer) {
                //截取传过来的ng-model
                //$parse(modeldata.model).assign(scope, answer);
                if (answer) {
                    var aa=true;
                    for(var i=0;i<$scope.orgselected.length;i++){
                        if(answer.id == $scope.orgselected[i].org_id){
                            aa = false
                        }
                    }
                    if(aa == true){
                        $scope.orgselected.push({
                            org_name:answer.org_name,
                            org_id:answer.id
                        })
                    }
                }
            }, function() {

            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
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

            $scope.getdefault = function(){
                var currentUser = publicFunction.localGet("user")['data']['user'];
                var url = APP_CONFIG.CDP_URL+'/docker/userinfo/getUserById/' +currentUser['userId'];
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'x-auth-token':$cookies.get("JSESSION")
                    },
                }).success(function(data, status, headers, config) {
                    console.log(data);
                    if (data.code == "0000") {
                        //$scope.orgData = data;
                        var aa=[];
                        aa.push({
                            id:data.data.org_id,
                            org_name:data.data.org_name
                        });
                        $scope.orgData = {
                            "code":"0000",
                            "data":{
                                "orgs":aa,
                                "users":[],
                                "paths":[],
                                "page":{"pageSize":5,"pageNumber":1,"totalRow":1,"totalPage":1}
                            },
                            "msg":"success"
                        };

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
            $scope.getdefault();
            $scope.getDate = function(pid) {
                // pid=(pid==null?"":pid;
                console.log(pid);
                var url = APP_CONFIG.CDP_URL+'/'+ 'docker/tenantorg/queryOrgUsersByOrgId?org_id=' + pid;
                //console.log(publicmodel.Token);
                //$http.defaults.headers.common["x-auth-token"] = publicmodel.TokenOrg;
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
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

            }
            //$scope.getDate("");
            $scope.onSearch = function(key) {
                if (key) {
                    key = encodeURIComponent(encodeURIComponent(key));
                    if (key) {
                        var url = APP_CONFIG.CDP_URL+'/'+ 'docker/userinfo/queryUserListByName?user_name=' + key;
                        console.log(url);
                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
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

        //入账单位
        $scope.ruzhangdanwei = [];
        $scope.ruzhangdanwei1 = [];

        //预算部门
        $scope.busiorgselected=[];
        $scope.getbusiorg = function(ev,item){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/workflow/processauthyewu-busiorg.html',
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
                    $mdDialog.hide();
                };

                var bookmark;
                $scope.filter = {
                    source : [
                        {id:'busi_org_name',name:'预算部门名称'},
                        {id:'busi_org_code',name:'预算部门编码'}
                    ],
                    value : {},
                    setFilter : function(x){
                        $scope.filter.value = x;
                    },
                    options: {
                        debounce: 500
                    }
                };
                $scope.filter.value = $scope.filter.source[0];
                $scope.removeFilter = removeFilter;
                function removeFilter() {
                    $scope.filter.show = false;
                    $scope.searchText = '';
                    getbusiorg1();
                }
                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.selected = item;
                $scope.getDesserts = function() {
                    getbusiorg1();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };
                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                $scope.search = {
                    busi_org_code:'',
                    busi_org_name:'',
                    status:'ALL'
                };

                $scope.$watch('searchText', function (newValue, oldValue) {
                    if(!oldValue) {
                        bookmark = $scope.query.page;
                    }

                    if(newValue !== oldValue) {
                        $scope.query.page = 1;
                    }

                    if(!newValue) {
                        $scope.query.page = bookmark;
                    }
                    getbusiorg1();
                });

                //获取预算组织
                getbusiorg1();
                function getbusiorg1(){
                    var param = {
                        "page_number": $scope.query.page,
                        "page_size": $scope.query.limit,
                        enable_flag:'Y'
                    };
                    param[$scope.filter.value.id] = $scope.searchText;
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys/select',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:param
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
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

        //预算科目
        $scope.feetypeselected=[];
        $scope.getfeetype = function(ev,item){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/workflow/processauthyewu-feetype.html',
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
                    $mdDialog.hide();
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.selected = item;
                $scope.getDesserts = function() {
                    getbusiorg1();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };
                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                //获取预算科目集
                getfeetypetree();
                function getfeetypetree(page,size){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetypetree/page',
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

                                $scope.feetypetree = data.data.info;

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

                //获取预算科目
                $scope.getfeetype = function(id,name){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/page',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:1,
                            page_size:10000,
                            enable_flag:'Y',
                            fee_type_tree_id:id
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.feetype = data.data.info;
                                if($scope.feetype != undefined){
                                    for(var i =0;i<$scope.feetype.length;i++){
                                        for(var j=0;j<$scope.selected.length;j++){
                                            if($scope.feetype[i].fee_type_id == $scope.selected[j].fee_type_id){
                                                $scope.feetype[i].disabled1=true;
                                            }
                                        }
                                    }
                                }
                                $scope.fee_type_tree_name=name;
                                $scope.fee_type_tree_id=id;

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

                var selectdata='';
                $scope.toggle = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.fee_type_id);
                    },ids);
                    var idx = ids.indexOf(item.fee_type_id);
                    if (idx > -1) {
                        $scope.selected.splice(idx, 1);
                    }
                    else {
                        item.fee_type_tree_name=$scope.fee_type_tree_name;
                        item.fee_type_tree_id=$scope.fee_type_tree_id;
                        $scope.selected.push(item);
                    }
                };
                $scope.exists = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.fee_type_id);
                    },ids);
                    if(ids.indexOf(item.fee_type_id) > -1){
                        item.check1=true;
                    }else{
                        item.check1=false
                    }
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

    angular._LoadModule('processauthyewu');
    return test;
});