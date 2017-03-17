/**
 * Created by LUOZS on 2016-6-20.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('workflow', []);
    test.controller('workflowCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$mdToast,$timeout){

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

        var sys_id='';
        var tenant_id='';
        getapp1();
        function getapp1(){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/form/getcommon',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                dataType: 'json',
                contentType: "application/json"
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        sys_id= data.data.sys_id;
                    }else if(data.code=='0401'){
                        if(data.msg == '未登录.'){
                            $cookies.remove("managerId");
                            $cookies.remove("tenantId");
                            $cookies.remove("JSESSION");
                            $cookies.remove("userId");
                            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                        }

                    }else{
                        alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/form/query',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    tenant_id:'27203592670674944'
                },
                dataType: 'json',
                contentType: "application/json"
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        var goodsdata = data.data;
                        //sys_id= data.data[0].sys_id;
                        tenant_id= '27203592670674944';
                        $scope.tableParams = new NgTableParams({}, { dataset: goodsdata});

                        $scope.appdata = data.data;

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
                        //alert(data.msg)
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
                controller: DialogController1,
                templateUrl: 'templates/workflow/workflow-dialog1.html',
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
                    var modelname='';
                    for(var i=0;i<$scope.workflow_modle.length;i++){
                        if($scope.workflow_modle[i].code == $scope.workflow.model_id){
                            modelname = $scope.workflow_modle[i].name
                        }
                    }

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/form/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            tenant_id:tenant_id,
                            sys_id:$scope.workflow.sys_id,
                            model_id: $scope.workflow.model_id,
                            model_name:modelname,
                            title:$scope.workflow.title,
                            url:$scope.workflow.url,
                            service_id:$scope.workflow.service_id
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

                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/param/queryByType?type=jiebao_module&module=workflow',
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
                            $scope.workflow_modle = data.data
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

                //$scope.workflow_modle = [
                //    {model_id:'001',model_name:'报销流程'},
                //    {model_id:'002',model_name:'请假申请'}
                //];

                $scope.workflow = {
                    sys_id:sys_id,
                    title:'',
                    url:'',
                    service_id:'',
                    model_id:''
                };
            }
        };

        //修改
        $scope.edit = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/workflow/workflow-dialog2.html',
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
                    var modelname='';
                    for(var i=0;i<$scope.workflow_modle.length;i++){
                        if($scope.workflow_modle[i].code == $scope.workflow.model_id){
                            modelname = $scope.workflow_modle[i].name
                        }
                    }

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/form/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            id:$scope.workflow.id,
                            model_id: $scope.workflow.model_id,
                            model_name:modelname,
                            title:$scope.workflow.title,
                            url:$scope.workflow.url,
                            service_id:$scope.workflow.service_id
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

                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/param/queryByType?type=jiebao_module&module=workflow',
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
                            $scope.workflow_modle = data.data
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

                $scope.workflow = {
                    id:item.id,
                    sys_id:item.sys_id,
                    title:item.title,
                    url:item.url,
                    service_id:item.service_id,
                    model_id:item.model_id
                };
            }
        };

        //删除
        $scope.delete = function(item){
            var status='';
            if(item.status == '0'){
                status='1'
            }else if(item.status == '1'){
                status='0'
            }
            var r = confirm("确定更改状态？");
            if (r == true) {
                var getconfig = {
                    method: 'POST',
                    url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/form/upstatus',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data:{
                        id:item.id,
                        status:status
                    }
                //{"ids":"21687666164629506,21687666164629506"}  多个id示例
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&&$scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){
                            getapp1();
                            alert("修改成功！");
                        }else if(data.code =='B99997'){

                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
            }
            else {
                //alert("You pressed Cancel!");
            }
        };

        //数据源
        $scope.paramsflow = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/workflow/workflow-dialog3.html',
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
                    $mdDialog.hide();
                };

                $scope.select_id='';
                $scope.showdelete1=true;
                $scope.showlist1=true;
                getdatasource();
                function getdatasource(){

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/ds/list',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            form_id:item.id
                        },
                        dataType: 'json',
                        contentType: "application/json"
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                var goodsdata = data.data;
                                $scope.datasource = goodsdata;
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

                    //$scope.datasource = [
                    //    {datasource_name:'11',data_bean_method:'11',data_bean_id:'11'},
                    //    {datasource_name:'22',data_bean_method:'22',data_bean_id:'22'}
                    //];
                }

                //新增数据源
                $scope.newparms = function () {
                    $scope.params_workflow = {
                        data_bean_id:'',
                        datasource_name:'',
                        data_bean_method:''
                    };
                    $scope.select_id='';
                    $scope.showlist1=false;
                    $scope.cdp_wf_params = [];
                    au_params=[];
                    $scope.selected1=[];
                    $scope.draftSelectcheck = false;
                    $scope.addtablealldelete = true;
                };

                //删除数据源
                $scope.deleteparms11 = function () {
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/ds/betchdel',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            ids:[$scope.select_id]
                        },
                        dataType: 'json',
                        contentType: "application/json"
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                $scope.params_workflow = {
                                    data_bean_id:'',
                                    datasource_name:'',
                                    data_bean_method:''
                                };
                                $scope.select_id='';
                                $scope.showdelete1=true;
                                $scope.showlist1=true;
                                $scope.cdp_wf_params = [];
                                au_params=[];
                                $scope.selected1=[];
                                $scope.draftSelectcheck = false;
                                $scope.addtablealldelete = true;
                                getdatasource();
                                alert('删除成功！');
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

                //保存数据源
                $scope.saveparms = function () {
                    var cdp_wf_params2=[];
                    var cdp_wf_params1={field_id:'',field_name:'',field_type:'',option:'',id:''};
                    if($scope.cdp_wf_params !=''&& $scope.cdp_wf_params != undefined){
                        for(var i=0;i<$scope.cdp_wf_params.length;i++){
                            if($scope.cdp_wf_params[i].id == '' || $scope.cdp_wf_params[i].field_id == '' || $scope.cdp_wf_params[i].field_name == '' ||$scope.cdp_wf_params[i].field_type == '' ){

                            }else{
                                cdp_wf_params1.id = $scope.cdp_wf_params[i].id;
                                cdp_wf_params1.field_id = $scope.cdp_wf_params[i].field_id;
                                cdp_wf_params1.field_name = $scope.cdp_wf_params[i].field_name;
                                cdp_wf_params1.field_type = $scope.cdp_wf_params[i].field_type;
                                cdp_wf_params1.option = $scope.cdp_wf_params[i].option;
                                cdp_wf_params2.push(cdp_wf_params1);
                                cdp_wf_params1={field_id:'',field_name:'',field_type:'',option:'',id:''};
                            }
                        }
                    }

                    var data='';
                    if($scope.select_id ==''){
                        data={
                            form_id:item.id,
                            data_bean_id:$scope.params_workflow.data_bean_id,
                            datasource_name:$scope.params_workflow.datasource_name,
                            data_bean_method:$scope.params_workflow.data_bean_method,
                            cdp_wf_form_params:cdp_wf_params2
                        }
                    }else{
                        data={
                            id: $scope.select_id,
                            form_id:item.id,
                            data_bean_id:$scope.params_workflow.data_bean_id,
                            datasource_name:$scope.params_workflow.datasource_name,
                            data_bean_method:$scope.params_workflow.data_bean_method,
                            cdp_wf_form_params:cdp_wf_params2
                        }
                    }

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/ds/save',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:data,
                        dataType: 'json',
                        contentType: "application/json"
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                alert('保存成功！');
                                getdatasource();
                                $scope.select_id = data.data.id;
                                if($scope.select_id != ''){
                                    $scope.findparms($scope.select_id);
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

                //查询数据源
                $scope.findparms = function (id) {
                    $scope.select_id = id;
                    $scope.showdelete1=false;
                    $scope.showlist1=false;
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/ds/show',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            id:id
                        },
                        dataType: 'json',
                        contentType: "application/json"
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                var goodsdata = data.data;

                                $scope.params_workflow.data_bean_id = data.data.data_bean_id;
                                $scope.params_workflow.datasource_name = data.data.datasource_name;
                                $scope.params_workflow.data_bean_method = data.data.data_bean_method;

                                $scope.cdp_wf_params = data.data.cdp_wf_params;

                                for(var i=0;i<$scope.cdp_wf_params.length;i++){
                                    $scope.cdp_wf_params[i].option = 'update';
                                    $scope.cdp_wf_params[i].option_id = i;
                                }
                                getparams();

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

                $scope.params_workflow = {
                    data_bean_id:'',
                    datasource_name:'',
                    data_bean_method:''
                };

                //获取字段信息
                var au_params=[];
                //getparams();
                function getparams(){
                    //$scope.cdp_wf_params = [
                    //    {field_id:'11',field_name:'11',field_type:'number',option:'update',option_id:'0',id:'1111'},
                    //    {field_id:'22',field_name:'22',field_type:'string',option:'update',option_id:'1',id:'2222'},
                    //    {field_id:'22',field_name:'22',field_type:'string',option:'update',option_id:'2',id:'3333'}
                    //];
                    for(var i=0;i<$scope.cdp_wf_params.length;i++){
                        $scope.cdp_wf_params[i].fname0=false;
                        $scope.cdp_wf_params[i].ftype0=false;
                        $scope.cdp_wf_params[i].fid0=false;
                        if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                            au_params.push($scope.cdp_wf_params[i]);
                        }
                    }
                }

                //添加字段
                $scope.addparms1 = function(){
                    $scope.selected1=[];
                    $scope.draftSelectcheck = false;
                    $scope.addtablealldelete = true;
                    $scope.add_params = {field_id:'',field_name:'',field_type:'number',option:'add',option_id:''};
                    $scope.add_params.option_id = $scope.cdp_wf_params.length;
                    $scope.cdp_wf_params.push($scope.add_params);
                    au_params=[];
                    for(var i=0;i<$scope.cdp_wf_params.length;i++){
                        $scope.cdp_wf_params[i].fname0=false;
                        $scope.cdp_wf_params[i].ftype0=false;
                        $scope.cdp_wf_params[i].fid0=false;
                        if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                            au_params.push($scope.cdp_wf_params[i]);
                        }
                    }
                };

                //删除字段
                $scope.deleteparms = function(){
                    for(var j=0;j<$scope.selected1.length;j++){
                        if($scope.cdp_wf_params[$scope.selected1[j]].option == 'update'){
                            $scope.cdp_wf_params[$scope.selected1[j]].option = 'delete';
                        }else if($scope.cdp_wf_params[$scope.selected1[j]].option == 'add'){
                            $scope.cdp_wf_params[$scope.selected1[j]].option = 'null';
                        }

                    }
                    $scope.selected1=[];
                    $scope.draftSelectcheck = false;
                    $scope.addtablealldelete = true;
                    au_params=[];
                    for(var i=0;i<$scope.cdp_wf_params.length;i++){
                        $scope.cdp_wf_params[i].fname0=false;
                        $scope.cdp_wf_params[i].ftype0=false;
                        $scope.cdp_wf_params[i].fid0=false;
                        if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                            au_params.push($scope.cdp_wf_params[i]);
                        }
                    }
                };

                //添加过滤器
                $scope.myFilter = function(item){
                    return item.option === 'update' || item.option === 'add';
                };

                //取消编辑框
                $scope.cancelclick = function (ev,num) {
                    if($scope.cdp_wf_params != null && $scope.cdp_wf_params != undefined){
                        au_params=[];
                        for(var i=0;i<$scope.cdp_wf_params.length;i++){
                            $scope.cdp_wf_params[i].fname0=false;
                            $scope.cdp_wf_params[i].ftype0=false;
                            $scope.cdp_wf_params[i].fid0=false;
                            if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                                au_params.push($scope.cdp_wf_params[i]);
                            }
                        }
                        var ftype=$scope.bbb;
                        var ftype1=$scope.bbb1;
                        if(('ng-binding ng-scope '+ftype+'ftype')==ftype1){
                            au_params[$scope.bbb].ftype0=true;
                            $scope.bbb1 = '';
                        }
                        var fname=$scope.aaa;
                        var fname1=$scope.aaa1;
                        if(('ng-binding ng-scope '+fname+'fname')==fname1){
                            au_params[$scope.aaa].fname0=true;
                            $scope.aaa1 = '';
                        }
                        var fid=$scope.ccc;
                        var fid1=$scope.ccc1;
                        if(('ng-binding ng-scope '+fid+'fid')==fid1){
                            au_params[$scope.ccc].fid0=true;
                            $scope.ccc1 = '';
                        }
                    }
                };

                //增加编辑框
                $scope.okclick0 = function(ev,i){
                    $scope.ccc=i;
                    $scope.ccc1=ev.currentTarget.className;
                };

                $scope.okclick = function(ev,i){
                    $scope.aaa=i;
                    $scope.aaa1=ev.currentTarget.className;
                };

                $scope.okclick1 = function(ev,i){
                    $scope.bbb1=ev.currentTarget.className;
                    $scope.bbb=i;
                };

                //全选和单选
                $scope.selected1 = [];
                $scope.draftSelectcheck = false;
                $scope.addtablealldelete = true;
                $scope.addtoggle2 = function () {
                    if ($scope.draftSelectcheck) {
                        $scope.selected1 = [];
                        $scope.addtablealldelete = true;
                    } else {
                        for (var i = 0; i < au_params.length; i++) {
                            $scope.selected1.push(au_params[i].option_id)
                        }
                        $scope.addtablealldelete = false;
                    }
                };
                $scope.addtoggle1 = function (item, list) {
                    var idx = list.indexOf(item);
                    if (idx > -1) list.splice(idx, 1);
                    else list.push(item);
                    if (list.length == au_params.length) {
                        $scope.draftSelectcheck = true;
                    } else {
                        $scope.draftSelectcheck = false;
                    }
                    if (list.length != 0) {
                        $scope.addtablealldelete = false;
                    } else {
                        $scope.addtablealldelete = true;
                    }
                };
                $scope.addexists1 = function (item, list) {
                    return list.indexOf(item) > -1;
                };
            }
        };

        //回调方法
        $scope.callback = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/workflow/workflow-dialog4.html',
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
                    $mdDialog.hide();
                };

                $scope.select_id='';
                $scope.showdelete=true;
                $scope.showlist=true;

                getdatasource();
                function getdatasource(){

                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/cb/list',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            form_id:item.id
                        },
                        dataType: 'json',
                        contentType: "application/json"
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                var goodsdata = data.data;
                                $scope.datainfo = goodsdata;
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
                $scope.newparms = function () {
                    $scope.params_callback = {
                        sys_id:sys_id,
                        model_id:item.model_id,
                        template_form_id:item.template_form_id,
                        id:'',
                        bean_id:'',
                        class_name:'',
                        model_name:item.model_name,
                        title:item.title
                    };
                    $scope.select_id='';
                    $scope.cdp_wf_params = [];
                    $scope.showlist=false;
                    au_params=[];
                    $scope.selected1=[];
                    $scope.draftSelectcheck = false;
                    $scope.addtablealldelete = true;

                    $scope.add_params = {method_desc:'',method_name:'',is_enabled:'Y',option:'add',option_id:''};
                    $scope.add_params.option_id = 0;
                    $scope.cdp_wf_params.push($scope.add_params);
                    au_params=[];
                    for(var i=0;i<$scope.cdp_wf_params.length;i++){
                        $scope.cdp_wf_params[i].fname0=false;
                        $scope.cdp_wf_params[i].ftype0=false;
                        $scope.cdp_wf_params[i].fid0=false;
                        if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                            au_params.push($scope.cdp_wf_params[i]);
                        }
                    }
                };

                //删除
                $scope.deleteparms11 = function () {
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/cb/del',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            //form_id:item.id,
                            id:$scope.select_id
                        },
                        dataType: 'json',
                        contentType: "application/json"
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                $scope.params_callback = {
                                    sys_id:sys_id,
                                    model_id:item.model_id,
                                    template_form_id:item.template_form_id,
                                    id:'',
                                    bean_id:'',
                                    class_name:'',
                                    model_name:item.model_name,
                                    title:item.title
                                };
                                $scope.select_id='';
                                $scope.cdp_wf_params = [];
                                $scope.showdelete=true;
                                $scope.showlist=true;
                                au_params=[];
                                $scope.selected1=[];
                                $scope.draftSelectcheck = false;
                                $scope.addtablealldelete = true;
                                getdatasource();
                                alert('删除成功！');
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

                //保存
                $scope.saveparms = function () {
                    var cdp_wf_params2=[];
                    var cdp_wf_params1={method_desc:'',method_name:'',is_enabled:'',option:'',id:''};
                    if($scope.cdp_wf_params !=''&& $scope.cdp_wf_params != undefined){
                        for(var i=0;i<$scope.cdp_wf_params.length;i++){
                            if($scope.cdp_wf_params[i].id == '' || $scope.cdp_wf_params[i].method_desc == '' || $scope.cdp_wf_params[i].method_name == '' ||$scope.cdp_wf_params[i].is_enabled == '' ){

                            }else{
                                cdp_wf_params1.id = $scope.cdp_wf_params[i].id;
                                cdp_wf_params1.method_desc = $scope.cdp_wf_params[i].method_desc;
                                cdp_wf_params1.method_name = $scope.cdp_wf_params[i].method_name;
                                cdp_wf_params1.is_enabled = $scope.cdp_wf_params[i].is_enabled;
                                cdp_wf_params1.option = $scope.cdp_wf_params[i].option;
                                cdp_wf_params2.push(cdp_wf_params1);
                                cdp_wf_params1={method_desc:'',method_name:'',is_enabled:'',option:'',id:''};
                            }
                        }
                    }

                    var data='';
                    if($scope.select_id ==''){
                        data={
                            form_id:item.id,
                            bean_id:$scope.params_callback.bean_id,
                            class_name:$scope.params_callback.class_name,
                            line:cdp_wf_params2
                        }
                    }else{
                        data={
                            form_id:item.id,
                            id:$scope.params_callback.id,
                            bean_id:$scope.params_callback.bean_id,
                            class_name:$scope.params_callback.class_name,
                            line:cdp_wf_params2
                        }
                    }

                    if(cdp_wf_params2 == []){
                        alert('请填写回调方法列表!')
                    }else{
                        var getconfig = {
                            method: 'POST',
                            url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/cb/save',
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
                            },
                            data:data,
                            dataType: 'json',
                            contentType: "application/json"
                        };
                        $http(getconfig)
                            .success(function(data, status, headers, config) {
                                $scope.content=headers('x-auth-token');
                                if($scope.content!=''&& $scope.content!=null){
                                    $cookies.put('JSESSION', $scope.content);
                                }
                                if(data.code=='0000'){
                                    alert('保存成功！');
                                    getdatasource();
                                    $scope.select_id = data.data.id;
                                    if($scope.select_id != ''){
                                        $scope.findparms($scope.select_id);
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
                };

                //查询
                $scope.findparms = function (id) {
                    $scope.select_id = id;
                    $scope.showdelete=false;
                    $scope.showlist=false;
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.CDPWORKFLOW_URL+'/wf/cb/show',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            //form_id:item.id,
                            id:id
                        },
                        dataType: 'json',
                        contentType: "application/json"
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){
                                $scope.params_callback.id = data.data.id;
                                $scope.params_callback.bean_id = data.data.bean_id;
                                $scope.params_callback.class_name = data.data.class_name;

                                $scope.cdp_wf_params = data.data.line;

                                for(var i=0;i<$scope.cdp_wf_params.length;i++){
                                    $scope.cdp_wf_params[i].option = 'update';
                                    $scope.cdp_wf_params[i].option_id = i;
                                }
                                getparams();

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

                $scope.params_callback = {
                    sys_id:sys_id,
                    model_id:item.model_id,
                    template_form_id:item.template_form_id,
                    id:'',
                    bean_id:'',
                    class_name:'',
                    model_name:item.model_name,
                    title:item.title
                };

                //获取字段信息
                var au_params=[];
                //getparams();
                function getparams(){
                    //$scope.cdp_wf_params = [
                    //    {field_id:'11',field_name:'11',field_type:'number',option:'update',option_id:'0',id:'1111'},
                    //    {field_id:'22',field_name:'22',field_type:'string',option:'update',option_id:'1',id:'2222'},
                    //    {field_id:'22',field_name:'22',field_type:'string',option:'update',option_id:'2',id:'3333'}
                    //];
                    for(var i=0;i<$scope.cdp_wf_params.length;i++){
                        $scope.cdp_wf_params[i].fname0=false;
                        $scope.cdp_wf_params[i].ftype0=false;
                        $scope.cdp_wf_params[i].fid0=false;
                        if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                            au_params.push($scope.cdp_wf_params[i]);
                        }
                    }
                }

                //添加字段
                $scope.addparms1 = function(){
                    $scope.selected1=[];
                    $scope.draftSelectcheck = false;
                    $scope.addtablealldelete = true;
                    $scope.add_params = {method_desc:'',method_name:'',is_enabled:'Y',option:'add',option_id:''};
                    $scope.add_params.option_id = $scope.cdp_wf_params.length;
                    $scope.cdp_wf_params.push($scope.add_params);
                    au_params=[];
                    for(var i=0;i<$scope.cdp_wf_params.length;i++){
                        $scope.cdp_wf_params[i].fname0=false;
                        $scope.cdp_wf_params[i].ftype0=false;
                        $scope.cdp_wf_params[i].fid0=false;
                        if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                            au_params.push($scope.cdp_wf_params[i]);
                        }
                    }
                };

                //删除字段
                $scope.deleteparms = function(){
                    for(var j=0;j<$scope.selected1.length;j++){
                        if($scope.cdp_wf_params[$scope.selected1[j]].option == 'update'){
                            $scope.cdp_wf_params[$scope.selected1[j]].option = 'delete';
                        }else if($scope.cdp_wf_params[$scope.selected1[j]].option == 'add'){
                            $scope.cdp_wf_params[$scope.selected1[j]].option = 'null';
                        }

                    }
                    $scope.selected1=[];
                    $scope.draftSelectcheck = false;
                    $scope.addtablealldelete = true;
                    au_params=[];
                    for(var i=0;i<$scope.cdp_wf_params.length;i++){
                        $scope.cdp_wf_params[i].fname0=false;
                        $scope.cdp_wf_params[i].ftype0=false;
                        $scope.cdp_wf_params[i].fid0=false;
                        if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                            au_params.push($scope.cdp_wf_params[i]);
                        }
                    }
                };

                //添加过滤器
                $scope.myFilter = function(item){
                    return item.option === 'update' || item.option === 'add';
                };

                //取消编辑框
                $scope.cancelclick = function (ev,num) {
                    if($scope.cdp_wf_params != null && $scope.cdp_wf_params != undefined){
                        au_params=[];
                        $scope.fid_repeat_error = false;
                        for(var i=0;i<$scope.cdp_wf_params.length;i++){
                            $scope.cdp_wf_params[i].fname0=false;
                            $scope.cdp_wf_params[i].ftype0=false;
                            $scope.cdp_wf_params[i].fid0=false;
                            $scope.cdp_wf_params[i].fiderror=false;
                            if($scope.cdp_wf_params[i].option == 'add' || $scope.cdp_wf_params[i].option == 'update'){
                                $scope.cdp_wf_params[i].fiderror=undefined;
                                au_params.push($scope.cdp_wf_params[i]);
                            }
                        }
                        for(var h=0;h<$scope.cdp_wf_params.length;h++){
                            for(var j=0;j<$scope.cdp_wf_params.length;j++){
                                if($scope.cdp_wf_params[h].method_name == $scope.cdp_wf_params[j].method_name){
                                    if(h != j){
                                        $scope.cdp_wf_params[h].fiderror = true;
                                        $scope.cdp_wf_params[j].fiderror = true;
                                        $scope.fid_repeat_error = true;
                                    }
                                }
                            }
                        }
                        var ftype=$scope.bbb;
                        var ftype1=$scope.bbb1;
                        if(('ng-binding ng-scope '+ftype+'ftype')==ftype1){
                            au_params[$scope.bbb].ftype0=true;
                            $scope.bbb1 = '';
                        }
                        var fname=$scope.aaa;
                        var fname1=$scope.aaa1;
                        if(('ng-binding ng-scope '+fname+'fname')==fname1){
                            au_params[$scope.aaa].fname0=true;
                            $scope.aaa1 = '';
                        }
                        var fid=$scope.ccc;
                        var fid1=$scope.ccc1;
                        if(('ng-binding ng-scope '+fid+'fid')==fid1){
                            au_params[$scope.ccc].fid0=true;
                            $scope.ccc1 = '';
                        }
                    }
                };

                //增加编辑框
                $scope.okclick0 = function(ev,i){
                    $scope.ccc=i;
                    $scope.ccc1=ev.currentTarget.className;
                    $scope.fid_repeat_error1 = true;
                };

                $scope.cancelsavedis = function(){
                    $scope.fid_repeat_error1 = false;
                };

                $scope.okclick = function(ev,i){
                    $scope.aaa=i;
                    $scope.aaa1=ev.currentTarget.className;
                };

                $scope.okclick1 = function(ev,i){
                    $scope.bbb1=ev.currentTarget.className;
                    $scope.bbb=i;
                };

                //全选和单选
                $scope.selected1 = [];
                $scope.draftSelectcheck = false;
                $scope.addtablealldelete = true;
                $scope.addtoggle2 = function () {
                    if ($scope.draftSelectcheck) {
                        $scope.selected1 = [];
                        $scope.addtablealldelete = true;
                    } else {
                        for (var i = 0; i < au_params.length; i++) {
                            $scope.selected1.push(au_params[i].option_id)
                        }
                        $scope.addtablealldelete = false;
                    }
                };
                $scope.addtoggle1 = function (item, list) {
                    var idx = list.indexOf(item);
                    if (idx > -1) list.splice(idx, 1);
                    else list.push(item);
                    if (list.length == au_params.length) {
                        $scope.draftSelectcheck = true;
                    } else {
                        $scope.draftSelectcheck = false;
                    }
                    if (list.length != 0) {
                        $scope.addtablealldelete = false;
                    } else {
                        $scope.addtablealldelete = true;
                    }
                };
                $scope.addexists1 = function (item, list) {
                    return list.indexOf(item) > -1;
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

    angular._LoadModule('workflow');
    return test;
});