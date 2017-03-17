define(['angular'], function(angular) {
	var EA_list = angular.module('EA_list', []);
	EA_list.controller('EA_listCtrl', function($scope,$http,airfarePublic,statusPublic) {
		
//		var BaseUrljp = 'http://172.16.12.213:9093/smart-buy-center-web/';
//		var BaseUrljp = 'http://mtripuat.midea.com:9091/mtrip/';
//		var Token = '?mideatest_sso_token=358dqonuB0uQ13Ggqm2q3CiSGu0l2a%2Fakwt2WvtQnYSKGTKEDkAhBw%3D%3D';
		var $listUrl = ShangLvUrl + 'data/flight/queryAvailableEa.do';
		$http.get($listUrl).success(function(response){
            $scope.EA_lists = response;
            console.log($scope.EA_lists);
        });
//		$scope.EA_lists = [
//			{applyName:'a',reasonDesc:'a',availAmount:'a',currencyName:'a',feeApplyCode:'a'},
//			{applyName:'b',reasonDesc:'b',availAmount:'b',currencyName:'b',feeApplyCode:'b'},
//			{applyName:'c',reasonDesc:'c',availAmount:'c',currencyName:'c',feeApplyCode:'c'},
//			{applyName:'d',reasonDesc:'d',availAmount:'d',currencyName:'d',feeApplyCode:'d'}
//		];
		
//		// 初始化已经选择的单据
//		$scope.EA_listSelected = airfarePublic.EA_lists;
//		// 选择状态切换
//		$scope.EA_listToggle = function (item, list) {
//	        	var indexid = publicFunction.arrayIndex(list,'applyName',item.applyName);
//	        	if (indexid > -1) list.splice(indexid, 1);
//	        	else list.push(item);
//    	};
//    	// 判断是否已经选择
//    	$scope.EA_listExists = function (item, list) {
//    		var indexid = publicFunction.arrayIndex(list,'applyName',item.applyName);
//      		return indexid > -1;
//    	};
//    	//选择单据确认
//    	airfarePublic.EA_lists = $scope.EA_listSelected;

        
        
	})
	
});