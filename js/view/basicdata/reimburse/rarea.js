/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('rarea', []);
    test.controller('rareaCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q, $log,$mdToast,$parse){

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
                area_type_name:'',
                org_name:'',
                enable_flag:'ALL',
                area_name:''
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        //$scope.pagesize = '10';
        //$scope.pageindex = '1';
        $scope.search = {
            area_type_name:'',
            org_name:'',
            enable_flag:'ALL',
            area_name:''
        };

        //搜索
        $scope.search_rarea = function(){
            getapp1('1',$scope.pagesize);
        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmAreaTypeH/pageLikeAsH',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    pageNumber:parseInt($scope.query.page),
                    pageSize:parseInt($scope.query.limit),
                    "query_param": {
                        area_type_name:$scope.search.area_type_name == ''? undefined:$scope.search.area_type_name,
                        org_name:$scope.search.org_name == ''? undefined:$scope.search.org_name,
                        enable_flag:$scope.search.enable_flag == 'ALL'? undefined:$scope.search.enable_flag,
                        area_name:$scope.search.area_name == ''? undefined:$scope.search.area_name
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

                        $scope.appdata = data.data.datalist;
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

        //区域隐藏
        //$scope.area_opens = false;
        //$scope.area_opens1 = true;
        $scope.area_num=function(i){
            if (i>0){
                return false
            }else{
                return true
            }
        };
        $scope.area_open=function(i,j){
            i = true;
            j = true;
        };

        $scope.editstatus = function(item,status){
            var sta='';
            if(status == 'N'){
                sta='Y'
            }else if(status == 'Y'){
                sta='N'
            }
            var getconfig = {
                method: 'PUT',
                url: APP_CONFIG.JIEBAO_URL+'/docker/area',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    region_type_code:item.region_type_code,
                    pin_yin:item.pin_yin,
                    area_desc:item.area_desc,
                    area_id:item.area_id,
                    parent_area_id:item.parent_area_id,
                    area_code:item.area_code,
                    area_name:item.area_name,
                    parent_area_name:item.parent_area_name,
                    hot_city_flag:item.hot_city_flag,
                    is_travel_city:item.is_travel_city,
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

        $scope.add = function(ev) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var selectitem = {
                area_type_name:'',
                org_name:'',
                org_id:'',
                emssmareatypels:[]
            };
            var selectitem1={
                area_type_name:'',
                org_name:'',
                org_id:'',
                emssmareatypels:[]
            };
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/reimburse/rarea-dialog1.html',
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
                    //var area1={
                    //    "_state":"added",
                    //    "area_id":"",
                    //    "area_code":"",
                    //    "area_name":""
                    //};
                    //var area2=[];
                    //for(var i=0;i<$scope.rarea.emssmareatypels.length;i++){
                    //    //area1._state=$scope.rarea.emssmareatypels[i]._state;
                    //    area1.area_id=$scope.rarea.emssmareatypels[i].area_id;
                    //    area1.area_code=$scope.rarea.emssmareatypels[i].area_code;
                    //    area1.area_name=$scope.rarea.emssmareatypels[i].area_name;
                    //    area2.push(area1);
                    //}

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmAreaTypeH/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "emssmareatypeh": {
                                area_type_name:$scope.rarea.area_type_name,
                                org_name:$scope.rarea.org_name,
                                org_id:$scope.rarea.org_id,
                                emssmareatypels:$scope.rarea.emssmareatypels
                            }
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

                if(selectitem1.area_type_name !='' || selectitem1.org_name !='' || selectitem1.org_id !='' || selectitem1.emssmareatypels !=[]){
                    $scope.rarea = {
                        area_type_name:selectitem1.area_type_name,
                        org_name:selectitem1.org_name,
                        org_id:selectitem1.org_id,
                        emssmareatypels:selectitem1.emssmareatypels
                    };
                }else{
                    $scope.rarea = {
                        area_type_name:'',
                        org_name:'',
                        org_id:'',
                        emssmareatypels:[]
                    };
                }

                $scope.addarea = function(ev,item1) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                    selectitem=item1;
                    var olditem= [];
                    $mdDialog.show({
                        controller: DialogController3,
                        templateUrl: 'templates/basicdata/reimburse/rarea-dialog3.html',
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
                        $scope.rarea = {
                            area_type_name:'',
                            org_name:'',
                            org_id:'1',
                            emssmareatypels:[]
                        };
                        $scope.answer = function(ev) {
                            for(var i=0;i<$scope.selected.length;i++){
                                selectitem.emssmareatypels[i].area_id=$scope.selected[i].area_id;
                                selectitem.emssmareatypels[i].area_code=$scope.selected[i].area_code;
                                selectitem.emssmareatypels[i].area_name=$scope.selected[i].area_name;
                                selectitem.emssmareatypels[i]._state="added";
                            }
                            if(olditem.length >0){
                                for(var j=0;j<olditem.length;j++){
                                    var ids=[];
                                    angular.forEach($scope.selected, function (value) {
                                        this.push(value.area_id);
                                    },ids);
                                    var idx = ids.indexOf(olditem[j].area_id);
                                    if (idx > -1) {
                                        //selectitem.emssmareatypels.splice(idx, 1);
                                        selectitem.emssmareatypels[j]._state='old';
                                    }
                                    else {
                                        olditem[j]._state='deleted';
                                        selectitem.emssmareatypels.splice(j, 0, olditem[j]);
                                    }
                                }
                            }
                            selectitem1=selectitem;

                            $mdDialog.hide();

                            $mdDialog.show({
                                controller: DialogController1,
                                templateUrl: 'templates/basicdata/reimburse/rarea-dialog1.html',
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
                        };
                        $scope.selected = selectitem.emssmareatypels;

                        $scope.pagesize = '5';
                        $scope.pageindex = '1';
                        $scope.search = {
                            area_name:'',
                            pin_yin:'',
                            hot_city_flag:'',
                            status:'Y',
                            parent_area_name:'',
                            full_path:'',
                            region_type_code:'0'
                        };
                        $scope.activeItem = '1';

                        //搜索
                        $scope.search_rarea1 = function(item){
                            if(item != undefined && item!=null){
                                $scope.search.region_type_code = item
                            }
                            if($scope.pagesize != undefined){
                                $scope.pageindex = '1';
                                getapp1('1',$scope.pagesize);
                            }
                        };

                        //getapp1();
                        function getapp1(page,size){
                            var getconfig = {
                                method: 'POST',
                                url: APP_CONFIG.JIEBAO_URL+'/docker/area/page',
                                headers: {
                                    'x-auth-token': $cookies.get("JSESSION")
                                },
                                data:{
                                    page_number:parseInt(page),
                                    page_size:parseInt(size),
                                    area_name:$scope.search.area_name == ''? undefined:$scope.search.area_name,
                                    pin_yin:$scope.search.pin_yin == ''? undefined:$scope.search.pin_yin,
                                    hot_city_flag:$scope.search.hot_city_flag == ''? undefined:$scope.search.hot_city_flag,
                                    active_flag:$scope.search.status == 'ALL'? undefined:$scope.search.status,
                                    parent_area_name:$scope.search.parent_area_name == ''? undefined:$scope.search.parent_area_name,
                                    full_path:$scope.search.full_path == ''? undefined:$scope.search.full_path,
                                    region_type_code:$scope.search.region_type_code == '0'?0:$scope.search.region_type_code
                                }
                            };
                            $http(getconfig)
                                .success(function(data, status, headers, config) {
                                    $scope.content=headers('x-auth-token');
                                    if($scope.content!=''&& $scope.content!=null){
                                        $cookies.put('JSESSION', $scope.content);
                                    }
                                    if(data.code=='0000'){
                                        var goodsdata = data.data.info;
                                        $scope.tableParams = new NgTableParams({count: 20}, { dataset: goodsdata});

                                        selectdata=goodsdata;

                                        var totalpage=data.data.totalPage;
                                        if(data.data.pageNumber == 1){
                                            $scope.lastpaged = true;
                                        }else{
                                            $scope.lastpaged = false
                                        }
                                        if(data.data.pageNumber == data.data.totalPage){
                                            $scope.nextpaged = true;
                                        }else{
                                            $scope.nextpaged = false
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
                                getapp1($scope.pageindex,$scope.pagesize);
                            }
                        });

                        var watch1 = $scope.$watch('pagesize',function(newValue,oldValue, scope){
                            if($scope.pagesize != undefined){
                                $scope.pageindex = '1';
                                getapp1($scope.pageindex,$scope.pagesize);
                            }
                        });

                        $scope.lastpage = function(){
                            getapp1(parseInt($scope.pageindex)-1,$scope.pagesize);
                            $scope.pageindex = (parseInt($scope.pageindex)-1).toString();
                        };

                        $scope.nextpage = function(){
                            getapp1(parseInt($scope.pageindex)+1,$scope.pagesize);
                            $scope.pageindex = (parseInt($scope.pageindex)+1).toString();
                        };

                        //批量失效(查询时候要重置)
                        var selectdata='';
                        $scope.toggle = function (item, list) {
                            var ids=[];
                            angular.forEach(list, function (value) {
                                this.push(value.area_id);
                            },ids);
                            var idx = ids.indexOf(item.area_id);
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
                                this.push(value.area_id);
                            },ids);
                            if(ids.indexOf(item.area_id) > -1){
                                item.check1=true;
                            }else{
                                item.check1=false
                            }
                        };

                    }

                };

                $scope.addarea1 = function(ev,item1) {
                    var modeldata = $scope.$eval("{'model':'rarea'}");
                    console.log(modeldata.model);
                    $mdDialog.show({
                        controller: DialogController4,
                        templateUrl: 'templates/shared/organization3.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: true
                    }).then(function(answer) {
                        //截取传过来的ng-model
                        //$parse(modeldata.model).assign(scope, answer);
                        if (answer) {
                            selectitem1=item1;
                            selectitem1.org_name = answer.org_name;
                            selectitem1.org_id = answer.id
                        }
                        $mdDialog.show({
                            controller: DialogController1,
                            templateUrl: 'templates/basicdata/reimburse/rarea-dialog1.html',
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
                    }, function() {

                    });

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

                };
            }
        };

        var olditem= '';
        $scope.edit = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var selectitem = {
                area_type_id:item.area_type_id,
                area_type_name:item.area_type_name,
                org_name:item.org_name,
                org_id:item.org_id,
                emssmareatypels:item.emssmareatypels
            };
            var selectitem1={
                area_type_id:'',
                area_type_name:'',
                org_name:'',
                org_id:'',
                emssmareatypels:[]
            };
            aaa(item.area_type_id);

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/reimburse/rarea-dialog2.html',
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
                $scope.answer = function(answer) {
                    var area2=[];
                    var num=$scope.rarea.emssmareatypels.length;
                    for(var i=0;i<num;i++){
                        if($scope.rarea.emssmareatypels[i]._state == 'old'){
                            area2.push(i);
                        }
                    }
                    for(var j=0;j<area2.length;j++){
                        $scope.rarea.emssmareatypels.splice(area2[j], 1);
                        for(var h=0;h<area2.length;h++){
                            area2[h]=area2[h]-1
                        }
                    }
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmAreaTypeH/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "emssmareatypeh": {
                                area_type_id:$scope.rarea.area_type_id,
                                area_type_name:$scope.rarea.area_type_name,
                                org_name:$scope.rarea.org_name,
                                org_id:$scope.rarea.org_id,
                                "enable_flag":"Y",
                                emssmareatypels:$scope.rarea.emssmareatypels
                            }
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
                                $mdDialog.hide('修改成功！');
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

                if(selectitem1.area_type_id !='' || selectitem1.area_type_name !='' || selectitem1.org_name !='' || selectitem1.org_id !='' ){
                    $scope.rarea = {
                        area_type_id:selectitem1.area_type_id,
                        area_type_name:selectitem1.area_type_name,
                        org_name:selectitem1.org_name,
                        org_id:selectitem1.org_id,
                        emssmareatypels:selectitem1.emssmareatypels
                    };
                }else{
                    $scope.rarea = {
                        area_type_id:selectitem.area_type_id,
                        area_type_name:selectitem.area_type_name,
                        org_name:selectitem.org_name,
                        org_id:selectitem.org_id,
                        emssmareatypels:selectitem.emssmareatypels
                    };
                    for(var i=0;i<$scope.rarea.emssmareatypels.length;i++){
                        $scope.rarea.emssmareatypels[i]._state = 'old'
                    }
                }
                //olditem=$scope.olditem1;
                $scope.addarea = function(ev,item1) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
                    selectitem=item1;
                    $mdDialog.show({
                        controller: DialogController4,
                        templateUrl: 'templates/basicdata/reimburse/rarea-dialog3.html',
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
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };

                        $scope.answer = function(ev) {
                            for(var i=0;i<$scope.selected.length;i++){
                                selectitem.emssmareatypels[i].area_id=$scope.selected[i].area_id;
                                selectitem.emssmareatypels[i].area_code=$scope.selected[i].area_code;
                                selectitem.emssmareatypels[i].area_name=$scope.selected[i].area_name;
                                selectitem.emssmareatypels[i]._state="added";
                            }
                            if(olditem.length >0){
                                for(var j=0;j<olditem.length;j++){
                                    var ids=[];
                                    angular.forEach($scope.selected, function (value) {
                                        this.push(value.area_id);
                                    },ids);
                                    var idx = ids.indexOf(olditem[j].area_id);
                                    if (idx > -1) {
                                        //selectitem.emssmareatypels.splice(idx, 1);
                                        selectitem.emssmareatypels[j]._state='old';
                                    }
                                    else {
                                        olditem[j]._state='deleted';
                                        selectitem.emssmareatypels.splice(j, 0, olditem[j]);
                                    }
                                }
                            }
                            selectitem1=selectitem;
                            $mdDialog.hide();

                            $mdDialog.show({
                                controller: DialogController2,
                                templateUrl: 'templates/basicdata/reimburse/rarea-dialog2.html',
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
                        };
                        $scope.selected = selectitem.emssmareatypels;

                        $scope.pagesize = '5';
                        $scope.pageindex = '1';
                        $scope.search = {
                            area_name:'',
                            pin_yin:'',
                            hot_city_flag:'',
                            status:'Y',
                            parent_area_name:'',
                            full_path:'',
                            region_type_code:'0'
                        };
                        $scope.activeItem = '1';

                        //搜索
                        $scope.search_rarea1 = function(item){
                            if(item != undefined && item!=null){
                                $scope.search.region_type_code = item
                            }
                            if($scope.pagesize != undefined){
                                $scope.pageindex = '1';
                                getapp1('1',$scope.pagesize);
                            }
                        };

                        function getapp1(page,size){
                            var getconfig = {
                                method: 'POST',
                                url: APP_CONFIG.JIEBAO_URL+'/docker/area/page',
                                headers: {
                                    'x-auth-token': $cookies.get("JSESSION")
                                },
                                data:{
                                    page_number:parseInt(page),
                                    page_size:parseInt(size),
                                    area_name:$scope.search.area_name == ''? undefined:$scope.search.area_name,
                                    pin_yin:$scope.search.pin_yin == ''? undefined:$scope.search.pin_yin,
                                    hot_city_flag:$scope.search.hot_city_flag == ''? undefined:$scope.search.hot_city_flag,
                                    active_flag:$scope.search.status == 'ALL'? undefined:$scope.search.status,
                                    parent_area_name:$scope.search.parent_area_name == ''? undefined:$scope.search.parent_area_name,
                                    full_path:$scope.search.full_path == ''? undefined:$scope.search.full_path,
                                    region_type_code:$scope.search.region_type_code == '0'?0:$scope.search.region_type_code
                                }
                            };
                            $http(getconfig)
                                .success(function(data, status, headers, config) {
                                    $scope.content=headers('x-auth-token');
                                    if($scope.content!=''&& $scope.content!=null){
                                        $cookies.put('JSESSION', $scope.content);
                                    }
                                    if(data.code=='0000'){
                                        var goodsdata = data.data.info;
                                        $scope.tableParams = new NgTableParams({count: 20}, { dataset: goodsdata});

                                        selectdata=goodsdata;

                                        var totalpage=data.data.totalPage;
                                        if(data.data.pageNumber == 1){
                                            $scope.lastpaged = true;
                                        }else{
                                            $scope.lastpaged = false
                                        }
                                        if(data.data.pageNumber == data.data.totalPage){
                                            $scope.nextpaged = true;
                                        }else{
                                            $scope.nextpaged = false
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
                                getapp1($scope.pageindex,$scope.pagesize);
                            }
                        });

                        var watch1 = $scope.$watch('pagesize',function(newValue,oldValue, scope){
                            if($scope.pagesize != undefined){
                                $scope.pageindex = '1';
                                getapp1($scope.pageindex,$scope.pagesize);
                            }
                        });

                        $scope.lastpage = function(){
                            getapp1(parseInt($scope.pageindex)-1,$scope.pagesize);
                            $scope.pageindex = (parseInt($scope.pageindex)-1).toString();
                        };

                        $scope.nextpage = function(){
                            getapp1(parseInt($scope.pageindex)+1,$scope.pagesize);
                            $scope.pageindex = (parseInt($scope.pageindex)+1).toString();
                        };

                        //批量失效(查询时候要重置)
                        var selectdata='';
                        $scope.toggle = function (item, list) {
                            var ids=[];
                            angular.forEach(list, function (value) {
                                this.push(value.area_id);
                            },ids);
                            var idx = ids.indexOf(item.area_id);
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
                                this.push(value.area_id);
                            },ids);
                            if(ids.indexOf(item.area_id) > -1){
                                item.check1=true;
                            }else{
                                item.check1=false
                            }
                        };

                    }

                };

                $scope.addarea2 = function(ev,item1) {
                    var modeldata = $scope.$eval("{'model':'rarea'}");
                    console.log(modeldata.model);
                    $mdDialog.show({
                        controller: DialogController4,
                        templateUrl: 'templates/shared/organization3.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: true
                    }).then(function(answer) {
                        //截取传过来的ng-model
                        //$parse(modeldata.model).assign(scope, answer);
                        if (answer) {
                            selectitem1=item1;
                            selectitem1.org_name = answer.org_name;
                            selectitem1.org_id = answer.id
                        }
                        $mdDialog.show({
                            controller: DialogController2,
                            templateUrl: 'templates/basicdata/reimburse/rarea-dialog2.html',
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
                    }, function() {

                    });

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

                };
            }
        };

        function aaa(i){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmAreaTypeH/get/'+i,
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
                        olditem=data.data.emssmareatypeh.emssmareatypels
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
        $scope.selected1 = [];
        $scope.batch_failure = function(){
            console.log("parent", $scope.selected1);
            var barea1={
                "area_type_id":"",
                "enable_flag":"N"
            };
            var barea2=[];
            for(var i=0;i<$scope.selected1.length;i++){
                barea2.push({
                    "area_type_id":"",
                    "enable_flag":"N"
                });
                barea2[i].area_type_id=$scope.selected1[i];
            }
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmAreaTypeH/batchDisabled',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "emssmareatypehs": barea2
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
                        $scope.selected1 = [];
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

    test.controller('rareaCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('rarea');
    return test;
});