define(['angular'], function(angular) {
	var taskPoolList = angular.module("taskPoolList",[]);
	taskPoolList.controller("taskPoolListCtrl",function($scope,taskPublic,$http){
		
		
		var noParameters = {
       		query_param:{
						 status:"Y",
					}
       	};
       	
	  	$scope.load = function(parameter){
       		$http({ 
       			method: 'POST',
                url: APP_CONFIG.huisuanzhang + 'task/SsTmTaskGroup/pageQuery',
                noLoader : true,
                data : parameter    
			}).success(function(data, status, headers, config) {
				console.log(data);
				$scope.datas=data.data.datalist;
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
       	};
       	$scope.load(noParameters);
       	
       	$scope.refer = function(){
       		var aParameter  = {
				query_param:{
					task_group_name:$scope.task_group_name,
					station:$scope.station	
				}
			};
       		$scope.load(aParameter);
       		
       	};
       	
       	$scope.checked = [];
       	$scope.task_group_id = $scope.checked[0];
       	$scope.selectedFlag = true;
       	$scope.save = function(){
       		if($scope.checked.length == 1){
       			$scope.selectedFlag = true;
       			$http({ 
	       			method: 'POST',
	                url: APP_CONFIG.huisuanzhang + 'task/SsTmTaskPool/assignTaskToGroup',
	                noLoader : true,
	                data : {
	                	task_group_id:$scope.task_group_id,
	                	task_ids:taskPublic.selected
	                }
				}).success(function(data, status, headers, config) {
					console.log(data);
					$scope.go("/taskPool")
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
       		}else{
       			$scope.selectedFlag = false;
       		}
       		
       	}
	
    });
	
});	