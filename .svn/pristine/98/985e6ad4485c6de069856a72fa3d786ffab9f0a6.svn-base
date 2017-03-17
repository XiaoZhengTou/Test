/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular','js/shared/process.js'], function (angular) {
    var test = angular.module('addmoneyprocess', ['mdproceslist']);
    test.controller('addmoneyprocessCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog,busiorgPublic){

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
        //var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
        //    if($location.search().adjustid1 != null && $location.search().adjustid1 != undefined){
        //        adjust_apply_h_id=$location.search().adjustid1;
        //    }else{
        //        window.location.href="http://localhost:63342/pc-mi-admin/index.html#/addbudget_money_list"
        //    }
        //});
        $scope.shenpi = busiorgPublic.ShenPi;

        // 下一步开始
        $scope.next = function(ev){
            console.log($scope.shenpi.processlsit);
            var list = $scope.shenpi.processlsit;
            //var currentUser = publicFunction.localGet("user")['data']['user'];
            // 判断是否可以进行下一步操作
            if(!$scope.shenpi.forminstanceid || !$scope.shenpi.formid || !$scope.shenpi.modelid) {
                return;
            }
            // 判断有没有选择审批人
            for(var u in list) {
                if(list[u].prosenlist == 0){
                    return;
                }
            }
            // 数据拼接开始
            var processnode = [];
            var form = {
                "formInstanceId": $scope.shenpi.forminstanceid,
                "template_form_id": $scope.shenpi.formid,
                "model_id": $scope.shenpi.modelid,
                "mustModifyHandler": {}
            };
            for(var i = 0; i < list.length; i++) {
                var node_name = list[i].fdNodeId;
                form.mustModifyHandler[node_name] = '';
                //判断"起草"节点，设置为默认登录的用户
                if(list[i].fdProessType.indexOf('起草') > -1) {
                    form.mustModifyHandler[node_name] = publicFunction.localGet("user")['data']['user']['userId'];
                } else {
                    var struserid = [];
                    for(var j in list[i].prosenlist) {
                        struserid.push(list[i].prosenlist[j].user_id);
                    }
                    form.mustModifyHandler[node_name] = struserid.join(',');
                }
            }
            // 数据拼接结束
            console.log(form);
            $http({
                method: 'POST',
                url: APP_CONFIG.SMART_URL+ '/wf/process/submit',
                data: form,
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                }
            }).success(function(data, status, headers, config){
                console.log(data);
                if(data.code == "0000") {
                    var confirm = $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .textContent('提交成功')
                        .clickOutsideToClose(false)
                        .targetEvent(ev)
                        //.ok('再来一笔')
                        .ok('关闭');
                    $mdDialog.show(confirm).then(function() {
                        window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/addbudget_money_list"
                    }, function() {
                        window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/addbudget_money_list"
                    });
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.body))
                            .clickOutsideToClose(true)
                            .title('提交结果')
                            .textContent('异常:' + data.msg + "(" + data.code + ")")
                            .ariaLabel('提交结果')
                            .ok('关闭')
                    );
                }
                console.log(data);
            }).error(function(data, status, headers, config) {
                console.log('opiioio');

            });
        };
        // 下一步结束

    });


    angular._LoadModule('addmoneyprocess');
    return test;
});