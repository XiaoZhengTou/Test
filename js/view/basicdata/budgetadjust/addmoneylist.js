/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular','js/view/basicdata/budgetadjust/addmoneytable.js','js/view/basicdata/budgetadjust/addmoneyprocess.js'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('addmoneylist', ['addmoneytable','addmoneyprocess']);
    test.config(function ($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.defaults.timeout = 5000;
        $routeProvider
            .when('/addbudget_money_table', {
                templateUrl:  'view/basicdata/budgetadjust/addmoneytable.html'
            })
            .when('/addbudget_money_process', {
                templateUrl: 'view/basicdata/budgetadjust/addmoneyprocess.html'
            })
            .otherwise({
                redirectTo: '/addbudget_money_list'
            });
    })
    test.controller('addmoneylistCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
                adjust_apply_code: '',
                order_status: '',
                order_type: 'BESIDE_BUDGET',
                adjust_desc: ''
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:'',
            adjust_apply_code: '',
            order_status: '',
            order_type: 'BESIDE_BUDGET',
            adjust_desc: ''
        };
        //搜索
        $scope.search_addmoneylist = function(){
            if($scope.query.limit != undefined){
                $scope.query.page = '1';
                getapp1();
            }
        };

        getapp1();
        function getapp1(){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL + '/bm/EmsBmAdjustApplyH/listMyAdjustApply',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "page_number": parseInt($scope.query.page),
                    "page_size": parseInt($scope.query.limit),
                    query_param:{
                        adjust_apply_code:$scope.query.adjust_apply_code == ''? undefined:$scope.query.adjust_apply_code,
                        order_status:$scope.query.order_status == ''? undefined:$scope.query.order_status,
                        order_type:$scope.query.order_type == ''? undefined:$scope.query.order_type,
                        reason_desc:$scope.query.adjust_desc == ''? undefined:$scope.query.adjust_desc
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
        $scope.add = function() {
            $location.path("/addbudget_money_table").search('status','add')
        };

        //编辑
        $scope.edit = function(item) {
            $location.path("/addbudget_money_table").search('status','edit').search('adjustid',item.adjust_apply_h_id)
        };

        //详情
        $scope.show = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budgetadjust/addmoneylist-dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {

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

                $scope.answer = function(answer,amount) {
                    $mdDialog.hide(answer);
                };

                $scope.addmoneylist = {
                    adjust_apply_h_id:item.adjust_apply_h_id,
                    adjust_apply_code:item.adjust_apply_code,
                    adjust_desc:item.adjust_desc,
                    apply_date:item.apply_date,
                    apply_name:item.apply_name,
                    org_name:item.org_name,
                    order_status:item.order_status
                };

                getapp2();
                function getapp2(){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL + '/bm/EmsBmAdjustApplyH/getAdjustApply',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            adjust_apply_h_id:item.adjust_apply_h_id
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.appdata = data.data.emsbmadjustapplyh.emsbmadjustapplyls;
                                $scope.budget_name1 = data.data.emsbmadjustapplyh.budget_name;

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
    });


    angular._LoadModule('addmoneylist');
    return test;
});