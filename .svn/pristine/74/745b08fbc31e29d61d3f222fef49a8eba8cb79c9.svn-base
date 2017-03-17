/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('rnormdetail', []);
    test.controller('rnormdetailCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$location,$timeout){

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

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        //$scope.pagesize = '5';
        //$scope.pageindex = '1';
        $scope.search = {
            standard_type_name:'',
            emp_type_name:'',
            area_type_name:''
        };
        $scope.rnorm = {
            expense_std_id:'',
            expense_std_code:'',
            org_id:'',
            org_name:'',
            control_flag:'',
            confirm_status:''
        };
        $scope.status = 1;  //1新增  2草稿  3生效  4作废

        //搜索
        $scope.search_rnormdetail = function(){
            getapp1('1',$scope.pagesize);
        };

        //页面跳转后的操作
        var watch = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().rnormdetail_add != null && $location.search().rnormdetail_add != undefined){

                $scope.status = 1;
                $scope.rnorm.expense_std_id='';
                $scope.rnorm.expense_std_code='';
                $scope.rnorm.org_id='';
                $scope.rnorm.org_name='';
                $scope.rnorm.control_flag='';
                $scope.rnorm.confirm_status='DRAFT';
                getapp1();
            }else if($location.search().rnormdetail_edit != null && $location.search().rnormdetail_edit != undefined){

                if($location.search().rnormdetail_edit.confirm_status == 'DRAFT'){
                    $scope.status = 2;
                }else if($location.search().rnormdetail_edit.confirm_status == 'AUDITED'){
                    $scope.status = 3;
                }else if($location.search().rnormdetail_edit.confirm_status == 'DISABLED'){
                    $scope.status = 4;
                }
                $scope.rnorm.expense_std_id=$location.search().rnormdetail_edit.expense_std_id;
                $scope.rnorm.expense_std_code=$location.search().rnormdetail_edit.expense_std_code;
                $scope.rnorm.org_id=$location.search().rnormdetail_edit.org_id;
                $scope.rnorm.org_name=$location.search().rnormdetail_edit.org_name;
                $scope.rnorm.control_flag=$location.search().rnormdetail_edit.control_flag;
                $scope.rnorm.confirm_status=$location.search().rnormdetail_edit.confirm_status;
                var id=$location.search().rnormdetail_edit.expense_std_id;
                if(id != null && id != undefined && id !=''){
                    getapp2();
                }else{
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/rnorm"
                }
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/rnorm"
            }
        });

        var detaildata=[];


        function getapp1(){
            if($scope.rnorm.expense_std_id == '' && $scope.status == 1){
                selectdata=detaildata;
                $scope.appdata = detaildata;
                //$scope.tableParams = new NgTableParams({count: 20}, { dataset: detaildata});

            }else if($scope.status != 1){
                var showdetail=[];
                for(var i=0;i<detaildata.length;i++){
                    if(detaildata[i]._state != 'deleted'){
                        showdetail.push(detaildata[i])
                    }
                }
                selectdata=showdetail;
                $scope.appdata = showdetail;
                //$scope.tableParams = new NgTableParams({count: 20}, { dataset: showdetail});
            }
        }
        function getapp2(){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmExpenseStdH/queryLine',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    "query_param": {
                        expense_std_id:$scope.rnorm.expense_std_id,
                        //expense_std_id:'26512946288918528',
                        standard_type_name:$scope.search.standard_type_name == ''? undefined:$scope.search.standard_type_name,
                        emp_type_name:$scope.search.emp_type_name == ''? undefined:$scope.search.emp_type_name,
                        area_type_name:$scope.search.area_type_name == ''? undefined:$scope.search.area_type_name
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

                        $scope.appdata = data.data;

                        var goodsdata = data.data;
                        //$scope.tableParams = new NgTableParams({count: 20}, { dataset: goodsdata});
                        for(var i=0;i<goodsdata.length;i++){
                            goodsdata[i]._state='old'
                        }
                        detaildata=goodsdata;

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

        $scope.back = function (){
            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/rnorm"
        };

        //暂存
        $scope.draft = function(ev) {
            var expense_std_id=$scope.rnorm.expense_std_id;
            var expense_std_code=$scope.rnorm.expense_std_code;
            var org_id=$scope.rnorm.org_id;
            var org_name=$scope.rnorm.org_name;
            var control_flag=$scope.rnorm.control_flag;
            var confirm_status=$scope.rnorm.confirm_status;
            var savedata=[];

            for(var i=0;i<detaildata.length;i++){
                if(detaildata[i]._state != 'old'){
                    savedata.push(detaildata[i])
                }
            }

            $scope.rnormdetail = {
                "emssmexpensestdh": {
                    'expense_std_id':expense_std_id == ''?undefined:expense_std_id,
                    "expense_std_code":expense_std_code,
                    "org_id":org_id,
                    "control_flag":control_flag,
                    "org_name":org_name,
                    "confirm_status":confirm_status,
                    "emssmexpensestdls":savedata
                }
            };

            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmExpenseStdH/save',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:$scope.rnormdetail
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        //alert('新增成功！');
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('保存成功！')
                                .position('top right')
                                .hideDelay(1500)
                        );
                        $location.path("/rnorm");
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

        //生效
        $scope.audited = function(ev) {
            var expense_std_id=$scope.rnorm.expense_std_id;
            var expense_std_code=$scope.rnorm.expense_std_code;
            var org_id=$scope.rnorm.org_id;
            var org_name=$scope.rnorm.org_name;
            var control_flag=$scope.rnorm.control_flag;
            var confirm_status=$scope.rnorm.confirm_status;
            var savedata=[];

            for(var i=0;i<detaildata.length;i++){
                if(detaildata[i]._state != 'old'){
                    savedata.push(detaildata[i])
                }
            }
            $scope.rnormdetail = {
                "emssmexpensestdh": {
                    'expense_std_id':expense_std_id == ''?undefined:expense_std_id,
                    "expense_std_code":expense_std_code,
                    "org_id":org_id,
                    "control_flag":control_flag,
                    "org_name":org_name,
                    "confirm_status":'AUDITED',
                    "emssmexpensestdls":savedata
                }
            };

            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmExpenseStdH/save',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:$scope.rnormdetail
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        //alert('新增成功！');
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('保存成功！')
                                .position('top right')
                                .hideDelay(1500)
                        );
                        $location.path("/rnorm");
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

        //作废
        $scope.disabled = function(ev) {
            var expense_std_id=$scope.rnorm.expense_std_id;
            var expense_std_code=$scope.rnorm.expense_std_code;
            var org_id=$scope.rnorm.org_id;
            var org_name=$scope.rnorm.org_name;
            var control_flag=$scope.rnorm.control_flag;
            var confirm_status=$scope.rnorm.confirm_status;
            var savedata=[];

            for(var i=0;i<detaildata.length;i++){
                if(detaildata[i]._state != 'old'){
                    savedata.push(detaildata[i])
                }
            }
            $scope.rnormdetail = {
                "emssmexpensestdh": {
                    'expense_std_id':expense_std_id == ''?undefined:expense_std_id,
                    "expense_std_code":expense_std_code,
                    "org_id":org_id,
                    "control_flag":control_flag,
                    "org_name":org_name,
                    "confirm_status":'DISABLED',
                    "emssmexpensestdls":savedata
                }
            };

            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmExpenseStdH/save',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:$scope.rnormdetail
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        //alert('新增成功！');
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('保存成功！')
                                .position('top right')
                                .hideDelay(1500)
                        );
                        $location.path("/rnorm");
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
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/reimburse/rnormdetail-dialog1.html',
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
                    for(var i=0;i<$scope.rareadata.length;i++){
                        if($scope.rnormdetail.area_type_id == $scope.rareadata[i].emssmareatypeh.area_type_id){
                            $scope.rnormdetail.area_type_name=$scope.rareadata[i].emssmareatypeh.area_type_name
                        }
                    }
                    for(var i=0;i<$scope.rpersondata.length;i++){
                        if($scope.rnormdetail.emp_type_id == $scope.rpersondata[i].emssmemptypeh.emp_type_id){
                            $scope.rnormdetail.emp_type_name=$scope.rpersondata[i].emssmemptypeh.emp_type_name
                        }
                    }
                    for(var i=0;i<$scope.currencydata.length;i++){
                        if($scope.rnormdetail.currency_code == $scope.currencydata[i].currency_code){
                            $scope.rnormdetail.currency_name=$scope.currencydata[i].currency_name
                        }
                    }
                    detaildata.push($scope.rnormdetail);
                    getapp1();
                    $mdDialog.hide();
                };

                $scope.rnormdetail = {
                            "_state":"added",
                            "standard_type_name":"",
                            "standard_type":"BZF",
                            "emp_type_id":'',
                            "emp_type_name":"",
                            "area_type_id":'',
                            "area_type_name":"",
                            "amount":'',
                            "deduct_amount":'',
                            "control_type":0,
                            "control_tolerance":'',
                            "currency_code":"",
                            "currency_name":"人民币",
                            "remark":""
                };

                //获取地区类型
                getrarea();
                function getrarea(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmAreaTypeH/likeAsH',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "query_param": {
                                "enable_flag":"Y"
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

                                $scope.rareadata=data.data;

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

                //获取人员类型
                getrperson();
                function getrperson(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/likeAsH',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "query_param": {
                                "enable_flag":"Y"
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

                                $scope.rpersondata=data.data;

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

                //获取货币
                getcurrency();
                function getcurrency(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/currencies/query',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            active_flag:'Y'
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.currencydata=data.data;

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

        //编辑
        $scope.edit = function(ev,item,i) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/reimburse/rnormdetail-dialog2.html',
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
                    for(var j=0;j<$scope.rareadata.length;j++){
                        if($scope.rnormdetail.area_type_id == $scope.rareadata[j].emssmareatypeh.area_type_id){
                            $scope.rnormdetail.area_type_name=$scope.rareadata[j].emssmareatypeh.area_type_name
                        }
                    }
                    for(var j=0;j<$scope.rpersondata.length;j++){
                        if($scope.rnormdetail.emp_type_id == $scope.rpersondata[j].emssmemptypeh.emp_type_id){
                            $scope.rnormdetail.emp_type_name=$scope.rpersondata[j].emssmemptypeh.emp_type_name
                        }
                    }
                    for(var j=0;j<$scope.currencydata.length;j++){
                        if($scope.rnormdetail.currency_code == $scope.currencydata[j].currency_code){
                            $scope.rnormdetail.currency_name=$scope.currencydata[j].currency_name
                        }
                    }
                    detaildata[i]=$scope.rnormdetail;
                    getapp1();
                    $mdDialog.hide();
                };

                if(detaildata[i].expense_std_l_id != undefined && detaildata[i].expense_std_l_id != null){
                    $scope.rnormdetail = {
                        "_state":'modified',
                        "standard_type_name":detaildata[i].standard_type_name,
                        "standard_type":detaildata[i].standard_type,
                        "emp_type_id":detaildata[i].emp_type_id,
                        "emp_type_name":detaildata[i].emp_type_name,
                        "area_type_id":detaildata[i].area_type_id,
                        "area_type_name":detaildata[i].area_type_name,
                        "amount":detaildata[i].amount,
                        "deduct_amount":detaildata[i].deduct_amount,
                        "control_type":0,
                        "control_tolerance":detaildata[i].control_tolerance,
                        "currency_code":detaildata[i].currency_code,
                        "currency_name":detaildata[i].currency_name,
                        "remark":detaildata[i].remark,
                        'expense_std_id':detaildata[i].expense_std_id,
                        'expense_std_l_id':detaildata[i].expense_std_l_id
                    };
                }else{
                    $scope.rnormdetail = {
                        "_state":'added',
                        "standard_type_name":detaildata[i].standard_type_name,
                        "standard_type":detaildata[i].standard_type,
                        "emp_type_id":detaildata[i].emp_type_id,
                        "emp_type_name":detaildata[i].emp_type_name,
                        "area_type_id":detaildata[i].area_type_id,
                        "area_type_name":detaildata[i].area_type_name,
                        "amount":detaildata[i].amount,
                        "deduct_amount":detaildata[i].deduct_amount,
                        "control_type":0,
                        "control_tolerance":detaildata[i].control_tolerance,
                        "currency_code":detaildata[i].currency_code,
                        "currency_name":detaildata[i].currency_name,
                        "remark":detaildata[i].remark,
                        'expense_std_id':detaildata[i].expense_std_id,
                        'expense_std_l_id':detaildata[i].expense_std_l_id
                    };
                }

                //获取地区类型
                getrarea();
                function getrarea(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmAreaTypeH/likeAsH',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "query_param": {
                                "enable_flag":"Y"
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

                                $scope.rareadata=data.data;

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

                //获取人员类型
                getrperson();
                function getrperson(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/sm/EmsSmEmpTypeH/likeAsH',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            "query_param": {
                                "enable_flag":"Y"
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

                                $scope.rpersondata=data.data;

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

                //获取货币
                getcurrency();
                function getcurrency(){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/currencies/query',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            active_flag:'Y'
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.currencydata=data.data;

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
        $scope.delete = function(ev,item,i) {
            if(detaildata[i].expense_std_l_id != undefined && detaildata[i].expense_std_l_id != null){
                $scope.rnormdetail = {
                    "_state":'deleted',
                    "standard_type_name":detaildata[i].standard_type_name,
                    "standard_type":detaildata[i].standard_type,
                    "emp_type_id":detaildata[i].emp_type_id,
                    "emp_type_name":detaildata[i].emp_type_name,
                    "area_type_id":detaildata[i].area_type_id,
                    "area_type_name":detaildata[i].area_type_name,
                    "amount":detaildata[i].amount,
                    "deduct_amount":detaildata[i].deduct_amount,
                    "control_type":0,
                    "control_tolerance":detaildata[i].control_tolerance,
                    "currency_code":detaildata[i].currency_code,
                    "currency_name":detaildata[i].currency_name,
                    "remark":detaildata[i].remark,
                    'expense_std_id':detaildata[i].expense_std_id,
                    'expense_std_l_id':detaildata[i].expense_std_l_id
                };
                detaildata[i]=$scope.rnormdetail;
                getapp1();
            }else{
                detaildata.splice(i,1);
                getapp1();
            }

        };

        $scope.addarea1 = function(ev) {
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
                    $scope.rnorm.org_id=answer.id;
                    $scope.rnorm.org_name=answer.org_name;
                }
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

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        var selectdata='';
        $scope.batch_failure = function(){
            for(var h=0;h<$scope.selected1.length;h++){
                if(selectdata[$scope.selected1[h]].expense_std_l_id != undefined && selectdata[$scope.selected1[h]].expense_std_l_id != null){
                    $scope.rnormdetail = {
                        "_state":'deleted',
                        "standard_type_name":detaildata[$scope.selected1[h]].standard_type_name,
                        "standard_type":detaildata[$scope.selected1[h]].standard_type,
                        "emp_type_id":detaildata[$scope.selected1[h]].emp_type_id,
                        "emp_type_name":detaildata[$scope.selected1[h]].emp_type_name,
                        "area_type_id":detaildata[$scope.selected1[h]].area_type_id,
                        "area_type_name":detaildata[$scope.selected1[h]].area_type_name,
                        "amount":detaildata[$scope.selected1[h]].amount,
                        "deduct_amount":detaildata[$scope.selected1[h]].deduct_amount,
                        "control_type":0,
                        "control_tolerance":detaildata[$scope.selected1[h]].control_tolerance,
                        "currency_code":detaildata[$scope.selected1[h]].currency_code,
                        "currency_name":detaildata[$scope.selected1[h]].currency_name,
                        "remark":detaildata[$scope.selected1[h]].remark,
                        'expense_std_id':detaildata[$scope.selected1[h]].expense_std_id,
                        'expense_std_l_id':detaildata[$scope.selected1[h]].expense_std_l_id
                    };
                    detaildata[$scope.selected1[h]]=$scope.rnormdetail;
                }else{
                    var idx = detaildata.indexOf(selectdata[$scope.selected1[h]]);
                    detaildata.splice(idx,1);
                }
            }
            $scope.draftSelectcheck = false;
            $scope.$broadcast("draftSelectcheckChange1", $scope.draftSelectcheck);
            $scope.selected1=[];
            $scope.addtablealldelete = false;
            getapp1();
        };
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    test.controller('rnormdetailCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('rnormdetail');
    return test;
});