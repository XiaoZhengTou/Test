/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    var test = angular.module('editprocessprocess', []);
    test.controller('editprocessprocessCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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

        var adjust_apply_h_id='';
        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().adjustid1 != null && $location.search().adjustid1 != undefined){
                adjust_apply_h_id=$location.search().adjustid1;
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/editbudget_process_list"
            }
        });

        //下一步
        $scope.next_list = function(ev){
            var confirm = $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .textContent('提交成功')
                .clickOutsideToClose(false)
                .targetEvent(ev)
                //.ok('再来一笔')
                .ok('关闭');
            $mdDialog.show(confirm).then(function() {
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/editbudget_process_list"
            }, function() {
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/editbudget_process_list"
            });
        };

    });


    angular._LoadModule('editprocessprocess');
    return test;
});