define(['angular'], function(angular) {
	var governList = angular.module("list",[]);
	publicFunction.addStyle('md-data-table.min.css');
	governList.controller("governListCtrl",['$scope','governPublic','$http',function($scope,governPublic,$http){
		
		$scope.payOrderType = [
			{name:"预付款/个人借款",id:"ADVANCE"},
			{name:"付款",id:"NOR_PAY"},
			{name:"虚拟付款",id:"VIRTUAL_PAY"},
			{name:"主扣付款",id:"PENALTY_PAY"},
		];
		
		
		$scope.disabledFlag = false;
		if(governPublic.loan_info_id != undefined){
			$scope.disabledFlag = true;
			var aParameters = {
		   		loan_info_id:governPublic.loan_info_id,
	       	};
       	
       	//获取数据
		   	$scope.load = function(parameter){
	       		$http({ 
	       			method: 'POST',
	                url: APP_CONFIG.huisuanzhang + 'pay/SsLmLoan/getSsLmLoanInvoice',
	                //url: 'http://10.73.8.33:8080/smart-accounting-web/pay/SsLmLoan/pageQuery/loan_info_id',
	                noLoader : true,
	                data : parameter    
				}).success(function(data, status, headers, config) {
					$scope.datas = data.data.info;
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
	       	}
	       	$scope.load(aParameters);
		}else{
			
		}
		
		
	
		
	}]);
});
