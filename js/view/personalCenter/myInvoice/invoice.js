define(['angular'], function(angular) {

	var invoice = angular.module('invoice', []);
	invoice.controller('invoiceCtrl', function($scope, airfarePublic, $rootScope, $mdDialog, $http) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/invoice', '首页');

		function getInvoice() {
			var invoiceUrl = feelapplyUrl + 'cm/userCenter/getDefaultConfig';
			$http.get(invoiceUrl).success(function(response) {
				console.log(response);
				if(response && response.data && response.code == "0000") {
					$scope.invoiceChecked = response.data.company;
					console.log($scope.invoiceChecked);
					$scope.invoices = response.data.companys;
					console.log($scope.invoices);
					for(var i = 0; i < $scope.invoices.length; i++) {
						if($scope.invoices[i].is_default == "Y") {
							$scope.morenchecked = i;
						}
					}
				} else {
					$scope.showAlert("", "提示", response.msg, "确定", "");
				}
			}).error(function(data) {
				console.log("shibai");
			})
		}
		getInvoice();

		//默认设置
		$scope.morenSelect = function(invoice, index) {
			$scope.morenchecked = index;
			$scope.invoiceChecked = invoice;
			console.log($scope.invoiceChecked);
			var invoiceMorenUrl = feelapplyUrl + 'cm/userCenter/saveDefaultConfig';
			$http({
				method: 'POST',
				url: invoiceMorenUrl,
				data: [{
					'company': {
						company_id: invoice.company_id,
						company_name: invoice.company_name,
						invoice_head: invoice.invoice_head,
						config_id: invoice.config_id,
						is_default: "Y",
						config_type: 'company'
					}
				}]
			}).success(function(response) {
				if(response && response.data && response.code == "0000") {
					console.log(response);
				} else {
					$scope.confirmShow("", "提示", '操作异常：' + response.code + response.msg, "确定", "重试", "", $scope.morenSelect);
				}
			}).error(function(data) {
				console.log("shibai");
			})

		};
		$scope.removeItem = function(invoice) {
				$scope.showConfirm("", "提示", "确定删除？", "删除", "点错了", orderRemove, "");

				function orderRemove() {
					console.log(invoice.config_id);
					var invoiceMorenUrl = feelapplyUrl + 'cm/userCenter/delete/' + invoice.config_id;
					$http.delete(invoiceMorenUrl).success(function(response) {
						console.log(invoiceMorenUrl);
						console.log(response);
						if(response.code == '0000') {
							$scope.showAlert("", "提示", response.msg, "确定", getInvoice);
						} else {
							$scope.showAlert("", "提示", '访问服务器异常：' + response.msg, "确定", "");
						}
					}).error(function(data) {
						console.log("shibai");
					})
				}

			}
			//新增
		$scope.addInvoice = function() {
			$scope.go('/personalCenter/addInvoice', '新增发票抬头');
		};

	});
});