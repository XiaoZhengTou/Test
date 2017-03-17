/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('costbasic', []);
    test.controller('costbasicCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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
                remark:'',
                enable_flag:'Y',
                fee_type_code:'',
                fee_type_name:''
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
            remark:'',
            enable_flag:'Y',
            fee_type_code:'',
            fee_type_name:''
        };

        //搜索
        $scope.search_cost_basic = function(){
            $scope.pageindex = '1';
            getapp1('1',$scope.pagesize);
        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/quotefs/page',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    fee_type_name:$scope.search.fee_type_name == ''? undefined:$scope.search.fee_type_name,
                    fee_type_code:$scope.search.fee_type_code == ''? undefined:$scope.search.fee_type_code,
                    remark:$scope.search.remark == ''? undefined:$scope.search.remark,
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

                        $scope.appdata = data.data.data.list;
                        $scope.query.total = data.data.data.totalRow;
                        $scope.query.limit = data.data.data.pageSize;
                        $scope.query.page = data.data.data.pageNumber;

                        //var goodsdata = data.data.data.list;
                        //$scope.tableParams = new NgTableParams({count: 20}, { dataset: goodsdata});
                        //
                        //selectdata=goodsdata;
                        //$scope.selected1 = [];
                        //$scope.draftSelectcheck = false;
                        //$scope.addtablealldelete = false;
                        //$scope.$broadcast("draftSelectcheckChange1", $scope.draftSelectcheck);
                        //
                        //var totalpage=data.data.data.totalPage;
                        //$scope.lastpaged = data.data.data.firstPage;
                        //$scope.nextpaged = data.data.data.lastPage;
                        //$scope.total = data.data.data.totalRow;
                        //
                        ////if(parseInt(data.data.data.totalRow)<  parseInt(data.data.data.pageNumber) * parseInt(size)){
                        ////    $scope.page1=parseInt(data.data.data.totalRow);
                        ////}else{
                        ////    $scope.page1= (parseInt(data.data.data.pageNumber)-1) * parseInt(size) +1;
                        ////}
                        //$scope.page1= (parseInt(data.data.data.pageNumber)-1) * parseInt(size) +1;
                        //if(data.data.data.lastPage){
                        //    $scope.page2= parseInt(data.data.data.totalRow);
                        //}else{
                        //    $scope.page2= parseInt(data.data.data.pageNumber) * parseInt(size);
                        //}
                        //$scope.pages=[];
                        //for(var i=1;i<=totalpage;i++){
                        //    $scope.pages.push(i);
                        //}

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
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/foundationSubject',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    "feeTypeList" :[{
                        "is_need_subject": item.is_need_subject,
                        "is_tax": item.is_tax,
                        "remark": item.remark,
                        "enable_flag": sta,
                        "fee_category_code": item.fee_category_code,
                        "full_path": item.full_path,
                        "is_able_bill_type": item.is_able_bill_type,
                        "alias_name": item.alias_name,
                        "fee_type_name": item.fee_type_name,
                        "key_words": item.key_words,
                        "fee_type_code": item.fee_type_code,
                        "is_apply": item.is_apply,
                        "bill_type_id": item.bill_type_id,
                        "fee_type_tree_id": item.fee_type_tree_id,
                        "fee_type_id": item.fee_type_id,
                        "parent_fee_type_id": item.parent_fee_type_id,
                        "_state":"modified"   //新增为："added",修改为："modified",删除为："deleted"
                    }]
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
                templateUrl: 'templates/basicdata/cost/costbasic-dialog1.html',
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
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/foundationSubject',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "feeTypeList" :[$scope.costbasic]
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

                $scope.costbasic ={
                    "remark": "",
                    "enable_flag": "Y",
                    "is_tax": "Y",
                    "fee_type_name": "",
                    "fee_type_code": "",
                    "_state":"added"
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
                templateUrl: 'templates/basicdata/cost/costbasic-dialog2.html',
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
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/foundationSubject',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "feeTypeList" :[{
                                "remark":  $scope.costbasic.remark,
                                "enable_flag":  $scope.costbasic.enable_flag,
                                "is_tax":  $scope.costbasic.is_tax,
                                "fee_type_id": $scope.costbasic.fee_type_id,
                                "fee_type_name":  $scope.costbasic.fee_type_name,
                                "fee_type_code":  $scope.costbasic.fee_type_code,
                                "_state":"modified"
                            }]
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

                $scope.costbasic = {
                    "remark": item.remark,
                    "enable_flag": item.enable_flag,
                    "is_tax": item.is_tax,
                    "fee_type_id":item.fee_type_id,
                    "fee_type_name": item.fee_type_name,
                    "fee_type_code": item.fee_type_code,
                    "_state":"modified"
                };
            }
        };


        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        //var selectdata='';
        //$scope.draftSelectcheck = false;
        //$scope.addtablealldelete = false;
        //$scope.$on("draftSelectcheckChange", function (event, msg) {
        //    $scope.draftSelectcheck = msg;
        //});
        //$scope.addtoggle2 = function () {
        //    if ($scope.draftSelectcheck) {
        //        $scope.selected1 = [];
        //        $scope.addtablealldelete = false;
        //    } else {
        //        for (var i = 0; i < selectdata.length; i++) {
        //            $scope.selected1.push(selectdata[i])
        //        }
        //        $scope.addtablealldelete = true;
        //    }
        //};
        //$scope.addtoggle1 = function (item, list) {
        //    var idx = list.indexOf(item);
        //    if (idx > -1) list.splice(idx, 1);
        //    else list.push(item);
        //    if (list.length == selectdata.length) {
        //        $scope.draftSelectcheck = true;
        //        $scope.$broadcast("draftSelectcheckChange1", $scope.draftSelectcheck);
        //    } else {
        //        $scope.draftSelectcheck = false;
        //        $scope.$broadcast("draftSelectcheckChange1", $scope.draftSelectcheck);
        //    }
        //    if (list.length != 0) {
        //        $scope.addtablealldelete = true;
        //    } else {
        //        $scope.addtablealldelete = false;
        //    }
        //};
        //$scope.addexists1 = function (item, list) {
        //    return list.indexOf(item) > -1;
        //};
        $scope.batch_failure = function(){
            var ba1={
                "is_need_subject":  '',
                "is_tax":  '',
                "remark":  '',
                "enable_flag":  '',
                "fee_category_code":  '',
                "full_path":  '',
                "is_able_bill_type":  '',
                "alias_name":  '',
                "key_words":  '',
                "is_apply":  '',
                "bill_type_id":  '',
                "parent_fee_type_id":  '',
                "fee_type_id": '',
                "fee_type_name":  '',
                "fee_type_code":  '',
                "_state":"deleted"
            };
            var ba2=[];
            for(var i=0;i<$scope.selected1.length;i++){
                //ba1.is_need_subject=$scope.selected1[i].is_need_subject;
                //ba1.is_tax=$scope.selected1[i].is_tax;
                //ba1.remark=$scope.selected1[i].remark;
                //ba1.enable_flag=$scope.selected1[i].enable_flag;
                //ba1.fee_category_code=$scope.selected1[i].fee_category_code;
                //ba1.full_path=$scope.selected1[i].full_path;
                //ba1.is_able_bill_type=$scope.selected1[i].is_able_bill_type;
                //ba1.alias_name=$scope.selected1[i].alias_name;
                //ba1.key_words=$scope.selected1[i].key_words;
                //ba1.is_apply=$scope.selected1[i].is_apply;
                //ba1.bill_type_id=$scope.selected1[i].bill_type_id;
                //ba1.parent_fee_type_id=$scope.selected1[i].parent_fee_type_id;
                //ba1.fee_type_id=$scope.selected1[i].fee_type_id;
                //ba1.fee_type_name=$scope.selected1[i].fee_type_name;
                //ba1.fee_type_code=$scope.selected1[i].fee_type_code;
                //ba2.push(ba1);
                $scope.selected1[i]._state="deleted"
            }
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/foundationSubject',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "feeTypeList": $scope.selected1
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
                        $scope.selected1=[]
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

    test.controller('costbasicCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('costbasic');
    return test;
});