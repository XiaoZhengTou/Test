/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    publicFunction.removeStyle('archive.css');
    var test = angular.module('rperson', []);
    test.controller('rpersonCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q, $log,$mdToast,ztreeFactory){

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
                emp_type_name:'',
                org_name:'',
                enable_flag:'ALL'
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
            emp_type_name:'',
            org_name:'',
            enable_flag:'ALL'
        };

        //搜索
        $scope.search_rperson =  aaa;
        function aaa(){
            getapp1('1',$scope.pagesize);
        }

        getapp1();
        function getapp1(page,size,i){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/pageLikeAsH',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    pageNumber:parseInt($scope.query.page),
                    pageSize:parseInt($scope.query.limit),
                    "query_param": {
                        emp_type_name:$scope.search.emp_type_name == ''? undefined:$scope.search.emp_type_name,
                        org_name:$scope.search.org_name == ''? undefined:$scope.search.org_name,
                        enable_flag:$scope.search.enable_flag == 'ALL'? undefined:$scope.search.enable_flag
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

                        var goodsdata = data.data.datalist;
                        //$scope.tableParams123 = new NgTableParams({count: 20}, { dataset: goodsdata});

                        //$scope.search_rperson();
                        selectdata=goodsdata;
                        $scope.selected1 = [];
                        $scope.draftSelectcheck = false;
                        $scope.addtablealldelete = false;
                        $scope.$broadcast("draftSelectcheckChange1", $scope.draftSelectcheck);

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

        $scope.add = add1;
        function add1(ev,selectitem1) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/reimburse/rperson-dialog1.html',
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
                    getapp1(pageindex, pagesize);
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                    getapp1(pageindex, pagesize);
                };
                $scope.answer = function(answer) {

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "emssmemptypeh": {
                                emp_type_name:$scope.rperson.emp_type_name,
                                org_name:$scope.rperson.org_name,
                                org_id:'1',
                                emp_type_category:$scope.rperson.emp_type_category,
                                emssmemptypels:$scope.rperson.emssmemptypels
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

                var watch1 = $scope.$watch('rperson.emp_type_category',function(newValue,oldValue, scope){
                    if($scope.rperson.emp_type_category != ''&& oldValue != undefined  && oldValue != newValue){
                        $scope.rperson.emssmemptypels=[];
                    }
                });

                if(selectitem1 != undefined){
                    $scope.rperson = {
                        emp_type_name:selectitem1.emp_type_name,
                        org_name:selectitem1.org_name,
                        org_id:selectitem1.org_id,
                        emp_type_category:selectitem1.emp_type_category,
                        emssmemptypels:selectitem1.emssmemptypels
                    };
                }else{
                    $scope.rperson = {
                        emp_type_name:'',
                        org_name:'',
                        org_id:'',
                        emp_type_category:'',
                        emssmemptypels:[]
                    };
                }

                $scope.changetype = function(){
                    $scope.rperson.emssmemptypels=[];
                };

                $scope.addarea = addlevel;

                $scope.addarea1111 = function(ev,item1,type) {
                    //var modeldata = $scope.$eval("{'model':'rperson'}");
                    var selectitem=item1;
                    //console.log(modeldata.model);
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
                            selectitem.org_name = answer.org_name;
                            selectitem.org_id = answer.id
                        }
                        if(type == 'add'){
                            add1(ev,selectitem)
                        }else if(type == 'edit'){
                            edit1(ev,'',selectitem)
                        }
                    }, function() {

                    });
                    $scope.$watch(function() {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function(wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });
                };
            }
        };

        $scope.addarea = addlevel;
        function addlevel(ev,item1,type,num) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            var selectitem=item1;
            var olditem=[];
            if(num=='1' || num=='2'){
                if(type == 'add'){
                    olditem= [];
                }
                else if(type == 'edit'){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/get/'+item1.emp_type_id,
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
                                olditem = data.data.emssmemptypeh.emssmemptypels;
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
                $mdDialog.show({
                    controller: DialogController3,
                    templateUrl: 'templates/basicdata/reimburse/rperson-dialog3.html',
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
                        for(var i=0;i<$scope.selected.length;i++){
                            selectitem.emssmemptypels[i].level_id=$scope.selected[i].level_id;
                            selectitem.emssmemptypels[i].level_name=$scope.selected[i].level_name;
                            selectitem.emssmemptypels[i]._state="added";
                        }
                        if(olditem.length >0){
                            for(var j=0;j<olditem.length;j++){
                                var ids=[];
                                angular.forEach($scope.selected, function (value) {
                                    this.push(value.level_id);
                                },ids);
                                var idx = ids.indexOf(olditem[j].level_id);
                                if (idx > -1) {
                                    //selectitem.emssmemptypels.splice(idx, 1);
                                    selectitem.emssmemptypels[j]._state='old';
                                }
                                else {
                                    olditem[j]._state='deleted';
                                    selectitem.emssmemptypels.splice(j, 0, olditem[j]);
                                }
                            }
                        }
                        $mdDialog.hide();
                        if(type == 'add'){
                            add1(ev,selectitem)
                        }else if(type == 'edit'){
                            edit1(ev,'',selectitem)
                        }
                    };

                    $scope.selected = selectitem.emssmemptypels;
                    $scope.pagesize1 = '5';
                    $scope.pageindex1 = '1';
                    $scope.search = {
                        area_name:'',
                        pin_yin:'',
                        hot_city_flag:'',
                        status:'Y',
                        parent_area_name:'',
                        full_path:'',
                        region_type_code:'0'
                    };

                    //搜索
                    $scope.search_rperson1 = function(item){
                        if(item != undefined && item!=null){
                            $scope.search.region_type_code = item
                        }
                        if($scope.pagesize != undefined){
                            $scope.pageindex = '1';
                            getapp11('1',$scope.pagesize);
                        }
                    };

                    //getapp11();
                    function getapp11(page,size){
                        var goodsdata = [];
                        if(selectitem.emp_type_category == '1'){
                            goodsdata=[{
                                level_id:'11',
                                level_name:'P1'
                            },{
                                level_id:'22',
                                level_name:'P2'
                            },{
                                level_id:'33',
                                level_name:'P3'
                            }]
                            $scope.tableParams11 = new NgTableParams({count: 20}, { dataset: goodsdata});
                        }
                        else if(selectitem.emp_type_category == '2'){
                            goodsdata=[{
                                level_id:'11',
                                level_name:'开发人员'
                            },{
                                level_id:'22',
                                level_name:'需求人员'
                            },{
                                level_id:'33',
                                level_name:'测试人员'
                            }]
                            var getconfig = {
                                method: 'POST',
                                url: APP_CONFIG.CDP_URL+'/docker/tenantposition/pageQuery',
                                headers: {
                                    'x-auth-token': $cookies.get("JSESSION")
                                },
                                data:{
                                    pageNumber:parseInt(page),
                                    pageSize:parseInt(size),
                                    status:'A'
                                }
                            };
                            $http(getconfig)
                                .success(function(data, status, headers, config) {
                                    $scope.content=headers('x-auth-token');
                                    if($scope.content!=''&&$scope.content!=null){
                                        $cookies.put('JSESSION', $scope.content);
                                    }
                                    if(data.code=='0000'){
                                        //$scope.workflow_modle = data.data.list;

                                        var goodsdata = data.data.list;
                                        for(var i=0;i<goodsdata.length;i++){
                                            goodsdata[i].level_id=goodsdata[i].id;
                                            goodsdata[i].level_name=goodsdata[i].position_name;
                                        }
                                        $scope.tableParams11 = new NgTableParams({count: 20}, { dataset: goodsdata});
                                        //$scope.search_rperson();

                                        var totalpage=data.data.totalPage;
                                        if(page == '1'){
                                            $scope.lastpaged1 = true;
                                            if(page == totalpage){
                                                $scope.nextpaged1 = true
                                            }else{
                                                $scope.nextpaged1 = false
                                            }
                                        }else{
                                            $scope.lastpaged1 = false;
                                            if(page == totalpage){
                                                $scope.nextpaged1 = true
                                            }
                                        }
                                        $scope.total1 = data.data.totalRow;


                                        $scope.page11= (parseInt(data.data.pageNumber)-1) * parseInt(size) +1;
                                        if(data.data.lastPage){
                                            $scope.page21= parseInt(data.data.totalRow);
                                        }else{
                                            $scope.page21= parseInt(data.data.pageNumber) * parseInt(size);
                                        }

                                        $scope.pages1=[];
                                        for(var i=1;i<=totalpage;i++){
                                            $scope.pages1.push(i);
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

                    }

                    //批量失效(查询时候要重置)
                    var selectdata='';
                    $scope.toggle = function (item, list) {
                        var ids=[];
                        angular.forEach(list, function (value) {
                            this.push(value.level_id);
                        },ids);
                        var idx = ids.indexOf(item.level_id);
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
                            this.push(value.level_id);
                        },ids);
                        if(ids.indexOf(item.level_id) > -1){
                            item.check1=true;
                        }else{
                            item.check1=false
                        }
                    };

                    var watch = $scope.$watch('pageindex1',function(newValue,oldValue, scope){
                        if($scope.pageindex1 != undefined){
                            getapp11($scope.pageindex1,$scope.pagesize1);
                        }
                    });

                    var watch1 = $scope.$watch('pagesize1',function(newValue,oldValue, scope){
                        if($scope.pagesize1 != undefined){
                            $scope.pageindex1 = '1';
                            getapp11($scope.pageindex1,$scope.pagesize1);
                        }
                    });

                    $scope.lastpage1 = function(){
                        getapp11(parseInt($scope.pageindex1)-1,$scope.pagesize1);
                        $scope.pageindex1 = (parseInt($scope.pageindex1)-1).toString();
                    };

                    $scope.nextpage1 = function(){
                        getapp11(parseInt($scope.pageindex1)+1,$scope.pagesize1);
                        $scope.pageindex1 = (parseInt($scope.pageindex1)+1).toString();
                    };

                }
            }
            else if(num=='3'){
                if(type == 'add'){
                    olditem= [];
                }
                else if(type == 'edit'){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/get/'+item1.emp_type_id,
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
                                olditem = data.data.emssmemptypeh.emssmemptypels;
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
                $mdDialog.show({
                    controller: DialogController6,
                    templateUrl: 'templates/basicdata/reimburse/rperson-dialog5.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    cache:false,
                    fullscreen: useFullScreen
                }).then(function(answer) {
                    selectitem.emssmemptypels=[];
                    for(var i=0;i<answer.length;i++){
                        selectitem.emssmemptypels.push({
                            level_id:answer[i].user_id,
                            level_name:answer[i].user_full_name,
                            _state:"added"
                        })
                    }
                    if(olditem.length >0){
                        for(var j=0;j<olditem.length;j++){
                            var ids=[];
                            angular.forEach( selectitem.emssmemptypels, function (value) {
                                this.push(value.level_id);
                            },ids);
                            var idx = ids.indexOf(olditem[j].level_id);
                            if (idx > -1) {
                                //selectitem.emssmemptypels.splice(idx, 1);
                                selectitem.emssmemptypels[j]._state='old';
                            }
                            else {
                                olditem[j]._state='deleted';
                                selectitem.emssmemptypels.splice(j, 0, olditem[j]);
                            }
                        }
                    }
                    if(type == 'add'){
                        add1(ev,selectitem)
                    }else if(type == 'edit'){
                        edit1(ev,'',selectitem)
                    }
                }, function() {

                });
                $scope.$watch(function() {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
                function DialogController6($scope, $mdDialog) {
                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function(answer) {
                        $mdDialog.hide($scope.selected);
                    };

                    if(item1.emssmemptypels.length>0){
                        var treeObj = $.fn.zTree.getZTreeObj("qqq5");
                        var aa=item1.emssmemptypels;
                        $scope.selected = item1.emssmemptypels;
                        for(var i=0;i<aa.length;i++){
                            aa[i].user_id = aa[i].level_id;
                            aa[i].user_full_name = aa[i].level_name;
                            aa[i].status = 'old';
                        }
                        ztreeFactory.pemenu2($scope,aa);
                    }else{
                        $scope.selected = [];
                        ztreeFactory.pemenu2($scope,$scope.selected);
                    }

                    var watch2 = $scope.$watch('selectNode',function(newValue,oldValue, scope){
                        if($scope.selectNode !=undefined){
                            //var treeObj = $.fn.zTree.getZTreeObj("qqq5");
                            //$scope.selected=treeObj.getCheckedNodes(true);
                            getuser($scope.selectNode.id)
                        }
                    },true);

                    function getuser(pid){
                        var url = APP_CONFIG.CDP_URL+'/'+ 'docker/tenantorg/queryOrgUsersByOrgId?org_id=' + pid;
                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
                            },
                        }).success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.code == "0000") {
                                $scope.orgData = data.data.users;
                            } else {
                                alert(data.msg)
                            }
                        }).error(function(data, status, headers, config) {});
                    }

                    //批量失效(查询时候要重置)
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
            }
            else if(num=='4'){
                if(type == 'add'){
                    olditem= [];
                }
                else if(type == 'edit'){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/get/'+item1.emp_type_id,
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
                                olditem = data.data.emssmemptypeh.emssmemptypels;
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
                $mdDialog.show({
                    controller: DialogController5,
                    templateUrl: 'templates/basicdata/reimburse/rperson-dialog4.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    cache:false,
                    fullscreen: useFullScreen
                }).then(function(answer) {
                    selectitem.emssmemptypels=[];
                    for(var i=0;i<answer.length;i++){
                        selectitem.emssmemptypels.push({
                            level_id:answer[i].id,
                            level_name:answer[i].org_name,
                            _state:"added"
                        })
                    }
                    if(olditem.length >0){
                        for(var j=0;j<olditem.length;j++){
                            var ids=[];
                            angular.forEach( selectitem.emssmemptypels, function (value) {
                                this.push(value.level_id);
                            },ids);
                            var idx = ids.indexOf(olditem[j].level_id);
                            if (idx > -1) {
                                //selectitem.emssmemptypels.splice(idx, 1);
                                selectitem.emssmemptypels[j]._state='old';
                            }
                            else {
                                olditem[j]._state='deleted';
                                selectitem.emssmemptypels.splice(j, 0, olditem[j]);
                            }
                        }
                    }
                    if(type == 'add'){
                        add1(ev,selectitem)
                    }else if(type == 'edit'){
                        edit1(ev,'',selectitem)
                    }
                }, function() {

                });
                $scope.$watch(function() {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
                function DialogController5($scope, $mdDialog) {
                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function(answer) {
                        $mdDialog.hide($scope.selected);
                    };

                    if(item1.emssmemptypels.length>0){
                        var treeObj = $.fn.zTree.getZTreeObj("qqq4");
                        var aa=item1.emssmemptypels;
                        $scope.selected = [];
                        for(var i=0;i<aa.length;i++){
                            aa[i].id = aa[i].level_id;
                            aa[i].org_name = aa[i].level_name;
                            aa[i].status = 'old';
                            //var node = treeObj.getNodeByParam("id", $scope.selected[i].id, null);
                            //node.checked = true;
                            //treeObj.checkNode(node, true, true);
                        }
                        ztreeFactory.pemenu1($scope,aa);
                    }else{
                        $scope.selected = [];
                        ztreeFactory.pemenu1($scope,$scope.selected);
                    }

                    var watch2 = $scope.$watch('selectNode',function(newValue,oldValue, scope){
                        if($scope.selectNode !=undefined){
                            var treeObj = $.fn.zTree.getZTreeObj("qqq4");
                            $scope.selected=treeObj.getCheckedNodes(true);
                        }
                    },true);

                    var watch3 = $scope.$watch('selected',function(newValue,oldValue, scope){
                        if($scope.selected !=undefined){
                            if(newValue.length < oldValue.length){
                                var result = [];
                                for(var i = 0; i < oldValue.length; i++){
                                    var obj = oldValue[i];
                                    var num = obj.id;
                                    var isExist = false;
                                    for(var j = 0; j < newValue.length; j++){
                                        var aj = newValue[j];
                                        var n = aj.id;
                                        if(n == num){
                                            isExist = true;
                                            break;
                                        }
                                    }
                                    if(!isExist){
                                        result.push(obj);
                                    }
                                }
                                var treeObj = $.fn.zTree.getZTreeObj("qqq4");
                                for(var h=0;h<result.length;h++){
                                    var node = treeObj.getNodeByTId(result[h].tId);
                                    treeObj.checkNode(node, false, true);

                                    if(node.status == 'old'){
                                        node.status = "deleted";
                                    }else if(node.status == 'added'){
                                        node.status = "";
                                    }
                                    treeObj.updateNode(node);
                                }


                            }else if(oldValue.length < newValue.length){
                                var result = [];
                                for(var i = 0; i < newValue.length; i++){
                                    var obj = newValue[i];
                                    var num = obj.id;
                                    var isExist = false;
                                    for(var j = 0; j < oldValue.length; j++){
                                        var aj = oldValue[j];
                                        var n = aj.id;
                                        if(n == num){
                                            isExist = true;
                                            break;
                                        }
                                    }
                                    if(!isExist){
                                        result.push(obj);
                                    }
                                }
                                var treeObj = $.fn.zTree.getZTreeObj("qqq4");
                                //treeObj.checkNode(node, false, true);

                                for(var h=0;h<result.length;h++){
                                    var node = treeObj.getNodeByTId(result[h].tId);
                                    if(node.status == 'deleted'){
                                        node.status = "old";
                                    }else if(node.status == ''){
                                        node.status = "added";
                                    }
                                    treeObj.updateNode(node);
                                }
                            }
                        }
                    },true);

                }
            }
            else if(num=='5'){

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

        $scope.edit = edit1;
        function edit1(ev,item,selectitem1) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/reimburse/rperson-dialog2.html',
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
                    var area1={
                        "emp_type_l_id": "",
                        "_state":"",
                        "level_id":"",
                        "level_name":""
                    };
                    var area2=[];
                    for(var i=0;i<$scope.rperson.emssmemptypels.length;i++){
                        if($scope.rperson.emssmemptypels[i]._state == 'old'){

                        }else{
                            area2.push($scope.rperson.emssmemptypels[i])
                        }
                    }

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "emssmemptypeh": {
                                emp_type_id:$scope.rperson.emp_type_id,
                                emp_type_name:$scope.rperson.emp_type_name,
                                org_name:$scope.rperson.org_name,
                                org_id:$scope.rperson.org_id,
                                emp_type_category:$scope.rperson.emp_type_category,
                                enable_flag:$scope.rperson.enable_flag,
                                emssmemptypels:area2
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

                var watch1 = $scope.$watch('rperson.emp_type_category',function(newValue,oldValue, scope){
                    if($scope.rperson != undefined){
                        if($scope.rperson.emp_type_category != ''&& oldValue != undefined  && oldValue != newValue){
                            $scope.rperson.emssmemptypels=[];
                        }
                    }
                });

                $scope.showselect=[];
                if(selectitem1 != undefined){
                    $scope.rperson = {
                        emp_type_id:selectitem1.emp_type_id,
                        emp_type_name:selectitem1.emp_type_name,
                        org_name:selectitem1.org_name,
                        org_id:selectitem1.org_id,
                        emp_type_category:selectitem1.emp_type_category,
                        enable_flag:selectitem1.enable_flag,
                        emssmemptypels:selectitem1.emssmemptypels
                    };
                    for(var i=0;i<selectitem1.emssmemptypels.length;i++){
                        if(selectitem1.emssmemptypels[i]._state!='deleted'){
                            $scope.showselect.push(selectitem1.emssmemptypels[i])
                        }
                    }
                }else{
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/get/'+item.emp_type_id,
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
                                $scope.rperson = {
                                    emp_type_id:item.emp_type_id,
                                    emp_type_name:item.emp_type_name,
                                    org_name:item.org_name,
                                    org_id:item.org_id,
                                    emp_type_category:item.emp_type_category,
                                    enable_flag:item.enable_flag,
                                    emssmemptypels:data.data.emssmemptypeh.emssmemptypels
                                };
                                $scope.showselect=data.data.emssmemptypeh.emssmemptypels;
                                for(var i=0;i<$scope.rperson.emssmemptypels.length;i++){
                                    $scope.rperson.emssmemptypels[i]._state = 'old'
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

                $scope.changetype = function(){
                    $scope.rperson.emssmemptypels=[];
                    $scope.showselect=[];
                };

                $scope.addarea = addlevel;

                $scope.addarea1111 = function(ev,item1,type) {
                    //var modeldata = $scope.$eval("{'model':'rperson'}");
                    var selectitem=item1;
                    //console.log(modeldata.model);
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
                            selectitem.org_name = answer.org_name;
                            selectitem.org_id = answer.id
                        }
                        if(type == 'add'){
                            add1(ev,selectitem)
                        }else if(type == 'edit'){
                            edit1(ev,'',selectitem)
                        }
                    }, function() {

                    });
                    $scope.$watch(function() {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function(wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });
                };
            }
        };

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        var selectdata='';
        $scope.batch_failure = function(){
            console.log("parent", $scope.selected1);
            var barea1={
                "emp_type_id":"",
                "enable_flag":"N"
            };
            var barea2=[];
            for(var i=0;i<$scope.selected1.length;i++){
                barea2.push({
                    "emp_type_id":"",
                    "enable_flag":"N"
                });
                barea2[i].emp_type_id=$scope.selected1[i];
            }
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/batchDisabled',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "emssmemptypehs": barea2
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

    test.controller('rpersonCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('rperson');
    return test;
});