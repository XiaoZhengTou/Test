define(['angular'], function(angular) {
	var taskSendHome = angular.module("taskSendHome",[]);
	taskSendHome.controller("taskSendHomeCtrl",function($scope){
		$scope.currencys = ["人民币","美元","港币","日元","欧元","英镑"];
		$scope.basis = ["待分配","待派工","待处理","已驳回","等待","已通过"];
		$scope.bills = ["EC","EA","LM","PA"];
		$scope.lenghts = ["1","2","3","4","5","6"];
		
		//设置入池时间
	    $scope.poolBegin =  new Date();
       	$scope.poolEnd =  new Date();
       	//设置申请日期
	    $scope.applyBegin =  new Date();
       	$scope.applyEnd =  new Date();
       	//设置完成日期
	    $scope.completeBegin =  new Date();
       	$scope.completeEnd =  new Date();
       	
       	$scope.packUpFlag = true;
       	$scope.packUp =function(){
       		if($scope.packUpFlag){
       			$scope.packUpFlag = false;
       		}else{
       			$scope.packUpFlag = true;
       		}
       	}
    });
	
});	