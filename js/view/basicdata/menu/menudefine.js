/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    publicFunction.addStyle('archive.css');
    var test = angular.module('menudefine', []);
    test.controller('menudefineCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$mdToast,ztreeFactory,$timeout){

        $scope.tarmenu = {
            id:'',
            parentName:'',
            parent_id:'',
            name:'',
            description:'',
            url:'',
            visible:''
        };
        $scope.visible = '';
        $scope.deleteshow = true;
        $scope.editshow = true;
        $scope.addresourceshow = true;

        var watch = $scope.$watch('selectNode',function(newValue,oldValue, scope){
            if($scope.selectNode !=undefined){
                $scope.tarmenu.id=$scope.selectNode.id;
                $scope.tarmenu.parentName=$scope.selectNode.getPath()[0].name;
                $scope.tarmenu.parent_id=$scope.selectNode.parent_id;
                $scope.tarmenu.name=$scope.selectNode.name;
                $scope.tarmenu.description=$scope.selectNode.description;
                $scope.tarmenu.url=$scope.selectNode.url;
                $scope.tarmenu.visible=$scope.selectNode.visible;
                $scope.visible=$scope.selectNode.visible;
                $scope.deleteshow = false;
                $scope.editshow = false;
                $scope.addresourceshow = false;
                showrest($scope.selectNode.id);
            }
        });
        var watch = $scope.$watch('selectNode11',function(newValue,oldValue, scope){
            if($scope.selectNode11 !=undefined){
                selectitem1.parent_id=$scope.selectNode11.id;
                selectitem1.parentName=$scope.selectNode11.name;
            }
        });

        var selectitem1={
            parent_id:'',
            parentName:'',
            name:'',
            description:'',
            url:'',
            visible:''
        };

        $scope.add = function(ev,item,type) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            selectitem1.parent_id ='';
            selectitem1.parentName='';
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/menu/menudefine-dialog1.html',
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
                        url: APP_CONFIG.CDP_URL+'/docker/menu',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            parent_id:$scope.menudefine.parent_id,
                            name:$scope.menudefine.name,
                            description:$scope.menudefine.description,
                            url:$scope.menudefine.url,
                            visible:$scope.menudefine.visible
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                ztreeFactory.load($scope);
                                $mdDialog.hide('新增成功！');
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

                if(selectitem1.parent_id !='' || selectitem1.parentName !=''){
                    $scope.menudefine = {
                        parentName:selectitem1.parentName,
                        parent_id:selectitem1.parent_id,
                        name:selectitem1.name,
                        description:selectitem1.description,
                        url:selectitem1.url,
                        visible:selectitem1.visible
                    };
                }else{
                    if(type == '2'){
                        $scope.menudefine = {
                            parentName:item.name,
                            parent_id:item.id,
                            name:'',
                            description:'',
                            url:'',
                            visible:''
                        };
                    }else{
                        $scope.menudefine = {
                            parentName:'',
                            parent_id:'',
                            name:'',
                            description:'',
                            url:'',
                            visible:''
                        };
                    }

                }

                $scope.openmenu = function(ev,item) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                    selectitem1=item;
                    $mdDialog.show({
                        controller: DialogController3,
                        templateUrl: 'templates/basicdata/menu/menudefine-dialog3.html',
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
                    function DialogController3($scope, $mdDialog) {
                        $scope.hide = function() {
                            $mdDialog.hide();
                        };
                        $scope.numberChips=[];
                        $scope.cancel = function() {
                            $mdDialog.hide();
                            $mdDialog.show({
                                controller: DialogController1,
                                templateUrl: 'templates/basicdata/menu/menudefine-dialog1.html',
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
                        };
                        $scope.answer = function(ev) {
                            $mdDialog.hide();
                            $mdDialog.show({
                                controller: DialogController1,
                                templateUrl: 'templates/basicdata/menu/menudefine-dialog1.html',
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

                        };
                    }
                }
            }
        };

        $scope.edit = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            selectitem1.parent_id ='';
            selectitem1.parentName='';
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/menu/menudefine-dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item,node) {
                    if(item !='' && item != undefined){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(item)
                                .position('top right')
                                .hideDelay(1500)
                        );

                        $scope.tarmenu.id = '';
                        $scope.tarmenu.parentName = '';
                        $scope.tarmenu.parent_id = '';
                        $scope.tarmenu.name = '';
                        $scope.tarmenu.description = '';
                        $scope.tarmenu.url = '';
                        $scope.tarmenu.visible = '';
                        $scope.visible = '';
                        $scope.deleteshow = true;
                        $scope.editshow = true;
                        $scope.addresourceshow = true;
                        $scope.appdata = [];
                        olddata=[];
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
                        url: APP_CONFIG.CDP_URL+'/docker/menu/'+$scope.menudefine.id,
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            parent_id:$scope.menudefine.parent_id,
                            name:$scope.menudefine.name,
                            description:$scope.menudefine.description,
                            url:$scope.menudefine.url,
                            visible:$scope.menudefine.visible
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&&$scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                ztreeFactory.load($scope);
                                $mdDialog.hide('修改成功！');
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

                if(selectitem1.parent_id !='' || selectitem1.parentName !=''){
                    $scope.menudefine = {
                        parentName:selectitem1.parentName,
                        parent_id:selectitem1.parent_id,
                        name:selectitem1.name,
                        description:selectitem1.description,
                        url:selectitem1.url,
                        visible:selectitem1.visible,
                        id:selectitem1.id
                    };
                }else{
                    $scope.menudefine = {
                        parentName:item.parentName,
                        parent_id:item.parent_id,
                        name:item.name,
                        description:item.description,
                        url:item.url,
                        visible:item.visible,
                        id:item.id
                    };
                }

                $scope.openmenu = function(ev,item) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                    selectitem1=item;
                    $mdDialog.show({
                        controller: DialogController4,
                        templateUrl: 'templates/basicdata/menu/menudefine-dialog3.html',
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
                    function DialogController4($scope, $mdDialog) {
                        $scope.hide = function() {
                            $mdDialog.hide();
                        };
                        $scope.numberChips=[];
                        $scope.cancel = function() {
                            $mdDialog.hide();
                            $mdDialog.show({
                                controller: DialogController2,
                                templateUrl: 'templates/basicdata/menu/menudefine-dialog2.html',
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
                        };
                        $scope.answer = function(ev) {
                            $mdDialog.hide();
                            $mdDialog.show({
                                controller: DialogController2,
                                templateUrl: 'templates/basicdata/menu/menudefine-dialog2.html',
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

                        };
                    }
                }
            }
        };

        $scope.delete = function(item){
            var getconfig = {
                method: 'DELETE',
                url: APP_CONFIG.CDP_URL+'/docker/menu/'+item.id,
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
                        ztreeFactory.load($scope);
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('删除成功！')
                                .position('top right')
                                .hideDelay(1500)
                        );
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

        $scope.addresource = function(ev,item1) {
            var goodsdata='';
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.CDP_URL+'/docker/menurests/r/'+item1.id,
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
                        var a1=data.data.menurests;
                        var a2={
                            id:'',
                            name:'',
                            url:'',
                            note:''
                        };
                        for(var i=0;i<data.data.menurests.length;i++){
                            a1[i].id=a1[i].rest_id;
                            a1[i].name=a1[i].rest_name;
                        }
                        goodsdata = a1;

                        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                        $mdDialog.show({
                            controller: DialogController4,
                            templateUrl: 'templates/basicdata/menu/menudefine-dialog4.html',
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
                        function DialogController4($scope, $mdDialog) {
                            $scope.hide = function() {
                                $mdDialog.hide();
                            };
                            $scope.numberChips=[];
                            $scope.cancel = function() {
                                $mdDialog.cancel();
                            };
                            $scope.rarea = {
                                area_type_name:'',
                                org_name:'',
                                org_id:'1',
                                emssmareatypels:[]
                            };
                            $scope.answer = function() {
                                if($scope.selected == olddata){
                                    $mdDialog.hide('');
                                }else{
                                    var t1=[];
                                    for(var i=0;i<$scope.selected.length;i++){
                                        t1.push($scope.selected[i].id)
                                    }

                                    var getconfig = {
                                        method: 'POST',
                                        url: APP_CONFIG.CDP_URL+'/docker/menurests/u',
                                        headers: {
                                            'x-auth-token': $cookies.get("JSESSION")
                                        },
                                        data:{
                                            menu_id:item1.id,
                                            rests:t1
                                        }
                                    };
                                    $http(getconfig)
                                        .success(function(data, status, headers, config) {
                                            $scope.content=headers('x-auth-token');
                                            if($scope.content!=''&&$scope.content!=null){
                                                $cookies.put('JSESSION', $scope.content);
                                            }
                                            if(data.code=='0000'){
                                                //ztreeFactory.load($scope);
                                                showrest(item1.id);
                                                $mdDialog.hide('修改成功！');
                                            }else if(data.code=='1110'){
                                                $mdDialog.hide('');
                                            }else{
                                                alert(data.msg)
                                            }

                                        })
                                        .error(function(data, status, headers, config) {
                                            //alert(status)
                                        });
                                }

                            };

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

                            $scope.query = {
                                order: 'name',
                                limit: 5,
                                page: 1,
                                total:''
                            };
                            $scope.selected = goodsdata;

                            //$scope.pagesize = '5';
                            //$scope.pageindex = '1';
                            $scope.search = {
                                note:'',
                                status:'Y',
                                name:''
                            };

                            //搜索
                            $scope.search_menudefine1 = function(item){
                                getapp1('1',$scope.pagesize);
                            };

                            getapp1();
                            function getapp1(page,size){
                                var getconfig = {
                                    method: 'POST',
                                    url: APP_CONFIG.CDP_URL+'/docker/rest/r/page/like',
                                    headers: {
                                        'x-auth-token': $cookies.get("JSESSION")
                                    },
                                    data:{
                                        pageNumber:parseInt($scope.query.page),
                                        pageSize:parseInt($scope.query.limit),
                                        name:$scope.search.name == ''? undefined:$scope.search.name,
                                        note:$scope.search.note == ''? undefined:$scope.search.note,
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

                                            $scope.appdata = data.data.rests;
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

                            //批量失效(查询时候要重置)
                            var selectdata='';
                            $scope.toggle = function (item, list) {
                                var ids=[];
                                angular.forEach(list, function (value) {
                                    this.push(value.id);
                                },ids);
                                var idx = ids.indexOf(item.id);
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
                                    this.push(value.id);
                                },ids);
                                if(ids.indexOf(item.id) > -1){
                                    item.check1=true;
                                }else{
                                    item.check1=false
                                }
                            };

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
        };

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: false,
            decapitate: false,
            largeEditDialog: false
        };
        $scope.selected = [];
        $scope.getDesserts = function() {
            //getapp1();
            $scope.promise = $timeout(function () {

            }, 1000);
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        var olddata=[];
        function showrest(id){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.CDP_URL+'/docker/menurests/r/'+id,
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
                        var goodsdata = data.data.menurests;
                        olddata = data.data.menurests;
                        //$scope.tableParams = new NgTableParams({count: 20}, { dataset: goodsdata});
                        $scope.appdata = data.data.menurests;
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
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('menudefine');
    return test;
});