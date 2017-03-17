define(['angular'], function(angular) {
	var tuipiao = angular.module('tuipiao', []);
	tuipiao.controller('tuipiaoCtrl', function($scope, $http, airfarePublic, statusPublic, publicmodel, $mdDialog) {
		
		//接收订单号，请求数据
		$scope.RefundsOrderNo = airfarePublic.orderNo;
		//接收联系人信息
		$scope.contact = airfarePublic.contact;
		//获取退票信息
		var $getTuipiaoUrl = ShangLvUrl + 'data/flight/getRefundApplyData.do';
		$http({
				url: $getTuipiaoUrl,
				params: {
					'orderNo': $scope.RefundsOrderNo
				}
			})
			.success(function(response) {
				$scope.tuiPassengers = response.data;
				console.log($scope.tuiPassengers);
			}).error(function() {
				console.log("shibai");
			});
		//选中乘机人
		$scope.selected = [];
		//确认弹出框
		$scope.tuipiaoCon = function(event) {
			$mdDialog.show({
				clickOutsideToClose: false,
				scope: $scope,
				preserveScope: true,
				template: '<md-dialog  class="personalCenter ml-fontsize-13 ml-color-73" flex="40">' +
					'	<div class="ml-padding-13 gaiqian-dialog">' +
					'		<div class="tuipiaoRe ml-fontsize-15" ><i class="iconfont ml-color-blue">&#xe683;</i>确认要退票吗？</div>' +
					'		<p>您提交的退票原因是: <span class="ml-color-21">{{reason}}</span></p>' +
					'		<div>退票具体原因为：</div>' +
					'		<md-input-container class="ml-nomargin ml-color-21">' +
					'			<textarea ng-model="tuipiaoshuoming" aria-label="tuipiaoshuoming" cols="200" name="remark"></textarea>' +
					'		</md-input-container>' +
					'		<div class="close-dialog" ng-click="messageClose();"><i class="iconfont ml-fontsize-13">&#xe634;</i>' +
					'		</div>' +
					'	</div>' +
					'	<div class="ml-textalign-right bgcolor">' +
					'		<md-button class="md-raised" ng-click="messageQx();">取 消</md-button>' +
					'		<md-button class="md-raised md-primary" ng-click="messageCon();">确 认</md-button>' +
					'	</div>' +
					'</md-dialog>',
				controller: function DialogController($scope, $mdDialog) {
					$scope.messageClose = function() {
						$mdDialog.hide();
					};
					//提交退票申请
					$scope.messageCon = function() {
						function tuipiao() {
							var passengerIds = new Array();
							//获取订单乘客id
							for(var i = 0; i < $scope.selected.length; i++) {
								passengerIds.push($scope.selected[i].passengerId);
							};
							console.log(passengerIds);
							var $tijiaoTuipiaoUrl = ShangLvUrl + 'data/flight/createRefundApply.do';
							$scope.tuiPiaoOrder = {
								'orderNo': $scope.RefundsOrderNo,
								'passengerId': passengerIds,
								'refundReason': $scope.reason,
								'specificRefundReason': $scope.tuipiaoshuoming
							};
							console.log($scope.tuiPiaoOrder);
							$http({
									method: 'POST',
									url: $tijiaoTuipiaoUrl,
									data: $scope.tuiPiaoOrder
								})
								.success(function(response) {
									if(response.resultFlag == "1") {
										$scope.tijiaoTuipiao = response;
										console.log($scope.tijiaoTuipiao);
										$scope.showAlert("", "提示", response.resultMsg, "确定", $scope.messageBack);
										return;
									} else {
										$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", tuipiao);
										return;
									}
								}).error(function() {
									console.log("shibai");
									$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", tuipiao);
									return;
								});
						}
						tuipiao();
					};
					//取消
					$scope.messageQx = function() {
						$mdDialog.hide();
					};
				}
			});
		};

		//返回
		$scope.messageBack = function() {
			$scope.go('/personalCenter/myOrder');
		}

	});
});