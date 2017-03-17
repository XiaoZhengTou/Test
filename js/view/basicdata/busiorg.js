/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('busiorg', []);
    test.controller('busiorgCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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
                status:'ALL',
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
            status:'ALL',
            busi_org_code:'',
            busi_org_name:''
        };

        //搜索
        $scope.search_busiorg = function(){
            getapp1('1',$scope.pagesize);
        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/'+urltype,
                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/queryMain',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    busi_org_name:$scope.search.busi_org_name == ''? undefined:$scope.search.busi_org_name,
                    busi_org_code:$scope.search.busi_org_code == ''? undefined:$scope.search.busi_org_code,
                    busi_org_desc:$scope.search.busi_org_desc == ''? undefined:$scope.search.busi_org_desc,
                    enable_flag:$scope.search.status == 'ALL'? undefined:$scope.search.status
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
                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/yz',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    busi_org_id:item.busi_org_id,
                    enable_flag:sta,
                    busi_org_code:item.busi_org_code,
                    busi_org_name:item.busi_org_name,
                    busi_org_desc:item.busi_org_desc,
                    attribute1:item.attribute1,
                    attribute2:item.attribute2,
                    org_attribute:item.org_attribute
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
        $scope.add = function(ev) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/busiorg-dialog1.html',
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

                    for(var i=0;i<$scope.attribute.length;i++){
                        if($scope.attribute[i].itemValue == $scope.busiorg.attribute1){
                            $scope.busiorg.attribute2 = $scope.attribute[i].itemName
                        }
                    }

                    var getconfig = {
                        method: 'POST',
                        //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/yz',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/yz',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            busi_org_code:$scope.busiorg.busi_org_code,
                            busi_org_name:$scope.busiorg.busi_org_name,
                            busi_org_desc:$scope.busiorg.busi_org_desc,
                            org_attribute:$scope.busiorg.org_attribute,
                            attribute1:$scope.busiorg.attribute1,
                            attribute2:$scope.busiorg.attribute2,
                            //parent_org_id:$scope.busiorg.parent_org_id,
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

                getbusiorga();
                function getbusiorga(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/getItemsByCode?code=BUSIORG_LAYER',
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

                                $scope.attribute = data.data

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

                $scope.busiorg = {
                    busi_org_code:'',
                    busi_org_name:'',
                    busi_org_desc:'',
                    org_attribute:'',
                    attribute1:'',
                    attribute2:'',
                    //parent_org_id:'',
                    enable_flag:'Y'
                };
            }
        };

        //编辑
        $scope.edit = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/busiorg-dialog2.html',
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
                    for(var i=0;i<$scope.attribute.length;i++){
                        if($scope.attribute[i].itemValue == $scope.busiorg.attribute1){
                            $scope.busiorg.attribute2 = $scope.attribute[i].itemName
                        }
                    }

                    var getconfig = {
                        method: 'PUT',
                        //url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/yz',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/yz',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            busi_org_id:$scope.busiorg.busi_org_id,
                            busi_org_code:$scope.busiorg.busi_org_code,
                            busi_org_name:$scope.busiorg.busi_org_name,
                            busi_org_desc:$scope.busiorg.busi_org_desc,
                            org_attribute:$scope.busiorg.org_attribute,
                            attribute1:$scope.busiorg.attribute1,
                            attribute2:$scope.busiorg.attribute2,
                            //parent_org_id:$scope.busiorg.parent_org_id,
                            "enable_flag": $scope.busiorg.enable_flag
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
                        url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/'+$scope.busiorg.busi_org_id,
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

                getbusiorga();
                function getbusiorga(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/getItemsByCode?code=BUSIORG_LAYER',
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

                                $scope.attribute = data.data

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

                $scope.busiorg = {
                    busi_org_id:item.busi_org_id,
                    busi_org_code:item.busi_org_code,
                    busi_org_name:item.busi_org_name,
                    busi_org_desc:item.busi_org_desc,
                    org_attribute:item.org_attribute,
                    attribute1:item.attribute1,
                    attribute2:item.attribute2,
                    //parent_org_id:item.parent_org_id,
                    enable_flag:item.enable_flag
                };
            }
        };

        //详情
        //$scope.detail = function(ev,item) {
        //    var pageindex = $scope.pageindex;
        //    var pagesize = $scope.pagesize;
        //    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        //    $mdDialog.show({
        //        controller: DialogController3,
        //        templateUrl: 'templates/basicdata/busiorg-dialog3.html',
        //        parent: angular.element(document.body),
        //        targetEvent: ev,
        //        clickOutsideToClose:false,
        //        fullscreen: useFullScreen
        //    })
        //        .then(function(item) {
        //            if(item !='' && item != undefined){
        //                $mdToast.show(
        //                    $mdToast.simple()
        //                        .textContent(item)
        //                        .position('top right')
        //                        .hideDelay(1500)
        //                );
        //            }
        //        });
        //    $scope.$watch(function() {
        //        return $mdMedia('xs') || $mdMedia('sm');
        //    }, function(wantsFullScreen) {
        //        $scope.customFullscreen = (wantsFullScreen === true);
        //    });
        //    function DialogController3($scope, $mdDialog) {
        //        $scope.hide = function() {
        //            getapp1(pageindex,pagesize);
        //            $mdDialog.hide();
        //        };
        //        $scope.numberChips=[];
        //        $scope.cancel = function() {
        //            getapp1(pageindex,pagesize);
        //            $mdDialog.cancel();
        //        };
        //
        //        getbusiorg();
        //
        //        $scope.editstatus1 = function(item1,status){
        //            var sta='';
        //            if(status == 'N'){
        //                sta='Y'
        //            }else if(status == 'Y'){
        //                sta='N'
        //            }
        //            var getconfig = {
        //                method: 'PUT',
        //                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg',
        //                headers: {
        //                    'x-auth-token': $cookies.get("JSESSION")
        //                },
        //                data:{
        //                    busi_org_id:item1.busi_org_id,
        //                    enable_flag:sta
        //                }
        //            };
        //            $http(getconfig)
        //                .success(function(data, status, headers, config) {
        //                    $scope.content=headers('x-auth-token');
        //                    if($scope.content!=''&&$scope.content!=null){
        //                        $cookies.put('JSESSION', $scope.content);
        //                    }
        //                    if(data.code=='0000'){
        //                        getbusiorg()
        //                    }else if(data.code=='6666'){
        //
        //                    }else{
        //                        alert(data.msg)
        //                    }
        //
        //                })
        //                .error(function(data, status, headers, config) {
        //                    //alert(status)
        //                });
        //        };
        //
        //        function getbusiorg(){
        //            var getconfig = {
        //                method: 'GET',
        //                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/'+item.busi_org_id,
        //                headers: {
        //                    'x-auth-token': $cookies.get("JSESSION")
        //                }
        //            };
        //            $http(getconfig)
        //                .success(function(data, status, headers, config) {
        //                    $scope.content=headers('x-auth-token');
        //                    if($scope.content!=''&&$scope.content!=null){
        //                        $cookies.put('JSESSION', $scope.content);
        //                    }
        //                    if(data.code=='0000'){
        //                        var goodsdata1 = [];
        //                        goodsdata1.push(data.data);
        //                        $scope.tableParams = new NgTableParams({}, { dataset: goodsdata1});
        //                    }else if(data.code=='6666'){
        //
        //                    }else{
        //                        alert(data.msg)
        //                    }
        //
        //                })
        //                .error(function(data, status, headers, config) {
        //                    //alert(status)
        //                });
        //        }
        //    }
        //};

        $scope.detail = function(ev,item) {
            $location.path("/busiorgdetail").search('busiorgdetailname',item)
        };

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('busiorg');
    return test;
});