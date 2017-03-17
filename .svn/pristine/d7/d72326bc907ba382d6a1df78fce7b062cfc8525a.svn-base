/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('pedetail', []);
    test.controller('pedetailCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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
        $scope.pedefine = {
            description:'',
            name:'',
            type:'功能角色',
            id:'',
            list:[]
        };

        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().pedetail_name != null && $location.search().pedetail_name != undefined){
                $scope.pedefine.name=$location.search().pedetail_name.name;
                $scope.pedefine.description=$location.search().pedetail_name.description;
                $scope.pedefine.id=$location.search().pedetail_name.id;
                if($location.search().pedetail_name.id == '' ||$location.search().pedetail_name.id == null ||$location.search().pedetail_name.id == undefined){
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
                }else{
                    getapp1();
                }
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
            }
        });

        $scope.back = function (){
            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
        };

        //getapp1();
        function getapp1(page,size){
            if($scope.pedefine.id == '' ||$scope.pedefine.id == null ||$scope.pedefine.id == undefined){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
            }else{
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/role/queryUsersByRole/page/'+$scope.pedefine.id+'?pageNumber='+$scope.query.pag+'&pageSize='+$scope.query.limit+'&isdynamictype=1',
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

        //新增
        $scope.add = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var role_name = $scope.pedefine.name;
            var roleid = $scope.pedefine.id;
            var rolelist = [];
            var olditem = [];
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.CDP_URL+'/docker/role/queryUsersByRole/page/'+$scope.pedefine.id+'?pageNumber=1&pageSize=10000&isdynamictype=1',
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
                        olditem = data.data.list;
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
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.CDP_URL+'/docker/role/queryUsersByRole/page/'+$scope.pedefine.id+'?pageNumber=1&pageSize=10000&isdynamictype=1',
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
                        rolelist = data.data.list;
                        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                        $mdDialog.show({
                            controller: DialogController1,
                            templateUrl: 'templates/basicdata/menu/pedetail-dialog1.html',
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
            function DialogController1($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    var data=$scope.selected;
                    for(var i=0;i<data.length;i++){
                        data[i]._state="added";
                    }
                    if(olditem.length >0){
                        for(var j=0;j<olditem.length;j++){
                            var ids=[];
                            angular.forEach($scope.selected, function (value) {
                                this.push(value.user_id);
                            },ids);
                            var idx = ids.indexOf(olditem[j].user_id);
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
                            $scope.list1.push(data[i].user_id)
                        }
                        if(data[i]._state == 'deleted'){
                            $scope.list2.push(data[i].user_id)
                        }
                    }

                    if($scope.list1.length == 0 && $scope.list2.length == 0){
                        $mdDialog.hide('');
                        getapp1(pageindex,pagesize);
                    }else if($scope.list1.length != 0 && $scope.list2.length != 0){
                        addbatch($scope.list1,'');
                        deletebatch($scope.list2,'0');
                    }else if($scope.list1.length != 0 && $scope.list2.length == 0){
                        addbatch($scope.list1,'0');
                    }else if($scope.list1.length == 0 && $scope.list2.length != 0){
                        deletebatch($scope.list2,'0');
                    }


                };

                function addbatch(item,i,ev){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDP_URL+'/docker/role/addUserRoles/'+roleid,
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "role_id": roleid,
                            "user_ids": item,
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
                                    getapp1(pageindex,pagesize);
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
                        url: APP_CONFIG.CDP_URL+'/docker/role/deleteUsers',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "role_id": roleid,
                            "user_ids":item,
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
                                    getapp1(pageindex,pagesize);
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

                $scope.pedetail ={
                    "role_id": roleid,
                    "role_name": role_name,
                    "user_ids": "",
                    "isdynamictype": "1"
                };

                $scope.selected =rolelist;

                $scope.pagesize = '5';
                $scope.pageindex = '1';

                //getapp11();
                function getapp11(page,size){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/userinfo/queryUserDetails?pageNumber='+page+'&pageSize='+size,
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
                                var goodsdata = data.data.list;
                                $scope.tableParams2 = new NgTableParams({count: 20}, { dataset: goodsdata});

                                var totalpage=data.data.totalPage;
                                if(page == '1'){
                                    $scope.lastpaged = true;
                                    if(page == totalpage){
                                        $scope.nextpaged = true
                                    }else{
                                        $scope.nextpaged = false
                                    }
                                }else{
                                    $scope.lastpaged = false;
                                    if(page == totalpage){
                                        $scope.nextpaged = true
                                    }
                                }
                                $scope.total = data.data.totalRow;

                                $scope.page1= (parseInt(data.data.pageNumber)-1) * parseInt(size) +1;
                                if($scope.nextpaged){
                                    $scope.page2= parseInt(data.data.totalRow);
                                }else{
                                    $scope.page2= parseInt(data.data.pageNumber) * parseInt(size);
                                }

                                $scope.pages=[];
                                for(var i=1;i<=totalpage;i++){
                                    $scope.pages.push(i);
                                }

                                //$scope.pagesize = page;
                                //$scope.pageindex = size;
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

                var watch = $scope.$watch('pageindex',function(newValue,oldValue, scope){
                    if($scope.pageindex != undefined){
                        getapp11($scope.pageindex,$scope.pagesize);
                    }
                });

                var watch1 = $scope.$watch('pagesize',function(newValue,oldValue, scope){
                    if($scope.pagesize != undefined){
                        $scope.pageindex = '1';
                        getapp11($scope.pageindex,$scope.pagesize);
                    }
                });

                $scope.lastpage = function(){
                    getapp11(parseInt($scope.pageindex)-1,$scope.pagesize);
                    $scope.pageindex = (parseInt($scope.pageindex)-1).toString();
                };

                $scope.nextpage = function(){
                    getapp11(parseInt($scope.pageindex)+1,$scope.pagesize);
                    $scope.pageindex = (parseInt($scope.pageindex)+1).toString();
                };

                var selectdata='';
                $scope.toggle = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.user_id);
                    },ids);
                    var idx = ids.indexOf(item.user_id);
                    if (idx > -1) {
                        $scope.selected.splice(idx, 1);
                    }
                    else {
                        $scope.selected.push(item);
                    }
                };
                $scope.exists = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.user_id);
                    },ids);
                    if(ids.indexOf(item.user_id) > -1){
                        item.check1=true;
                    }else{
                        item.check1=false
                    }
                };
            }
        };

        //删除
        $scope.delete = function(item) {
            var r = confirm('是否删除该用户的'+$scope.pedefine.name+'角色？');
            if (r == true) {
                var getconfig = {
                    method: 'PUT',
                    url: APP_CONFIG.CDP_URL+'/docker/userinfo/deleteRoles',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data:{
                        "role_ids":[$scope.pedefine.id],
                        "user_id":item.user_id,
                        "isdynamictype":"1"
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&&$scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){

                            alert('删除成功！');
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
            }else{

            }
        };

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('pedetail');
    return test;
});