/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('processauthadmin', []);
    test.controller('processauthadminCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q,$mdToast,$location){

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
                form_type:'',
                order_type:'',
                mainorg_layer:'',
                fee_type_id:'',
                status:'ALL'
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        $scope.search = {
            form_type:'',
            order_type:'',
            mainorg_layer:'',
            fee_type_id:'',
            status:'ALL'
        };

        //搜索
        $scope.search_processauthadmin = function(){
            getapp1('1',$scope.pagesize);
        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                //url: APP_CONFIG.JIEBAO_URL+'/cm/prsbranch/like_jtzk',
                url: 'http://10.73.37.47:8080/smart-expense-web/cm/prsbranch/like_jtzk',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    query_param:{
                        form_type:$scope.search.form_type == ''? undefined:$scope.search.form_type,
                        order_type:$scope.search.order_type == ''? undefined:$scope.search.order_type,
                        mainorg_layer:$scope.search.mainorg_layer == ''? undefined:$scope.search.mainorg_layer,
                        fee_type_name:$scope.search.fee_type_id == ''? undefined:$scope.search.fee_type_id,
                        status:$scope.search.status == 'ALL'? undefined:$scope.search.status,
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

        $scope.addyewu = function () {
            $location.path("/processauthyewu").search('status','add')
        };

        $scope.edityewu = function (item) {
            $location.path("/processauthyewu").search('status','edit').search('item',item)
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
                //url: APP_CONFIG.SMART_URL+'/cm/prsbranch/batchDisable',
                url: 'http://10.73.37.47:8080/smart-expense-web/cm/prsbranch/batchDisable',
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

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('processauthadmin');
    return test;
});