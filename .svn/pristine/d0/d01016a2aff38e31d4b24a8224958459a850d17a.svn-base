/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('rnorm', []);
    test.controller('rnormCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q, $log,$mdToast,$location){

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
                expense_std_code:'',
                control_flag:'',
                org_name:'',
                confirm_status:''
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
            expense_std_code:'',
            control_flag:'',
            org_name:'',
            confirm_status:''
        };

        //搜索
        $scope.search_rnorm = function(){
            getapp1('1',$scope.pagesize);
        };

        //跳转到标准维护增加
        $scope.tornormdetail_add = function (item) {
            $location.path("/rnormdetail").search('rnormdetail_add',item)
        };

        //跳转到标准维护编辑
        $scope.tornormdetail_edit = function (item) {
            $location.path("/rnormdetail").search('rnormdetail_edit',item)
        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/sm/EmsSmExpenseStdH/pageQueryHead',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    pageNumber:parseInt($scope.query.page),
                    pageSize:parseInt($scope.query.limit),
                    "query_param": {
                        expense_std_code:$scope.search.expense_std_code == ''? undefined:$scope.search.expense_std_code,
                        control_flag:$scope.search.control_flag == ''? undefined:$scope.search.control_flag,
                        org_name:$scope.search.org_name == ''? undefined:$scope.search.org_name,
                        confirm_status:$scope.search.confirm_status == ''? undefined:$scope.search.confirm_status
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

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    test.controller('rnormCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('rnorm');
    return test;
});