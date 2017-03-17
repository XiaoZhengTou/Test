define(['angular'], function(angular) {
	var governList = angular.module("list",[]);
	publicFunction.addStyle('md-data-table.min.css');
	governList.controller("governListCtrl",['$scope',function($scope){

		$scope.query = {
			order: 'name',
			limit: 10,
			page: 1,
			reason_desc: null,
			apply_name: null,
			begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
			end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
			order_status: null,
			fee_apply_code: null,

		};
		$scope.selected=[];

		$scope.stateFlag = true;
		$scope.state = function(){
			if($scope.stateFlag){
				$scope.stateFlag = false;
			}else{
				$scope.stateFlag = true;
			};
		};
		
	}]);
});
