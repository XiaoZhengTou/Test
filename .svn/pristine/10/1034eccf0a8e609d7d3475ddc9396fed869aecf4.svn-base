define(['angular'], function(angular) {
	var trainTuipiao = angular.module('trainTuipiao', []);
	trainTuipiao.controller('trainTuipiaoCtrl', function($scope, $http, airfarePublic, statusPublic, publicmodel, $mdDialog) {
		//接收请求数据
		$scope.trainBaseInfo = airfarePublic.trainBaseInfo;
		$scope.trainContact = airfarePublic.trainContact;
		$scope.trainTicketLists = airfarePublic.trainTicketLists;
		console.log($scope.trainTicketLists);
		console.log($scope.trainBaseInfo);
		console.log($scope.trainContact);
		//选中乘机人
		$scope.selected = [];
		//确认弹出框
		$scope.tuipiaoCon = function(event) {
			var eaBills = new Array();
			var ea = new Object();
			ea.feeApplyCode = "EAxxxxx01";
			ea.budgetNodeId = 1;
			ea.budgetNodeName = "test";
			ea.availAmount = 200;
			ea.billUsedAmount = 10;
			ea.feeApplyLId = 21;
			ea.budgetHeadersId = 221;
			eaBills.push(ea);
			//提交退票申请
			if($scope.selected == "") {
				$scope.showAlert("", "提示", "请选择需要退票的乘车人", "确定", "");
			} else {
				var $tijiaoTuipiaoUrl = trainUrl + 'data/trainapi/createReturnTrainOrder.do';
				$scope.tuiPiaoOrder = {
					'orderBaseInfo': $scope.trainBaseInfo,
					'contactInfo': $scope.trainContact,
					'trainTicketList': $scope.selected,
					'eaBills': eaBills
				};
				console.log($scope.tuiPiaoOrder);
				$http({
						method: 'POST',
						url: $tijiaoTuipiaoUrl,
						data: $scope.tuiPiaoOrder
					})
					.success(function(response) {
						console.log($scope.tuiPiaoOrder);
						console.log(response);
						console.log($tijiaoTuipiaoUrl);
						if(response.code == "00000") {
							$scope.showAlert("", "提示", response.msg, "确定", $scope.messageBack);
							return;
						} else {
							$scope.showConfirm("", "提示", response.msg, "确定", "重试", "", $scope.messageCon);
							return;
						}
					}).error(function() {
						console.log("shibai");
						$scope.showConfirm("", "提示", response.msg, "确定", "重试", "", $scope.messageCon);
						return;
					});
			}

			//			$mdDialog.show({
			//				clickOutsideToClose: false,
			//				scope: $scope,
			//				preserveScope: true,
			//				template: '<md-dialog  class="personalCenter ml-fontsize-13 ml-color-73" flex="40">' +
			//					'	<div class="ml-padding-13 gaiqian-dialog">' +
			//					'		<div class="tuipiaoRe ml-fontsize-15" ><i class="iconfont ml-color-blue">&#xe683;</i>确认要退票吗？</div>' +
			//					'		<p>您提交的退票原因是: <span class="ml-color-21">{{reason}}</span></p>' +
			//					'		<div>退票具体原因为：</div>' +
			//					'		<md-input-container class="ml-nomargin ml-color-21">' +
			//					'			<textarea ng-model="tuipiaoshuoming" aria-label="tuipiaoshuoming" cols="200" name="remark"></textarea>' +
			//					'		</md-input-container>' +
			//					'		<div class="close-dialog" ng-click="messageClose();"><i class="iconfont ml-fontsize-13">&#xe634;</i>' +
			//					'		</div>' +
			//					'	</div>' +
			//					'	<div class="ml-textalign-right bgcolor">' +
			//					'		<md-button class="md-raised" ng-click="messageQx();">取 消</md-button>' +
			//					'		<md-button class="md-raised md-primary" ng-click="messageCon();">确 认</md-button>' +
			//					'	</div>' +
			//					'</md-dialog>',
			//				controller: function DialogController($scope, $mdDialog) {
			//					$scope.messageClose = function() {
			//						$mdDialog.hide();
			//					};
			//
			//					var eaBills = new Array();
			//					var ea = new Object();
			//					ea.feeApplyCode = "EAxxxxx01";
			//					ea.budgetNodeId = 1;
			//					ea.budgetNodeName = "test";
			//					ea.availAmount = 200;
			//					ea.billUsedAmount = 10;
			//					ea.feeApplyLId = 21;
			//					ea.budgetHeadersId = 221;
			//					eaBills.push(ea);
			//					//提交退票申请
			//
			//					$scope.messageCon = function() {
			//						if($scope.selected=="") {
			//							$scope.showAlert("", "提示", "请选择需要退票的乘车人", "确定", "");
			//						} else {
			//							
			//							var $tijiaoTuipiaoUrl = trainUrl + 'data/trainapi/createReturnTrainOrder.do';
			//							$scope.tuiPiaoOrder = {
			//								'orderBaseInfo': $scope.trainBaseInfo,
			//								'contactInfo': $scope.trainContact,
			//								'trainTicketList': $scope.selected,
			//								'eaBills': eaBills
			//							};
			//							console.log($scope.tuiPiaoOrder);
			//							$http({
			//									method: 'POST',
			//									url: $tijiaoTuipiaoUrl,
			//									data: $scope.tuiPiaoOrder
			//								})
			//								.success(function(response) {
			//									console.log($scope.tuiPiaoOrder);
			//									console.log(response);
			//									console.log($tijiaoTuipiaoUrl);
			//									if(response.code == "00000") {
			//										$scope.showAlert("", "提示", response.msg, "确定", $scope.messageBack);
			//										return;
			//									} else {
			//										$scope.showConfirm("", "提示", response.msg, "确定", "重试", "", $scope.messageCon);
			//										return;
			//									}
			//								}).error(function() {
			//									console.log("shibai");
			//									$scope.showConfirm("", "提示", response.msg, "确定", "重试", "", $scope.messageCon);
			//									return;
			//								});
			//						}
			//
			//					}
			//
			//					//取消
			//					$scope.messageQx = function() {
			//						$mdDialog.hide();
			//					};
			//	}
			//});
		};

		//返回
		$scope.messageBack = function() {
			$scope.go('/personalCenter/myOrder');
		}

	});
});