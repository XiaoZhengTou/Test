define(['angular', 'js/view/choosepassenger.js'], function(angular) {

	var addAirfare = angular.module('addAirfare', ['muchoosepassengers']);
	addAirfare.controller('addAirfareCtrl', function($scope, $rootScope, airfarePublic, statusPublic, publicmodel, $mdDialog) {
		$scope.danju = "3598047940376";
		$scope.yusuan = "200";

		//获取乘机人
		$scope.passengers = publicmodel.Passengers;
		$scope.$watch('passengers', function(newValue, oldValue) {
			$scope.passengers = newValue;
			if($scope.passengers[0]) {
				$scope.PassengersCnName = $scope.passengers[0].cnName;
				$scope.PassengersMobile = $scope.passengers[0].mobile;
			}
			console.log(newValue);
			console.log($scope.PassengersCnName);
		}, true);
		$scope.removePassenger = function(passengers) {
			$scope.passengers = passengers;
			console.log($scope.passengers);
			$scope.selected = $scope.passengers[0];
			if(!$scope.passengers[0]) {
				$scope.PassengersCnName = '';
				$scope.PassengersMobile = '';
			};
		};

		$scope.getPassenger = function(item) {
			$scope.selected = item;
		};
		$scope.invoices = [
			'广东美的集团股份有限公司',
			'广东美的集团股份有限公司广东分公司',
			'广东美的集团股份有限公司深圳分公司',
			'广东美的集团股份有限公司北京分公司',
			'广东美的集团股份有限公司上海分公司',
			'广东美的集团股份有限公司武汉分公司',
			'广东美的集团股份有限公司广州分公司'
		];
		//发票抬头弹出框
		$scope.invoiceShow = function(event) {
			$mdDialog.show({
				clickOutsideToClose: true,
				scope: $scope,
				preserveScope: true,
				template: '<md-dialog style="height: 300px;width: 50%;">' +
					'	<md-toolbar>' +
					'		<div class="md-toolbar-tools">' +
					'			<h2>选择发票抬头</h2>' +
					'			<span flex></span>' +
					'			<md-button ng-click="messageClose()">' +
					'				<i class="iconfont" style="color:#fff;">关闭</i>' +
					'			</md-button>' +
					'		</div>' +
					'	</md-toolbar>' +
					'	<md-dialog-content>' +
					'		<md-list class="ml-nopadding" ng-repeat="invoice in invoices">' +
					'			<md-list-item ng-click="getInvoice(invoice)">{{invoice}}</md-list-item>' +
					'		</md-list>' +
					'	</md-dialog-content>' +
					'</md-dialog>',
				controller: function DialogController($scope, $mdDialog) {
					$scope.messageClose = function() {
						$mdDialog.hide();
					};
					$scope.getInvoice = function(invoice) {
						$scope.invoice = invoice;
						$mdDialog.hide();

					};
				}
			});
		};
		//判断是否需要报销
		$scope.$watch('selectedInvoice', function(newValue, oldValue) {
			$scope.selectedInvoice = newValue;
			if(!$scope.selectedInvoice) {
				$scope.invoice = "";
			};
		}, true);
		$scope.addAirfareNext = function(){
			$scope.go('/telAirfare/phoneYzm',"短信验证");
		}
	});
});