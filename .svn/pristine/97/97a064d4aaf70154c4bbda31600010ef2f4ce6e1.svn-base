/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('batchperson', []);
    test.controller('batchpersonCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q, $log,$mdToast){

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
        //$scope.selected = [];
        $scope.getDesserts = function() {
            getapp1();
            $scope.promise = $timeout(function () {

            }, 1000);
        };

        $scope.clearFilter = function () {
            $scope.search = {
                name:'',
                org_name:''
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
            name:'',
            org_name:''
        };

        //搜索
        $scope.search_batchperson =  aaa;
        function aaa(){
            getapp1('1',$scope.pagesize);
        };
        var userid='';

        getapp1();
        function getapp1(page,size){
            var urltype='';
            if($scope.search.name != null && $scope.search.name != ''){
                urltype = urltype +'&user_name='+$scope.search.name
            }
            if($scope.search.org_name != null && $scope.search.org_name != ''){
                urltype = urltype +'&org_name='+$scope.search.org_name
            }
            var getconfig = {
                method: 'GET',
                url:APP_CONFIG.CDP_URL+'/docker/userinfo/queryUserDetails?pageNumber='+$scope.query.page+'&pageSize='+$scope.query.limit+urltype,
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
                        userid='';

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

        $scope.addperson = function(ev,item1) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            var selectitem=item1;
            var olditem=[];

            $mdDialog.show({
                controller: DialogController3,
                templateUrl: 'templates/basicdata/menu/batchperson-dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {

                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
            function DialogController3($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(ev) {
                    var data=$scope.selected;
                    for(var i=0;i<data.length;i++){
                        data[i]._state="added";
                    }
                    if(olditem.length >0){
                        for(var j=0;j<olditem.length;j++){
                            var ids=[];
                            angular.forEach($scope.selected, function (value) {
                                this.push(value.id);
                            },ids);
                            var idx = ids.indexOf(olditem[j].id);
                            if (idx > -1) {
                                data[j]._state='old';
                            }
                            else {
                                olditem[j]._state='deleted';
                                data.splice(j, 0, olditem[j]);
                            }
                        }
                    }

                    $scope.list1=[];
                    $scope.list2=[];
                    for(var i=0;i<data.length;i++){
                        if(data[i]._state == 'added'){
                            $scope.list1.push(data[i].id)
                        }
                        if(data[i]._state == 'deleted'){
                            $scope.list2.push(data[i].id)
                        }
                    }

                    if($scope.list1.length == 0 && $scope.list2.length == 0){
                        $mdDialog.hide('');
                        edit1(ev,selectitem)
                    }else if($scope.list1.length != 0 && $scope.list2.length != 0){
                        addbatch($scope.list1,'',ev);
                        deletebatch($scope.list2,'0',ev);
                    }else if($scope.list1.length != 0 && $scope.list2.length == 0){
                        addbatch($scope.list1,'0',ev);
                    }else if($scope.list1.length == 0 && $scope.list2.length != 0){
                        deletebatch($scope.list2,'0',ev);
                    }

                };

                function addbatch(item,i,ev){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDP_URL+'/docker/userinfo/addUserRoles/'+selectitem.user_id,
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "role_ids": item,
                            "user_id":selectitem.user_id,
                            "isdynamictype": "1"
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                if(i=='0'){
                                    $mdDialog.hide('修改成功！');
                                    //getapp1(pageindex,pagesize);
                                    edit1(ev,selectitem)
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

                function deletebatch(item,i,ev){
                    var getconfig = {
                        method: 'PUT',
                        url: APP_CONFIG.CDP_URL+'/docker/userinfo/deleteRoles',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "role_ids": item,
                            "user_id":selectitem.user_id,
                            "isdynamictype": "1"
                        }
                    };
                    $http(getconfig)
                        .success(function (data, status, headers, config) {
                            $scope.content = headers('x-auth-token');
                            if ($scope.content != '' && $scope.content != null) {
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if (data.code == '0000') {

                                if(i=='0'){
                                    $mdDialog.hide('修改成功！');
                                    //getapp1(pageindex,pagesize);
                                    edit1(ev,selectitem)
                                }

                            } else if (data.code == '6666') {

                            } else {
                                alert(data.msg)
                            }

                        })
                        .error(function (data, status, headers, config) {
                            //alert(status)
                        });
                }

                $scope.selected = selectitem.list;
                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.getDesserts2 = function() {
                    getapp3();
                    $scope.promise2 = $timeout(function () {

                    }, 1000);
                };

                $scope.query2 = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                //$scope.pagesize = '5';
                //$scope.pageindex = '1';
                $scope.search = {
                    description:'',
                    name:''
                };

                //搜索
                $scope.search_pedefine = function(){
                    getapp3('1',$scope.pagesize);
                };

                getapp4();
                function getapp4(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/userinfo/queryRoles/'+selectitem.user_id+'?pageSize=10000',
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

                                olditem = data.data.page;

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

                getapp3();
                function getapp3(page,size){

                    var urltype='';
                    if($scope.search.name != null && $scope.search.name != ''){
                        urltype = urltype +'&name='+$scope.search.name
                    }
                    if($scope.search.description != null && $scope.search.description != ''){
                        urltype = urltype +'&description='+$scope.search.description
                    }

                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/role?pageNumber='+$scope.query2.page+'&pageSize='+$scope.query2.limit+urltype,
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

                                $scope.appdata2 = data.data.roles;
                                $scope.query2.total = data.data.totalRow;
                                $scope.query2.limit = data.data.pageSize;
                                $scope.query2.page = data.data.pageNumber;

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

        $scope.edit = edit1;
        function edit1(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/menu/batchperson-dialog1.html',
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
                    getapp1(pageindex, pagesize);
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                    getapp1(pageindex, pagesize);
                };

                $scope.edit_batchperson = {
                    user_id:item.user_id,
                    list:[]
                };

                $scope.search11 = {
                    name:'',
                    type:''
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.getDesserts1 = function() {
                    getapp2();
                    $scope.promise1 = $timeout(function () {

                    }, 1000);
                };
                $scope.query1 = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                //搜索
                $scope.search_batchperson1 =  function(){
                    getapp2();
                };

                getapp2();
                function getapp2(){
                    var urltype='';
                    if($scope.search11.name != null && $scope.search11.name != ''){
                        urltype = urltype +'&role_name='+$scope.search11.name
                    }
                    if($scope.search11.type != null && $scope.search11.type != ''){
                        urltype = urltype +'&role_type='+$scope.search11.type
                    }
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/userinfo/queryRoles/'+$scope.edit_batchperson.user_id+'?pageSize=10000'+urltype,
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

                                $scope.appdata1 = data.data.page;
                                $scope.edit_batchperson.list = data.data.page;

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

                $scope.delete = function(item){
                    var r = confirm('是否删除该用户的'+item.name+'角色？');
                    if (r == true) {
                        var getconfig = {
                            method: 'PUT',
                            url: APP_CONFIG.CDP_URL+'/docker/userinfo/deleteRoles',
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
                            },
                            data:{
                                "role_ids": [item.id],
                                "user_id":$scope.edit_batchperson.user_id,
                                "isdynamictype": "1"
                            }
                        };
                        $http(getconfig)
                            .success(function(data, status, headers, config) {
                                $scope.content=headers('x-auth-token');
                                if($scope.content!=''&& $scope.content!=null){
                                    $cookies.put('JSESSION', $scope.content);
                                }
                                if(data.code=='0000'){
                                    alert('删除成功！');
                                    getapp2();
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
                    }else{

                    }
                };

                //批量失效(查询时候要重置)
                $scope.selected1 = [];
                $scope.batch_failure = function(){
                    var a1=[];
                    for(var i=0;i<$scope.selected1.length;i++){
                        a1.push($scope.selected1[i].id);
                    }
                    var getconfig = {
                        method: 'PUT',
                        url: APP_CONFIG.CDP_URL+'/docker/userinfo/deleteRoles',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "role_ids": a1,
                            "user_id":$scope.edit_batchperson.user_id,
                            "isdynamictype": "1"
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                alert('删除成功！');
                                $scope.selected1 = [];
                                getapp2();
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
            }
        };

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    test.controller('batchpersonCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('batchperson');
    return test;
});