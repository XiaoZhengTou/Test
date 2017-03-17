define(['angular'], function(angular) {
	var home = angular.module("home",[]);
	home.controller("governHomeCrl",['$scope', '$http', '$filter', '$mdDialog',function($scope,$http,$filter,$mdDialog){
		publicFunction.addStyle('airfare.css');

		//数据设置
		$scope.query = {
			limit: 10,
			page: 1,
			company_id: null,
			receipt_code: null,
			begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
			end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
			min_cash_amount: null,
			max_cash_amount: null,
			source_system_num:null,
			type_code:null,
			status:null,
			sortBy:null,
			sortMethod:null

		};
		$scope.selected=[];
		$scope.loadData = function() {
			var param = {
				"page_number":$scope.query.page,
				"page_size":$scope.query.limit,
				"company_id":$scope.query.company_id,
				"receipt_code":$scope.query.receipt_code,
				"min_cash_amount":$scope.query.min_cash_amount,
				"max_cash_amount":$scope.query.max_cash_amount,
				"source_system_num":$scope.query.source_system_num,
				"type_code":$scope.query.type_code,
				"status":$scope.query.status,
				"sortBy":$scope.query.sortBy,
				"sortMethod":$scope.query.sortMethod,
			};
			$http({
				method: 'POST',
				url:'http://10.16.30.74:8080/smart-accounting-web/center/receipt/SsImCashReceipt/pageQuery',
				data: param
			}).success(function(data, status, headers, config) {
				console.log(data);
				if(data.code == "0000") {
					$scope.shoukuandan = data;
					console.log($scope.shoukuandan.data.info)
					angular.forEach($scope.shoukuandan.data.info, function(item) {
						item.apply_date = new Date(item.apply_date);
					});
					$scope.query.limit = data.data.pageSize;
					$scope.query.page = data.data.pageNumber;
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
						.textContent('异常:' + data.msg + "(" + data.code + ")"));
				}

			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}
		$scope.loadData();

		function success(desserts) {
			console.log('success');
			$scope.desserts = desserts;
		}

		$scope.getDesserts = function() {
			console.log($scope.query);
			$scope.loadData();
			//$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
		};

		$scope.stateFlag = true;
		$scope.state = function(){
			if($scope.stateFlag){
				$scope.stateFlag = false;
			}else{
				$scope.stateFlag = true;
			};
		};
		
		//设置时间
	    $scope.beginTime =  new Date();
       	$scope.endTime =  new Date();


		$scope.onGoList = function(){
			$scope.go('/govern/list');
		};
		$scope.onGoFirst = function(){
			$scope.go('/goFirst/list');
		};
    }]);

	angular._LoadModule('home');
	return home;
});
