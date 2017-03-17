define(['angular'], function(angular) {
    var view = angular.module('view', ['angularMoment']);
    view.controller('jkViewCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
    	   $scope.detail = jhkPublic.View;
    	   $scope.images = [];
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
    	   
    	   //加载单据附件列表
    	   $http.get("http://10.16.30.77:8080/sdatt/attachment/getAttList/" + $scope.detail.loan_info_id).success(function(response){
    	   		if(response.data.attVersion !== null && response.data.attVersion !== undefined){
	    			for(var i in response.data.attVersion.AttPic){
			   			$scope.images.push({
				   			image_id: response.data.attVersion.AttPic[i].image_id,
				   			filePath: yingxiangUrl+'encrypt/thumbnail/'+ response.data.attVersion.AttPic[i].image_id
				   		});
				   }
	    		}
    	   });
    	   
    	   
    	   
    	   
    	   
            // 申请流程开始
            $scope.next = function(){
                // 检验配置开始
                var loadid = $scope.detail.loan_info_id;
                var jyconfig = {
                    method: 'POST',
                    url: feelapplyUrl + 'lm/loan/checkLoan',
                    data : {
                        // "tenant_id": 11,
                        // "user_id": 11,
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
                                // "tenant_id": 11,
                                // "user_id": 11,
                                "loan_info_id": loadid,
                                "process_def_id": 11,
                                "process_def_name": "11"
                            }
                        };
                        $http(lcconfig).success(function(response){
                            if (response.code == '0000'){
                                jhkPublic.ShenPi.forminstanceid = $scope.detail.formInstanceId;
                                jhkPublic.ShenPi.formid = $scope.detail.form_template_id;
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