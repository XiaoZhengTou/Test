define(['angular'], function(angular) {
	var gaiqianDetail = angular.module('gaiqianDetail', []);
	gaiqianDetail.controller('gaiqianDetailCtrl', function($scope, $http, airfarePublic, statusPublic, $mdDialog) {
		//接收订单号，请求数据
		$scope.RefundsOrderNo = airfarePublic.orderNo;
		//接收联系人信息
		$scope.contact = airfarePublic.contact;
		//接收航班信息
		$scope.ticket = airfarePublic.ticket;
		console.log($scope.ticket);
		$scope.selected = [];
		//获取改签人信息
		var $gaiqianUrl = ShangLvUrl + 'data/flight/getRefundApplyData.do';
		$http({
				url: $gaiqianUrl,
				params: {
					'orderNo': $scope.RefundsOrderNo
				}
			})
			.success(function(response) {
				$scope.gaiPassengers = response.data;
				console.log($scope.gaiPassengers);
				// 选中乘机人
				if(statusPublic.listForm == 1 && airfarePublic.gaiSelected) {
					for(var i = 0; i < $scope.gaiPassengers.length; i++) {
						var arr1 = $scope.gaiPassengers[i].passengerId;
						for(var j = 0; j < airfarePublic.gaiSelected.length; j++) {
							var arr2 = airfarePublic.gaiSelected[j].passengerId;
							if(arr1 == arr2) {
								$scope.selected.push($scope.gaiPassengers[i]);
								console.log($scope.selected);
							}
						};
					};
				}
				$scope.promise = $timeout(function (){
		    }, 2000);
			}).error(function() {
				console.log("shibai");
			});
		//选择新航班
		$scope.getplane = function() {
			if($scope.selected == '') {
				$scope.showAlert("", "提示", '请选择需要改签的乘机人', "确定", "");
			} else {
				airfarePublic.reason = $scope.reason;
				airfarePublic.gaiqianshuoming = $scope.gaiqianshuoming;
				$scope.go('/personalCenter/gaiqianList', '选择新航班');
				airfarePublic.gaiSelected = $scope.selected;
			}
		};
		//初始化
		if(statusPublic.listForm == 1) {
			$scope.reason = airfarePublic.reason;
			$scope.gaiqianshuoming = airfarePublic.gaiqianshuoming;
			$scope.fightList = airfarePublic.fightList;
			$scope.fightListDetail = airfarePublic.fightListDetail;
			$scope.selected = [];
		};
		//确认弹出框
		$scope.gaiqiantijiao = function(event) {
			$mdDialog.show({
				clickOutsideToClose: false,
				scope: $scope,
				preserveScope: true,
				template: '<md-dialog  class="personalCenter ml-fontsize-13 ml-color-73" flex="40">' +
					'	<div class="ml-padding-13 gaiqian-dialog">' +
					'		<div class="tuipiaoRe ml-fontsize-15" ><i class="iconfont ml-color-blue">&#xe683;</i>确认要改签吗？</div>' +
					'		<p>您提交的改签原因是: <span class="ml-color-21">{{reason}}</span></p>' +
					'		<div>改签具体原因为：</div>' +
					'		<md-input-container class="ml-nomargin ml-color-21">' +
					'			<textarea ng-model="gaiqianshuoming" aria-label="gaiqianshuoming" cols="200" name="remark"></textarea>' +
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
					//提交改签申请
					$scope.messageCon = function() {
						function gaiqian() {
							var $tijiaoGaiqianUrl = ShangLvUrl + 'data/flight/createEndorseOrderData.do';
							$scope.gaiqianOrder = {
								'orderNo': $scope.RefundsOrderNo,
								'passengers': angular.toJson($scope.selected),
								'contact': angular.toJson($scope.contact),
								'flightInfo': angular.toJson($scope.fightList),
								'priceInfo': angular.toJson($scope.fightListDetail),
								'endorseReason': $scope.reasonSelected,
								'tlementType': '1',
								'eaLists': ''
							};
							console.log($scope.gaiqianOrder);
							$http({
									method: 'POST',
									url: $tijiaoGaiqianUrl,
									data: $scope.gaiqianOrder
								})
								.success(function(response) {
									if(response.resultFlag == "1") {
										$scope.tijiaoGaiqian = response;
										console.log($scope.tijiaoGaiqian);
										$scope.showAlert("", "提示", response.resultMsg, "确定", $scope.messageBack);
										return;
									} else {
										$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", gaiqian);
										return;
									}
								}).error(function() {
									console.log("shibai");
									$scope.showConfirm("", "提示", response.resultMsg, "确定", "重试", "", gaiqian);
									return;
								});
						}
						gaiqian();

//						function goGaiqianConfirm() {
//							$scope.go('/personalCenter/gaiqianConfirm', '改签详情');
//						};
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