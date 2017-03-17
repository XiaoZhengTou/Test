/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    var test = angular.module('editprocesslist', []);
    test.controller('editprocesslistCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
            total:'',
            adjust_apply_code: '',
            order_status: '',
            order_type: '',
            adjust_desc: ''
        };
        //搜索
        $scope.search_editprocesslist = function(){
            if($scope.query.limit != undefined){
                $scope.query.page = '1';
                getapp1();
            }
        };

        getapp1();
        function getapp1(){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+'/' + 'bm/EmsBmAdjustApplyH/listMyAdjustApply',
                //url:  APP_CONFIG.SMART_URL+'/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
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
                        adjust_desc:$scope.query.adjust_desc == ''? undefined:$scope.query.adjust_desc
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

        //新增
        $scope.add = function() {
            $location.path("/editbudget_process_table").search('status','add')
        };

        //编辑
        $scope.edit = function(item) {
            $location.path("/editbudget_process_table").search('status','edit').search('order_status','edit').search('adjustid','adjust_apply_h_id')
        };

        //详情
        $scope.show = function(ev,item) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController22,
                templateUrl: 'templates/basicdata/budgetadjust/editprocesslist-dialog1.html',
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

                $scope.editprocesslist = {
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
                        url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmAdjustApplyH/getAdjustApply',
                        //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
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
    });


    angular._LoadModule('editprocesslist');
    return test;
});