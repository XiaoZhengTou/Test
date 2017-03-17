define(['angular'], function(angular) {
    var view = angular.module('view', ['angularMoment']);
    view.controller('yfkViewCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
    	   $scope.detail = jhkPublic.View;
    	   $scope.del = function(ev,x){
    	   		var confirm = $mdDialog.confirm()
                .title('确定要删除吗？')
                .textContent('你确定要删除多张借款单吗？这将会从服务器上删除你选定的借款单数据。')
                .ariaLabel('删除确认')
                .targetEvent(ev)
                .ok('是的')
                .cancel('取消');
                $mdDialog.show(confirm).then(function() {
	                var delConf = {
	    	   			method: 'POST',
		                url: feelapplyUrl + 'lm/loan/deleteLoan',
		                noLoader : true,
		                data : {
		                	"tenant_id": '11',
							"user_id": '11',
							"loan_info_id": x
		                }
					};
                    $http(delConf).success(function(response){
                        if (response.code == '0000') {
                            $scope.go('/jiehuankuan/jiekuan/');
                        }else{
                            console.log(response.msg);
                        }
                    });
                    // 批量删除结束
                }, function() {
                  $scope.status = 'You decided to keep your debt.';
                });
    	   	
    	    }
            // 申请流程开始
            $scope.next = function(){
                // 检验配置开始
                var loadid = $scope.detail.loan_info_id;
                var jyconfig = {
                    method: 'POST',
                    url: feelapplyUrl + 'lm/loan/checkLoan',
                    data : {
                        "tenant_id": 11,
                        "user_id": 11,
                        "loan_info_id" : loadid
                    }
                };
                // 校验配置结束
                $http(jyconfig).success(function(response){
                    if (response.code == '0000') {
                        console.log("校验成功！");
                        $scope.NextText = "数据校验通过，开始启动流程……";
                        var lcconfig =  {
                            method: 'POST',
                            url: feelapplyUrl + 'lm/loan/startLoan',
                            data : {
                                "tenant_id": 11,
                                "user_id": 11,
                                "loan_info_id": loadid,
                                "process_def_id": 11,
                                "process_def_name": "11"
                            }
                        };
                        $http(lcconfig).success(function(response){
                            if (response.code == '0000'){
                                console.log("流程启动成功！");
                                $scope.NextText = "流程启动成功！";
                                $scope.go("/jiehuankuan/jiekuan/shenpi",'选择审批人');
                            }
                        });
                    }
                }).error(function(response){
                    console.log('校验失败!') ;
                });
            };
           // 申请流程结束
	});
})