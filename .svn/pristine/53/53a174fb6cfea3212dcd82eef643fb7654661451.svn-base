/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('budgeteditlist', []);
    test.controller('budgeteditlistCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
                budget_name: '',
                budget_templet_id: '',
                budget_status: '',
                interval_name: '',
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
            budget_name: '',
            budget_templet_id: '',
            budget_status:'',
            interval_name:'',
            invalid_date: null,
            valid_date: null
        };
        //搜索
        $scope.search_budgeteditlist = function(){
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
                url:  APP_CONFIG.SMART_URL+'/' + 'bm/EmsBmBudgetH/pageQuery',
                //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "page_number": parseInt($scope.query.page),
                    "page_size": parseInt($scope.query.limit),
                    query_param:{
                        budget_name:$scope.query.budget_name == ''? null:$scope.query.budget_name,
                        budget_templet_name:$scope.query.budget_templet_id == ''? null:$scope.query.budget_templet_id,
                        budget_status:$scope.query.budget_status == ''? null:$scope.query.budget_status,
                        interval_name:$scope.query.interval_name == ''? null:$scope.query.interval_name,
                        invalid_date:$scope.query.invalid_date == null? null:invalid_date,
                        valid_date:$scope.query.valid_date == null? null:valid_date
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
                        $scope.query.total = data.data.page.totalRow;
                        $scope.query.limit = data.data.page.pageSize;
                        $scope.query.page = data.data.page.pageNumber;

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

        //预算模板
        getbudgetlist11();
        function getbudgetlist11(){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/pageLike',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:1,
                    page_size:10000
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.getquerybudgetlist=data.data.info;

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

        //编辑
        $scope.edit = function(item) {
            $location.path("/budget_edit_list_edit").search('budget_edit_list_edit_detail',item.budget_headers_id).search('budget_templet_id',item.budget_templet_id)
        };
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });


    angular._LoadModule('budgeteditlist');
    return test;
});