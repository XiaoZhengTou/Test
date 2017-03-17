define(['angular'], function(angular) {
	var mdApproveEC = angular.module('mdApproveEC', []);
	mdApproveEC.controller('approveCtrl', function($scope, $http,$routeParams) {
		$scope.selected = [];
		$scope.loadData = function() {
			$scope.param = {
				"tenant_id":null,
				"user_id":null,
				"fee_reim_id":$routeParams.obj
			};
			$http({
				method: 'POST',
				url: feelapplyUrl + 'ec/feeReim/getFeeReimById',
				data: $scope.param
			}).success(function(data){
		     $scope.total=0;
		     $scope.totals=0;
             $scope.data_msg=data.data.emsecfeereimh;
             $scope.yusuan=data.data.emsecfeereimh.emsecfeebudgets;
             $scope.hexiao=data.data.emsecfeereimh.emsecfeeloans;
             //$scope.hexiao=data.data.emsecfeereimh.emsecfeeloans;
             $scope.fapiao=data.data.emsecfeereimh.emsecinvoicetaxrs;
             $scope.isshow=data.data.emsecfeereimh.is_instalments_pay=='N'?'否':'是';
             

             //增值税税金总额
             angular.forEach($scope.fapiao,function (data) {
             $scope.total=$scope.total+data.tax_amount;
             });
             //不含税金额合计
             angular.forEach($scope.yusuan,function (data) {
             $scope.totals=$scope.totals+data.approve_reim_amount;
             });
			}).error(function(data) {
				console.log("访问失败");
			});
		}
		$scope.loadData();
		
        return mdApproveEC;
	});
	//	控制器范围到此为止
});