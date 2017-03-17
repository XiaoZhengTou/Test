define(['angular','js/shared/organization.js','js/shared/currency.js'], function(angular) {
	var taskPoolHome = angular.module("taskPoolHome",['mdorganization','mdcurrency']);
	taskPoolHome.controller("taskPoolCtrl",function($scope,$http,$filter,taskPublic){
		$scope.taskStates = [
		{name:"待派组",id:"UNALLOTED"},
		{name:"待派工",id:"UNASSIGNED"},
		{name:"待处理",id:"UNHANDLED"},
		{name:"已驳回",id:"REJECTED"},
		{name:"申请撤回",id:"WITHDRAWING"},
		{name:"已撤回",id:"WITHDRAWN"},
		{name:"沟通中",id:"COMMUNICATING"},
		{name:"已完成",id:"FINISHED"},
		{name:"作废",id:"INVALID"}];
		$scope.basis = ["待分配","待派工","待处理","已驳回","等待","已通过"];
		   
		//获取单据类型
		$http({ 
			method: 'POST',
            url: APP_CONFIG.huisuanzhang + '/task/SsTmBillType/pageQuery',
            noLoader : true,
			data: {
				query_param:{		
				}
			},
		}).success(function(data, status, headers, config) {
			
			console.log(data)
			$scope.bills = data.data.info;
		});
       //改变时间格式
	   	$scope.data = function(chooseTime){
		   if(chooseTime){
			   	var date = new Date(chooseTime);
			    var year = date.getFullYear();
			    var month = date.getMonth()+1;   
			    var date1 = date.getDate(); 
				return year+"-"+month+"-"+date1;
		   }
		}
       
       
       	$scope.packUpFlag = true;
       	$scope.packUp =function(){
       		if($scope.packUpFlag){
       			$scope.packUpFlag = false;
       		}else{
       			$scope.packUpFlag = true;
       		}
       	}
       	
       	var noParameters = {
       		query_param:{
						
					}
       	};
       	
	   $scope.load = function(parameter){
       		$http({ 
       			method: 'POST',
                url: APP_CONFIG.huisuanzhang + 'task/SsTmTaskPool/pageQuery',
                noLoader : true,
                data : parameter    
			}).success(function(data, status, headers, config) {
				console.log(data);
				$scope.datas=data.data.info;
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
       	}
       	$scope.load(noParameters);
       	
       	$scope.refer = function(){
       		//判断是否选择当前处理人
       		if($scope.orgs != undefined){
       		 $scope.bill_type_code = $scope.orgs.user_full_name;
       		};	
       		//判断是否选择币种
       		if($scope.emslmloan != undefined){
       		 	$scope.bill_type_code = $scope.emslmloan.order_type4;
       		};
       		
       		//请求参数
       		var aParameter  = {
				query_param:{
					bill_code:$scope.bill_code,
					bill_desc:$scope.bill_desc,
					task_status:$scope.task_status,
					start_amount:$scope.start_amount,
					end_amount:$scope.end_amount,
					currency_code:$scope.currency_code,
					bill_type_code:$scope.bill_type_code,
					source_system:$scope.source_system,
					operator_name:$scope.operator_name,
					emergent_level:$scope.emergent_level,
					start_in_time:$scope.data($scope.start_in_time),
					start_finished_time:$scope.data($scope.start_finished_time),
					end_in_time:$scope.data($scope.end_in_time),
					end_finished_time:$scope.data($scope.end_finished_time)
					
				}
			};
       		$scope.load(aParameter);
       		
       	}
       	
       	$scope.selected = [];
       	$scope.selectedFlag = true;
       	taskPublic.selected = $scope.selected;
       	$scope.onGoList = function(){
       		if($scope.selected.length > 0){
       			$scope.selectedFlag = true;
       			$scope.go('/taskPool/list');	
       		}else{
       				$scope.selectedFlag = false;
       		}
       	}
       	
    });
	
});	