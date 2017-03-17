/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    var test = angular.module('addmoneyshow', []);
    test.controller('addmoneyshowCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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
            largeEditDialog: true
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
            apply_date: null,
            adjust_desc: ''
        };

        $scope.appdata = [];
        $scope.deletedata = [];

        var adjust_apply_h_id='';
        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().status != null && $location.search().status != undefined){
                if($location.search().status == 'add'){

                }else if($location.search().status == 'edit'){
                    if($location.search().order_status == 'edit'){

                    }else if($location.search().order_status == 'edit'){

                    }
                    adjust_apply_h_id=$location.search().adjustid;
                    getapp1();
                }
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/addbudget_money_list"
            }


        });

        function getapp1(){
            if(adjust_apply_h_id == ''){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/addbudget_money_list"
            }else{
                var getconfig = {
                    method: 'POST',
                    url:  APP_CONFIG.SMART_URL + '/bm/EmsBmAdjustApplyH/getAdjustApply',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data: {
                        adjust_apply_h_id:adjust_apply_h_id
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&& $scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){
                            var aa= data.data.emsbmadjustapplyh.emsbmadjustapplyls;
                            for(var i=0;i<aa.length;i++){
                                aa[i].status = 'old';
                            }
                            $scope.appdata = data.data;
                            $scope.query.adjust_desc = data.data.emsbmadjustapplyh.adjust_desc;

                            var apply_date='';
                            if(data.data.emsbmadjustapplyh.apply_date != null && data.data.emsbmadjustapplyh.apply_date != undefined){
                                apply_date=data.data.emsbmadjustapplyh.apply_date.toString();
                                apply_date =  apply_date.replace(/-/g,"/");
                                $scope.query.apply_date = apply_date;
                            }else{
                                $scope.query.apply_date = null;
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

        $scope.back = function (){
            $location.path("/addbudget_money_list")
        };
    });


    angular._LoadModule('addmoneyshow');
    return test;
});