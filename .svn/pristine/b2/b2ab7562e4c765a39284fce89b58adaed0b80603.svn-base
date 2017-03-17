/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    publicFunction.removeStyle('archive.css');
    var test = angular.module('batchmenu', []);
    test.controller('batchmenuCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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
        $scope.getDesserts = function() {
            getapp1();
            $scope.promise = $timeout(function () {

            }, 1000);
        };

        $scope.clearFilter = function () {
            $scope.search = {
                menu_name:'',
                menu_description:''
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
            menu_name:'',
            menu_description:''
        };

        //搜索
        $scope.search_batchmenu = function(){
            getapp1('1',$scope.pagesize);
        };

        getapp1();
        function getapp1(page,size){
            var urltype='';
            if($scope.search.menu_name != null && $scope.search.menu_name != ''){
                urltype = urltype +'&menu_name='+$scope.search.menu_name
            }
            if($scope.search.menu_description != null && $scope.search.menu_description != ''){
                urltype = urltype +'&menu_description='+$scope.search.menu_description
            }
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.CDP_URL+'/docker/role/queryRoleByTenant?pageNumber='+$scope.query.page+'&pageSize='+$scope.query.limit+urltype,
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

        //新增
        $scope.add = function(ev) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/menu/batchmenu-dialog1.html',
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
                            $scope.list2.push(data[i].grant_id)
                        }
                    }

                    if($scope.list1.length == 0 && $scope.list2.length == 0){
                        $mdDialog.hide('');
                        getapp1(pageindex,pagesize);
                    }else if($scope.list1.length != 0 && $scope.list2.length != 0){
                        addbatch($scope.list1);
                        deletebatch($scope.list2,'0');
                    }else if($scope.list1.length != 0 && $scope.list2.length == 0){
                        addbatch($scope.list1,'0');
                    }else if($scope.list1.length == 0 && $scope.list2.length != 0){
                        deletebatch($scope.list2,'0');
                    }


                };

                function addbatch(item,i){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDP_URL+'/docker/resource/batchSaveForResource',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            principal_ids:item,
                            principal_type:'1',
                            resource_id:$scope.tarmenu.id,
                            resource_type:'1'
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

                function deletebatch(item,i){
                    var getconfig = {
                        method: 'PUT',
                        url: APP_CONFIG.CDP_URL+'/docker/resource/batchDeleteGrants',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: item
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

                $scope.tarmenu = {
                    id:'',
                    name:''
                };

                var watch = $scope.$watch('selectNode',function(newValue,oldValue, scope){
                    if($scope.selectNode !=undefined){
                        $scope.selected = [];
                        olditem=[];
                        $scope.tarmenu.id=$scope.selectNode.id;
                        $scope.tarmenu.name=$scope.selectNode.name;
                        showrest($scope.selectNode.id);
                        showrest1($scope.selectNode.id);
                    }
                });

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.getDesserts1 = function() {
                    getapp3();
                    $scope.promise1 = $timeout(function () {

                    }, 1000);
                };

                $scope.query1 = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                $scope.selected = [];
                var olditem=[];
                function showrest(id){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/resource/queryPrincipal?resource_id='+id+'&principal_type=1&resource_type=1&pageSize=1000',
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
                                $scope.selected  = data.data.list;
                                $scope.getDesserts1()
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
                function showrest1(id){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/resource/queryPrincipal?resource_id='+id+'&principal_type=1&resource_type=1&pageSize=1000',
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
                }

                //getapp3();
                function getapp3(page,size){

                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/role?pageNumber='+$scope.query1.page+'&pageSize='+$scope.query1.limit,
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

                                $scope.appdata1 = data.data.roles;
                                $scope.query1.total = data.data.totalRow;
                                $scope.query1.limit = data.data.pageSize;
                                $scope.query1.page = data.data.pageNumber;

                                //var goodsdata = data.data.roles;
                                //$scope.tableParams11 = new NgTableParams({count: 20}, { dataset: goodsdata});


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

        //删除
        $scope.delete = function(item) {
            var r = confirm('是否删除该菜单的'+item.role_name+'角色？');
            if (r == true) {
                var getconfig = {
                    method: 'PUT',
                    url: APP_CONFIG.CDP_URL+'/docker/resource/batchDeleteGrants',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data: [
                        item.grant_id
                    ]
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

    angular._LoadModule('batchmenu');
    return test;
});