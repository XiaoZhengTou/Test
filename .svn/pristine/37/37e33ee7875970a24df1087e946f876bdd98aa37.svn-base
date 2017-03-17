define(['angular','js/shared/process.js'], function(angular) {
    var shenpi = angular.module('shenpi', ['angularMoment','mdproceslist']);
    shenpi.controller('jkShenpiCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
    	// 初始化选择项开始
        $scope.shenpi = jhkPublic.ShenPi;
        // 启动流程结束
        // 下一步开始
        $scope.next = function(){
            console.log($scope.shenpi.processlsit);
            var list = $scope.shenpi.processlsit;
            var currentUser = publicFunction.localGet("user")['data']['user'];
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
                "mustModifyHandler": {},
            }
            for(var i = 0; i < list.length; i++) {
                    var node_name = list[i].fdNodeId;
                    form.mustModifyHandler[node_name] = '';
                    //判断"起草"节点，设置为默认登录的用户
                    if(list[i].fdProessType.indexOf('起草') > -1) {
                        form.mustModifyHandler[node_name] = currentUser['userId'];
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
                url: feelapplyUrl + '/wf/process/submit',
                data: form
            }).success(function(data, status, headers, config){
                    console.log(data);
                    if(data.code == "0000") {
                        console.log('提交流程成功');
                        $scope.go('/jiehuankuan/jiekuan');
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
        }
        // 下一步结束
	});
})