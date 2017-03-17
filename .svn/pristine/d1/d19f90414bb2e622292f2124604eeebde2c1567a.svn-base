define(['angular','js/shared/ruzhangdanwei.js'], function(angular) {

	var addInvoice = angular.module('addInvoice', ['md.ruzhangdanwei']);
	addInvoice.controller('addInvoiceCtrl', function($scope, airfarePublic, $http) {
		$scope.addInvoiceBaocun = function() {
			if($scope.ruzhangdanwei) {
				var invoiceMorenUrl = feelapplyUrl + 'cm/userCenter/saveDefaultConfig';
				$http({
					method: 'POST',
					url: invoiceMorenUrl,
					data: [{
						'company': {
							company_id: $scope.ruzhangdanwei.company_id,
							company_name: $scope.ruzhangdanwei.company_name,
							config_type: 'company',
							invoice_head:$scope.ruzhangdanwei.invoice_head
						}
					}]
				}).success(function(response) {
					console.log(invoiceMorenUrl);
					console.log(response);
					if(response && response.data && response.code == "0000") {
						$scope.invoices = response.data.companys;
						console.log($scope.invoices);
						$scope.go('/personalCenter/invoice');
					} else {
						$scope.showAlert("", "提示", response.msg, "确定", "");
					}
				}).error(function(data) {
					console.log("shibai");
				})
			} else {
				$scope.showAlert("", "提示", '请选择发票抬头', "确定", "");
			}

		}

	});
});