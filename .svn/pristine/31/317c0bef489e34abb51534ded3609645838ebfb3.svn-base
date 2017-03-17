/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular','js/shared/ruzhangdanwei.js'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('placerule', ['md.ruzhangdanwei']);
    test.controller('placeruleCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q,$mdToast){

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
                workitem_mask_name:'',
                participant_name:'',
                main_org_name:'',
                company_name:'',
                status:'ALL'
            };
            $scope.ruzhangdanwei1 = {};
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
            workitem_mask_name:'',
            participant_name:'',
            main_org_name:'',
            company_name:'',
            status:'ALL'
        };
        $scope.ruzhangdanwei1 = {};
        $scope.appdata = [];
        $scope.appdata1 = [];

        //搜索
        $scope.search_placerule = function(){
            getapp1();
        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.SMART_URL+'/cm/CmEmsPrsOrgR/like',
                url: 'http://10.73.37.57:8080/smart-expense-web/cm/CmEmsPrsOrgR/like',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    "query_param":{
                        workitem_mask_name:$scope.search.workitem_mask_name == ''? undefined:$scope.search.workitem_mask_name,
                        participant_name:$scope.search.participant_name == ''? undefined:$scope.search.participant_name,
                        main_org_name:$scope.search.main_org_name == ''? undefined:$scope.search.main_org_name,
                        company_name:$scope.ruzhangdanwei1.company_name == undefined? undefined:$scope.ruzhangdanwei1.company_name,
                        status:$scope.search.status == 'ALL'? undefined:$scope.search.status
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

        //获取预算部门
        $scope.getbusiorg = function(id,item){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/queryChild',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:1,
                    page_size:10000,
                    enable_flag:'Y',
                    parent_org_id:id
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        item.busi_org_id = '';
                        item.busiorgchildren = data.data.info;

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

        //获取预算主体
        getbusiorga();
        function getbusiorga(){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/queryMain',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:1,
                    page_size:10000,
                    enable_flag:'Y'
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.busiorg = data.data.info

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

        //获取审批节点
        getctype();
        function getctype(){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.CDP_URL+'/docker/dictitem/getItemsByCode?code=WORKITEM_MASK',
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

                        $scope.ctype = data.data

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

        //获取默认入账单位
        getDefaultCompany();
        function getDefaultCompany(){
            var getconfig = {
                method: 'GET',
                url:  APP_CONFIG.SMART_URL+ '/cm/userCenter/getDefaultConfig',
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
                        $scope.ruzhangdanwei = data.data.company;

                    }else if(data.code=='6666'){

                    }else{
                        //alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        }

        $scope.addtrip1 = function(){
            $scope.appdata.splice(0,0,{
                workitem_mask:'',
                busi_org_id:'',
                company_id:'',
                //rule_id:'',
                main_org_id:'',
                ruzhangdanwei:{},
                busiorgchildren:[],
                person:[],
                participant_ids:'',
                type:'added'
            });
            $scope.appdata1.push('add');
        };

        $scope.changeid = function (item) {
            item.participant_ids = '';
            for(var j=0;j<item.person.length;j++){
                if(j==0){
                    item.participant_ids = item.person[0].person_id
                }else{
                    item.participant_ids = item.participant_ids +','+item.person[j].person_id
                }
            }
        };

        $scope.addperson = function(ev,item) {
            $mdDialog.show({
                controller: DialogController4,
                templateUrl: 'templates/shared/organization4.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(answer) {
                //截取传过来的ng-model
                //$parse(modeldata.model).assign(scope, answer);
                if (answer) {
                    var aa=true;
                    for(var i=0;i<item.person.length;i++){
                        if(answer.user_id == item.person[i].person_id){
                            aa = false
                        }
                    }
                    if(aa == true){
                        item.person.push({
                            person_id:answer.user_id,
                            person_name:answer.user_full_name
                        })
                    }
                    item.participant_ids = '';
                    for(var j=0;j<item.person.length;j++){
                        if(j==0){
                            item.participant_ids = item.person[0].person_id
                        }else{
                            item.participant_ids = item.participant_ids +','+item.person[j].person_id
                        }
                    }
                }
            }, function() {

            });
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

            $scope.getDate = function(pid) {
                // pid=(pid==null?"":pid;
                console.log(pid);
                var url = APP_CONFIG.CDP_URL+'/docker/tenantorg/queryOrgUsersByOrgId?org_id=' + pid;
                //console.log(publicmodel.Token);
                //$http.defaults.headers.common["x-auth-token"] = publicmodel.TokenOrg;
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'x-auth-token':$cookies.get("JSESSION")
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

            };
            $scope.getDate("");
            $scope.onSearch = function(key) {
                if (key) {
                    key = encodeURIComponent(encodeURIComponent(key));
                    if (key) {
                        var url = APP_CONFIG.CDP_URL+'/docker/userinfo/queryUserListByName?user_name=' + key;
                        console.log(url);
                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'x-auth-token':$cookies.get("JSESSION")
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

        $scope.save = function(){
            var aa='';
            var bb=[];
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].type == 'added'){
                    //aa.push($scope.appdata[i])
                    for(var j=0;j<$scope.appdata[i].person.length;j++){
                        bb.push({
                            "_state":"added",
                            "participant_id":$scope.appdata[i].person[j].person_id,
                            "participant_name":$scope.appdata[i].person[j].person_name
                        });
                    }
                    aa={
                        "cmemsprsorgr":{
                            "workitem_mask":$scope.appdata[i].workitem_mask,
                            "main_org_id":$scope.appdata[i].main_org_id,
                            "busi_org_id":$scope.appdata[i].busi_org_id,
                            "company_id":$scope.appdata[i].ruzhangdanwei.company_id,
                            "cmemsprsorgrls":bb
                        }
                    }
                }
            }

            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.SMART_URL+'/cm/CmEmsPrsOrgR/save',
                url: 'http://10.73.37.57:8080/smart-expense-web/cm/CmEmsPrsOrgR/save',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:aa
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('保存成功')
                                .position('top right')
                                .hideDelay(1500)
                        );
                        console.log(aa);
                        $scope.appdata1 = [];
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

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        $scope.batch_failure = function(){
            console.log("parent", $scope.selected1);
            var ids=[];
            for(var i=0;i<$scope.selected1.length;i++){
                if($scope.selected1[i].status == '1'){
                    ids.push(($scope.selected1[i].id));
                }
            }
            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.SMART_URL+'/cm/CmEmsPrsOrgR/batchDisable',
                url: 'http://10.73.37.57:8080/smart-expense-web/cm/CmEmsPrsOrgR/batchDisable',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    ids:ids
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        $scope.selected1 = [];
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

        //完整性检查
        $scope.gettest = function(){
            var getconfig = {
                method: 'GET',
                //url: APP_CONFIG.SMART_URL+'/cm/CmEmsPrsOrgR/checkPerfect',
                url: 'http://10.73.37.57:8080/smart-expense-web/cm/CmEmsPrsOrgR/checkPerfect',
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

                        alert('检查成功！');

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

    angular._LoadModule('placerule');
    return test;
});