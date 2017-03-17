/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('budgetlist', []);
    test.controller('budgetlistCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
            $scope.query = {
                order: 'name',
                limit: 5,
                page: 1,
                total:'',
                budget_templet_name: undefined,
                level_number: undefined,
                invalid_date: null,
                valid_date: null
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:'',
            budget_templet_name: '',
            level_number: '',
            invalid_date: null,
            valid_date: null
        };
        //搜索
        $scope.search_budgetlist = function(){
            if($scope.query.limit != undefined){
                $scope.query.page = '1';
                getapp1();
            }
        };

        getapp1();
        function getapp1(){
            var invalid_date='';
            if($scope.query.invalid_date != null && $scope.query.invalid_date != undefined){
                invalid_date=$filter('date')($scope.query.invalid_date, "yyyy-MM-dd");
            }
            var valid_date='';
            if($scope.query.valid_date != null && $scope.query.valid_date != undefined){
                valid_date=$filter('date')($scope.query.valid_date, "yyyy-MM-dd");
            }

            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+'/' + 'bm/EmsBmTemplet/pageLike',
                //url:  APP_CONFIG.SMART_URL+'/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "page_number": parseInt($scope.query.page),
                    "page_size": parseInt($scope.query.limit),
                    budget_templet_name:$scope.query.budget_templet_name == ''? undefined:$scope.query.budget_templet_name,
                    level_number:$scope.query.level_number == ''? undefined:$scope.query.level_number,
                    invalid_date:$scope.query.invalid_date == null? undefined:invalid_date,
                    valid_date:$scope.query.valid_date == null? undefined:valid_date
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


        //新增
        $scope.add = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budget/budgetlist-dialog1.html',
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
            function DialogController22($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: true
                };
                $scope.selected = [];
                $scope.getDesserts = function() {
                    getapp1();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };
                $scope.query = {
                    order: 'name'
                };

                $scope.answer = function(answer) {
                    var invalid_date=null;
                    if($scope.budgetlist.invalid_date != null && $scope.budgetlist.invalid_date != undefined){
                        invalid_date=$filter('date')($scope.budgetlist.invalid_date, "yyyy-MM-dd");
                    }
                    var valid_date=null;
                    if($scope.budgetlist.valid_date != null && $scope.budgetlist.valid_date != undefined){
                        valid_date=$filter('date')($scope.budgetlist.valid_date, "yyyy-MM-dd");
                    }

                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmTemplet/add',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            emsBmTemplet:{
                                _state:'added',
                                budget_templet_name: $scope.budgetlist.budget_templet_name,
                                level_number: $scope.budgetlist.level_number,
                                invalid_date: invalid_date,
                                valid_date: valid_date,
                                emsBmStructures:$scope.appdata
                            }
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
                                getapp1();
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

                $scope.budgetlist = {
                    budget_templet_name: '',
                    level_number: '',
                    invalid_date: null,
                    valid_date: null
                };
                $scope.appdata=[];

                //改变层级
                $scope.changelevel = function(item){
                    if($scope.appdata.length > item ){
                        var r = confirm("是否改变层级？");
                        if (r == true) {
                            $scope.appdata=[];
                            for(var i=1;i<=parseInt(item);i++){
                                $scope.appdata.push({
                                    budget_structure_name:'',
                                    budget_structure_type:'',
                                    control_amount_type:'',
                                    control_process_type:'',
                                    control_tolerance:'',
                                    n_level:i,
                                    relation_level:'1',
                                    remark:'',
                                    str_sql:'',
                                    _state:'added'
                                })
                            }
                        }else{
                            $scope.budgetlist.level_number = $scope.appdata.length
                        }
                    }else if($scope.appdata.length <= item ){
                        var leng=$scope.appdata.length;
                        for(var i=1;i<=parseInt(item)-leng;i++){
                            $scope.appdata.push({
                                budget_structure_name:'',
                                budget_structure_type:'',
                                control_amount_type:'',
                                control_process_type:'',
                                control_tolerance:'',
                                n_level:i,
                                relation_level:'1',
                                remark:'',
                                str_sql:'',
                                _state:'added'
                            })
                        }
                    }
                };

                //添加
                $scope.addrow = function () {
                    if($scope.appdata.length < parseInt($scope.budgetlist.level_number) ){
                        $scope.appdata.push({
                            budget_structure_name:'',
                            budget_structure_type:'',
                            control_amount_type:'',
                            control_process_type:'',
                            control_tolerance:'',
                            n_level:'',
                            relation_level:'1',
                            remark:'',
                            str_sql:'',
                            _state:'added'
                        })
                    }else{

                    }
                };

                //批量删除
                $scope.deleterow = function(){

                    var a=$scope.selected;
                    for(var i=0;i<a.length;i++){
                        for(var j = i + 1;j<a.length;j++){
                            if(a[i]<a[j]){
                                var tmp = a[i];
                                a[i] = a[j];
                                a[j] = tmp;
                            }
                        }
                    }
                    for(var i=0;i<a.length;i++){
                        $scope.appdata.splice(a[i]-1,1)
                    }
                    $scope.selected = [];
                };

                //逐个删除
                $scope.deleteone = function (item) {
                    $scope.appdata.splice(item,1)
                };

                $scope.edit_budget_structure_nam = function (event, item) {
                    event.stopPropagation();
                    var dialog = {
                        modelValue: item.budget_structure_name,
                        placeholder: 'Add a comment',
                        save: function (input) {
                            item.budget_structure_name = input.$modelValue;
                        },
                        targetEvent: event,
                        title: '修改层次名称',
                        validators: {
                            'md-maxlength': 30
                        }
                    };
                    var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
                    promise.then(function (ctrl) {
                        //var input = ctrl.getInput();
                        //input.$viewChangeListeners.push(function () {
                        //    input.$setValidity('test', input.$modelValue !== 'test');
                        //});
                    });
                };

                $scope.edit_remark = function (event, item) {
                    event.stopPropagation();
                    var dialog = {
                        modelValue: item.remark,
                        placeholder: 'Add a comment',
                        save: function (input) {
                            item.remark = input.$modelValue;
                        },
                        targetEvent: event,
                        title: '修改备注',
                        validators: {
                            'md-maxlength': 30
                        }
                    };
                    var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
                    promise.then(function (ctrl) {
                        //var input = ctrl.getInput();
                        //input.$viewChangeListeners.push(function () {
                        //    input.$setValidity('test', input.$modelValue !== 'test');
                        //});
                    });
                };

                $scope.edit_control_tolerance = function (event, item) {
                    event.stopPropagation();
                    var dialog = {
                        modelValue: item.control_tolerance,
                        placeholder: 'Add a comment',
                        save: function (input) {
                            item.control_tolerance = input.$modelValue;
                        },
                        targetEvent: event,
                        type:'range',
                        title: '修改浮动比例'
                    };
                    var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
                    promise.then(function (ctrl) {
                        //var input = ctrl.getInput();
                        //input.$viewChangeListeners.push(function () {
                        //    input.$setValidity('test', input.$modelValue !== 'test');
                        //});
                    });
                };

                //SQL
                getsql();
                function getsql(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/cm/cmEmsSqlCode/queryAll',
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

                                $scope.getsql=data.data;

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

                gettype();
                function gettype(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/getItemsByCode?code=C_BM_BUDGET_STRUCTURE_TYPE',
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

                                $scope.gettype=data.data;

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
        $scope.edit = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budget/budgetlist-dialog2.html',
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
            function DialogController22($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: false,
                    decapitate: false,
                    largeEditDialog: true
                };
                $scope.selected = [];
                $scope.getDesserts = function() {
                    getapp1();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };
                $scope.query = {
                    order: 'name'
                };

                $scope.answer = function(answer) {
                    var invalid_date=null;
                    if($scope.budgetlist.invalid_date != null && $scope.budgetlist.invalid_date != undefined){
                        invalid_date=$filter('date')($scope.budgetlist.invalid_date, "yyyy-MM-dd");
                    }
                    var valid_date=null;
                    if($scope.budgetlist.valid_date != null && $scope.budgetlist.valid_date != undefined){
                        valid_date=$filter('date')($scope.budgetlist.valid_date, "yyyy-MM-dd");
                    }
                    var dataBM=[];
                    for(var h =0;h<$scope.appdata1.length;h++){
                        if($scope.appdata1[h]._state == 'deleted'){
                            dataBM.push($scope.appdata1[h])
                        }
                    }
                    for(var i =0;i<$scope.appdata.length;i++){
                        if($scope.appdata[i]._state == 'added'){
                            dataBM.push($scope.appdata[i])
                        }
                        if($scope.appdata[i]._state == 'old'){
                            $scope.appdata[i]._state = 'modified';
                            dataBM.push($scope.appdata[i]);
                        }
                    }
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmTemplet/add',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            emsBmTemplet:{
                                _state:'modified',
                                budget_templet_id: $scope.budgetlist.budget_templet_id,
                                budget_templet_name: $scope.budgetlist.budget_templet_name,
                                level_number: $scope.budgetlist.level_number,
                                invalid_date: invalid_date,
                                valid_date: valid_date,
                                emsBmStructures:dataBM
                            }
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
                                $mdDialog.hide('修改成功！');
                                getapp1();
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
                                for(var i=0;i<$scope.appdata.length;i++){
                                    if($scope.appdata[i]._state == 'modified'){
                                        $scope.appdata[i]._state = 'old';
                                    }
                                }
                                alert(data.msg)
                            }

                        })
                        .error(function(data, status, headers, config) {
                            //alert(status)
                        });
                };

                var invalid_date='';
                if(item.invalid_date != null && item.invalid_date != undefined){
                    invalid_date=item.invalid_date.toString();
                    invalid_date =  invalid_date.replace(/-/g,"/");
                }
                var valid_date='';
                if(item.valid_date != null && item.valid_date != undefined){
                    valid_date=item.valid_date.toString();
                    valid_date =  valid_date.replace(/-/g,"/");
                }
                $scope.budgetlist = {
                    budget_templet_id: item.budget_templet_id,
                    budget_templet_name: item.budget_templet_name,
                    level_number: item.level_number,
                    invalid_date: invalid_date == ''? null:new Date(invalid_date),
                    valid_date: valid_date == ''? null:new Date(valid_date)
                };

                $scope.appdata=[];
                $scope.appdata1=[];

                getapp2();
                function getapp2(){
                    var getconfig = {
                        method: 'GET',
                        url:  APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/getHead/'+item.budget_templet_id,
                        //url:  APP_CONFIG.SMART_URL+'/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
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

                                $scope.appdata = data.data.emsBmTemplet.emsBmStructures;
                                for(var i=0;i<$scope.appdata.length;i++){
                                    $scope.appdata[i]. _state = 'old';
                                }

                                var getconfig = {
                                    method: 'GET',
                                    url:  APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/getHead/'+item.budget_templet_id,
                                    //url:  APP_CONFIG.SMART_URL+'/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
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

                                            $scope.appdata1 = data.data.emsBmTemplet.emsBmStructures;
                                            for(var i=0;i<$scope.appdata1.length;i++){
                                                $scope.appdata1[i]. _state = 'old';
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

                //改变层级
                $scope.changelevel = function(item){
                    if($scope.appdata.length > item ){
                        var r = confirm("是否改变层级？");
                        if (r == true) {
                            $scope.appdata=[];
                            for(var i=0;i<$scope.appdata1.length;i++){
                                $scope.appdata1[i]._state = 'deleted';
                            }
                            for(var i=1;i<=parseInt(item);i++){
                                $scope.appdata.push({
                                    budget_structure_name:'',
                                    budget_structure_type:'',
                                    control_amount_type:'',
                                    control_process_type:'',
                                    control_tolerance:'',
                                    n_level:i,
                                    relation_level:'1',
                                    remark:'',
                                    str_sql:'',
                                    _state:'added'
                                })
                            }
                        }else{
                            $scope.budgetlist.level_number = $scope.appdata.length
                        }
                    }else if($scope.appdata.length <= item ){
                        var leng=$scope.appdata.length;
                        for(var i=1;i<=parseInt(item)-leng;i++){
                            $scope.appdata.push({
                                budget_structure_name:'',
                                budget_structure_type:'',
                                control_amount_type:'',
                                control_process_type:'',
                                control_tolerance:'',
                                n_level:i,
                                relation_level:'1',
                                remark:'',
                                str_sql:'',
                                _state:'added'
                            })
                        }
                    }
                };

                //添加
                $scope.addrow = function () {
                    if($scope.appdata.length < parseInt($scope.budgetlist.level_number) ){
                        $scope.appdata.push({
                            budget_structure_name:'',
                            budget_structure_type:'',
                            control_amount_type:'',
                            control_process_type:'',
                            control_tolerance:'',
                            n_level:'',
                            relation_level:'1',
                            remark:'',
                            str_sql:'',
                            _state:'added'
                        })
                    }else{

                    }
                };

                //批量删除
                $scope.deleterow = function(){
                    var a=$scope.selected;
                    for(var i=0;i<a.length;i++){
                        for(var j = i + 1;j<a.length;j++){
                            if(a[i]<a[j]){
                                var tmp = a[i];
                                a[i] = a[j];
                                a[j] = tmp;
                            }
                        }
                    }
                    for(var i=0;i<a.length;i++){
                        if($scope.appdata[a[i]-1]._state == 'old'){
                            for(var h=0;h<$scope.appdata1.length;h++){
                                if($scope.appdata1[h].budget_structure_id == $scope.appdata[a[i]-1].budget_structure_id){
                                    $scope.appdata1[h]._state = 'deleted';
                                }
                            }
                        }
                        $scope.appdata.splice(a[i]-1,1)
                    }
                    $scope.selected = [];
                };

                //逐个删除
                $scope.deleteone = function (item) {
                    if($scope.appdata[item]._state == 'old'){
                        for(var h=0;h<$scope.appdata1.length;h++){
                            if($scope.appdata1[h].budget_structure_id == $scope.appdata[item].budget_structure_id){
                                $scope.appdata1[h]._state = 'deleted';
                            }
                        }
                    }
                    $scope.appdata.splice(item,1)
                };

                $scope.edit_budget_structure_nam = function (event, item) {
                    event.stopPropagation();
                    var dialog = {
                        modelValue: item.budget_structure_name,
                        placeholder: 'Add a comment',
                        save: function (input) {
                            item.budget_structure_name = input.$modelValue;
                        },
                        targetEvent: event,
                        title: '修改层次名称',
                        validators: {
                            'md-maxlength': 30
                        }
                    };
                    var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
                    promise.then(function (ctrl) {
                        //var input = ctrl.getInput();
                        //input.$viewChangeListeners.push(function () {
                        //    input.$setValidity('test', input.$modelValue !== 'test');
                        //});
                    });
                };

                $scope.edit_remark = function (event, item) {
                    event.stopPropagation();
                    var dialog = {
                        modelValue: item.remark,
                        placeholder: 'Add a comment',
                        save: function (input) {
                            item.remark = input.$modelValue;
                        },
                        targetEvent: event,
                        title: '修改备注',
                        validators: {
                            'md-maxlength': 30
                        }
                    };
                    var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
                    promise.then(function (ctrl) {
                        //var input = ctrl.getInput();
                        //input.$viewChangeListeners.push(function () {
                        //    input.$setValidity('test', input.$modelValue !== 'test');
                        //});
                    });
                };

                $scope.edit_control_tolerance = function (event, item) {
                    event.stopPropagation();
                    var dialog = {
                        modelValue: item.control_tolerance,
                        placeholder: 'Add a comment',
                        save: function (input) {
                            item.control_tolerance = input.$modelValue;
                        },
                        targetEvent: event,
                        type:'range',
                        title: '修改浮动比例'
                    };
                    var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
                    promise.then(function (ctrl) {
                        //var input = ctrl.getInput();
                        //input.$viewChangeListeners.push(function () {
                        //    input.$setValidity('test', input.$modelValue !== 'test');
                        //});
                    });
                };

                //SQL
                getsql();
                function getsql(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/cm/cmEmsSqlCode/queryAll',
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

                                $scope.getsql=data.data;

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

                gettype();
                function gettype(){
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/dictitem/getItemsByCode?code=C_BM_BUDGET_STRUCTURE_TYPE',
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

                                $scope.gettype=data.data;

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
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });


    angular._LoadModule('budgetlist');
    return test;
});