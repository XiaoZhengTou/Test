define(['angular'], function(angular) {
	var mdApproveP = angular.module('mdApproveP', []);
	mdApproveP.controller('approveCtrlP', function($scope, $http,$routeParams,$filter) {
		
		$scope.selected = [];
		$scope.approve = {
           desc:''
		}
		$scope.add = {
			desc: null,
			type: '月度预提',
			jz: [{
				id: 'NULL',
				name: '不导ERP'
			}, {
				id: 'GL',
				name: '导入总帐'
			},{
				id: 'AP',
				name: '导入应付'
			}]
		};
		
        $scope.origindata = {
            advices : [
        {
			'id': '1',
			'name': '同意'
		}, {
			'id': '2',
			'name': '驳回'
		}, {
			'id': '3',
			'name': '沟通'
		}, {
			'id': '4',
			'name': '转办'
		}]       
       };
       /*********************************/
       $scope.param = {
				"tenant_id":null,
				"user_id":null,
				"apportion_id":$routeParams.obj
			};
       $scope.loadData = function() {
			$http({
				method: 'GET',
				url: feelapplyUrl + 'ca/EmsCaApportionH/get/'+$scope.param.apportion_id,
				data: $scope.param
			}).success(function(response){
				
                if (response.data && response.code=='0000') {
                	$scope.data=response.data.emscaapportionh;
				    $scope.order_type=response.data.emscaapportionh.emscaapportionls[0].order_type==='ACCRUED'?'月度预提':'月度预提' ;
				    alert(response.data.emscaapportionh.apportion_date);
                        $scope.data.apportion_dates = new Date(response.data.emscaapportionh.apportion_date);
                        $scope.data.apportion_date=$filter('date')($scope.data.apportion_dates,'yyyy-MM-dd');
             //合计总价格
			$scope.total = 0;
			angular.forEach($scope.data.emscaapportionls, function(data) {
				data.budget_amount === undefined ? data.budget_amount = null : data.budget_amount;
				$scope.total += data.budget_amount;
			});

                }else {
                    $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                        .textContent('' + response.msg + "(" + response.code + ")"));
                }
				
				
				
			}).error(function(data) {
				console.log("访问失败");
			});
		}
		$scope.loadData();
       
       


       
       
       
       
		return mdApproveP;
	});
	//控制器范围到此结束
});