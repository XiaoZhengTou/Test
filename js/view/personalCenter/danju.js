define(['angular'], function(angular) {
	var danju = angular.module('danju', []);
	danju.controller('danjuCtrl', function($scope, $http, airfarePublic, publicmodel, $rootScope, $filter, $timeout) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/danju', '首页');
		//初始化数据
		function getDate() {
			$scope.query = {
				page_size: 10,
				page_number: 1,
				order_code: null,
				description: null,
				order_status: null,
				apply_date_before: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
				apply_date_after: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),

			};
		};
		getDate();
		//清空查询条件
		$scope.clearData = function() {
				getDate();
			}
			//获取我的费用单据
		$scope.getMyFeeData = function() {
			$scope.query.page_number = 1;
			$scope.MyFeeData = function() {
				$scope.MyFeeOrder = {
					"module_types": null,
					"page_number": $scope.query.page_number,
					"page_size": $scope.query.page_size,
					"order_code": $scope.query.order_code,
					"description": $scope.query.description,
					"order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
					"apply_date_before": $filter('date')($scope.query.apply_date_before, 'yyyy-MM-dd'),
					"apply_date_after": $filter('date')($scope.query.apply_date_after, 'yyyy-MM-dd'),
				};
				var $myFeeUrl = feelapplyUrl + 'uc/userCenter/queryMyFeeOrder';
				$http({
					method: 'POST',
					url: $myFeeUrl,
					data: $scope.MyFeeOrder,
					headers: {
						'x-auth-token': sessionStorage.Token
					},
				}).success(function(response) {
					if(response.code == '0000') {
						console.log($scope.MyFeeOrder);
						$scope.myFees = response.data.datalist;
						$scope.FeePage = response.data.page;
						console.log(response);
					} else {
						$scope.showAlert("", "提示", '异常:' + response.msg + "(" + response.code + ")", "关闭", "");
					}
				}).error(function(data) {
					console.log(data);
				});
				$scope.promise = $timeout(function() {}, 2000);
			};
			$scope.MyFeeData();
		};
		$scope.getMyFeeData();
		//获取我的申请中列表
		$scope.getMyApplyingData = function() {
			$scope.query.page_number = 1;
			$scope.MyApplyingData = function() {
				$scope.MyApplyingList = {
					"module_types": null,
					"page_number": $scope.query.page_number,
					"page_size": $scope.query.page_size,
					"order_code": $scope.query.order_code,
					"description": $scope.query.description,
					"order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
					"apply_date_before": $filter('date')($scope.query.apply_date_before, 'yyyy-MM-dd'),
					"apply_date_after": $filter('date')($scope.query.apply_date_after, 'yyyy-MM-dd'),
				};
				var $shengQingzhongUrl = feelapplyUrl + 'uc/userCenter/queryMyApplyingList';
				$http({
					method: 'POST',
					url: $shengQingzhongUrl,
					data: $scope.MyApplyingList
				}).success(function(response) {
					if(response.code == '0000') {
						console.log($scope.MyApplyingList);
						$scope.shengQingzhongs = response.data.dataList;
						$scope.ApplyingPage = response.data.page;
						console.log(response);
					} else {
						$scope.showAlert("", "提示", '异常:' + response.msg + "(" + response.code + ")", "关闭", "");
					}
				}).error(function(data) {
					console.log(data);
				});
				$scope.promise = $timeout(function() {}, 2000);
			};
			$scope.MyApplyingData();

		};

		//获取我的已申请列表
		$scope.getMyApplyedData = function() {
			$scope.query.page_number = 1;
			$scope.MyApplyedData = function() {
				$scope.MyApplyedList = {
					"module_types": null,
					"page_number": $scope.query.page_number,
					"page_size": $scope.query.page_size,
					"order_code": $scope.query.order_code,
					"description": $scope.query.description,
					"order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
					"apply_date_before": $filter('date')($scope.query.apply_date_before, 'yyyy-MM-dd'),
					"apply_date_after": $filter('date')($scope.query.apply_date_after, 'yyyy-MM-dd'),
				};
				var $yishengQingUrl = feelapplyUrl + 'uc/userCenter/queryMyApplyedList';
				$http({
					method: 'POST',
					url: $yishengQingUrl,
					data: $scope.MyApplyedList
				}).success(function(response) {
					if(response.code == '0000') {
						console.log($scope.MyApplyedList);
						$scope.yishengQings = response.data.dataList;
						$scope.ApplyedPage = response.data.page;
						console.log(response);
					} else {
						$scope.showAlert("", "提示", '异常:' + response.msg + "(" + response.code + ")", "关闭", "");
					}

				}).error(function(data) {
					console.log(data);
				});
				$scope.promise = $timeout(function() {}, 2000);
			};
			$scope.MyApplyedData();
		};

		//获取我的待付款列表
		$scope.getUnpaidData = function() {
			$scope.query.page_number = 1;
			$scope.UnpaidData = function() {
				$scope.MyUnpaidOrder = {
					"module_types": null,
					"page_number": $scope.query.page_number,
					"page_size": $scope.query.page_size,
					"order_code": $scope.query.order_code,
					"description": $scope.query.description,
					"order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
					"apply_date_before": $filter('date')($scope.query.apply_date_before, 'yyyy-MM-dd'),
					"apply_date_after": $filter('date')($scope.query.apply_date_after, 'yyyy-MM-dd'),
				};
				var $daiFuUrl = feelapplyUrl + 'uc/userCenter/queryMyUnpaidOrder';
				$http({
					method: 'POST',
					url: $daiFuUrl,
					data: $scope.MyUnpaidOrder
				}).success(function(response) {
					if(response.code == '0000') {
						console.log($scope.MyUnpaidOrder);
						$scope.daiFus = response.data.datalist;
						$scope.UnpaidPage = response.data.page;
						console.log(response);
					} else {
						$scope.showAlert("", "提示", '异常:' + response.msg + "(" + response.code + ")", "关闭", "");
					}

				}).error(function(data) {
					console.log(data);
				});
				$scope.promise = $timeout(function() {}, 2000);
			};
			$scope.UnpaidData();
		}

		//获取我的待还款列表
		$scope.getMyUnRepaidData = function() {
			$scope.query.page_number = 1;
			$scope.MyUnRepaidData = function() {
				$scope.MyUnRepaidOrder = {
					"module_types": null,
					"page_number": $scope.query.page_number,
					"page_size": $scope.query.page_size,
					"order_code": $scope.query.order_code,
					"description": $scope.query.description,
					"order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
					"apply_date_before": $filter('date')($scope.query.apply_date_before, 'yyyy-MM-dd'),
					"apply_date_after": $filter('date')($scope.query.apply_date_after, 'yyyy-MM-dd'),
				};
				var $daiHuanUrl = feelapplyUrl + 'uc/userCenter/queryMyUnRepaidOrder';
				$http({
					method: 'POST',
					url: $daiHuanUrl,
					data: $scope.MyUnRepaidOrder
				}).success(function(response) {
					if(response.code == '0000') {
						console.log($scope.MyUnRepaidOrder);
						$scope.daiHuans = response.data.datalist;
						$scope.UnRepaidPage = response.data.page;
						console.log(response);
					} else {
						$scope.showAlert("", "提示", '异常:' + response.msg + "(" + response.code + ")", "关闭", "");
					}

				}).error(function(data) {
					console.log(data);
				});
				$scope.promise = $timeout(function() {}, 2000);
			};
			$scope.MyUnRepaidData();
		}

		//跳转传值
		$scope.myDanju = function(x) {
			airfarePublic.myId = x.id;
			switch(x.module_type) {
				case 'EA':
					//					$scope.go('/feeapply/Dateils');
					$scope.next();
					break;
				case 'EC':
					// 接口联调开始
					publicmodel.Share.selectMode = true;
					publicmodel.Share.data = {};
					publicmodel.Share.data = x;
					publicmodel.Share.fromUrl = "/personalCenter/danju";
					publicmodel.Share.toUrl = "/chailvbaoxiao/shenpi";
					$scope.go("/chailvbaoxiao/");
					// 接口联调结束
					$scope.next();
					break;
				case 'LM':
					//					$scope.go('/consumption/low/lend/loan/detail');
					$scope.next();
					break;
				case 'RP':
					//					$scope.go('/consumption/low/lend/repay/detail');
					$scope.next();
					break;
				case 'PA':
					//	                    $scope.go('/personalCenter/orderRefunds');
					break;
				case 'BM':
					//	                    $scope.go('/personalCenter/orderRefunds');
					break;
				case 'HT':
					//	                    $scope.go('/personalCenter/orderRefunds');
					break;
				case 'BD':
					//	                    $scope.go('/personalCenter/orderRefunds');
					break;
				case 'CM':
					//	                    $scope.go('/personalCenter/orderRefunds');
					break;
				default:
					//	                    $scope.go('/personalCenter/orderRefunds');
			}
		};
		$scope.selected = [];

	});
});