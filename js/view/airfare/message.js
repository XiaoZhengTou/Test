define(['angular', 'js/view/choosepassenger.js'], function(angular) {

	var message = angular.module('message', ['muchoosepassengers']);
	message.controller('messageCtrl', function($scope, $http, airfarePublic, statusPublic, publicmodel, $mdDialog) {
		//接收选中航班信息
		$scope.fightMessage = airfarePublic.fightList;
		$scope.fightListDetail = airfarePublic.fightListDetail;
		console.log($scope.fightMessage);
		console.log($scope.fightListDetail);
		//总价
		if($scope.fightListDetail) {
			$scope.total = $scope.fightListDetail.ticketPrice + $scope.fightListDetail.airPortFee + $scope.fightListDetail.oilFee + $scope.fightListDetail.serviceAmount;
		};

		//退改签说明
		$scope.tuigaiShow = false;
		$scope.tgshuoming = function() {
			$scope.tuigaiShow = !$scope.tuigaiShow;
		};
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

		//		// 接收EA数据
		//		$scope.EA_lists = airfarePublic.EA_lists;
		//		
		//		statusPublic.selectFrom = 0;
		//		// 获取乘客信息开始
		//		$scope.getPassengers = function(){
		//			publicmodel.Share.selectMode = true;
		//          publicmodel.Share.fromUrl = "/airfare/message";
		//          publicmodel.Share.toUrl = "/personalCenter/passengers";
		//          publicmodel.Share.data = {};
		//          $scope.go("/personalCenter");
		//      };
		//      // 输出数据
		//      $scope.passengers = publicmodel.Share.data;
		//		console.log($scope.passengers);
		////		$scope.messageUser = publicmodel.user;
		////	    $scope.messageNumber = publicmodel.mobile;
		//		$scope.messageUser = $scope.passengers[0];
		//	    	$scope.messageNumber = $scope.passengers[0];
		//		// 获取乘客信息结束
		//		//删除后的乘机人
		//		 $scope.selectedPeople = function (item, list) {
		//	        var idx = list.indexOf(item);
		//	        if (idx > -1) list.splice(idx, 1);
		//	        else list.push(item);
		//	        $scope.selectedNo = $scope.passengers.length;
		//	        $scope.messageUser = $scope.passengers[0];
		//	    		$scope.messageNumber = $scope.passengers[0];
		//	   };
		//	    
		//	    //人数
		//	    $scope.selectedNo = $scope.passengers.length;
		//	     
		////		$scope.insurances = [
		////			{xianzhong:"意外险",fenshu:"1"},
		////			{xianzhong:"延误险",fenshu:"1"},
		////			{xianzhong:"退票险",fenshu:"1"}
		////		];
		//
		//		//支付
		$scope.pays = [{
				"tlementType": "1",
				"payType": "个人支付"
			}, {
				"tlementType": "2",
				"payType": "公司支付"
			}

		];
		//选择支付方式
		$scope.selectedPaytype = airfarePublic.payType ? airfarePublic.payType : '个人支付';
		$scope.tlementType = airfarePublic.tlementType ? airfarePublic.tlementType : '1';
		$scope.getPay = function(pay) {
			$scope.tlementType = pay.tlementType;
			$scope.payType = pay.payType;
			airfarePublic.payType = pay.payType;
			airfarePublic.tlementType = pay.tlementType;
		};
		//选择是否需要发票凭证
		//		$scope.selectedInvoice = [];
		//		$scope.invoiceToggle = function(item, list) {
		//			var idx = list.indexOf(item);
		//			if(idx > -1) {
		//				list.splice(idx, 1);
		//			} else {
		//				list.push(item);
		//			}
		//		};
		//		$scope.invoiceExists = function(item, list) {
		//			return list.indexOf(item) > -1;
		//		};

//		$scope.invoices = [
//			'广东美的集团股份有限公司',
//			'广东美的集团股份有限公司广东分公司',
//			'广东美的集团股份有限公司深圳分公司',
//			'广东美的集团股份有限公司北京分公司',
//			'广东美的集团股份有限公司上海分公司',
//			'广东美的集团股份有限公司武汉分公司',
//			'广东美的集团股份有限公司广州分公司'
//		];

function getInvoice() {
			var invoiceUrl = feelapplyUrl + 'cm/userCenter/getDefaultConfig';
			$http.get(invoiceUrl).success(function(response) {
				console.log(response);
				if(response && response.data && response.code == "0000") {
					$scope.invoiceChecked = response.data.company;
					console.log($scope.invoiceChecked);
					$scope.invoices = response.data.companys;
					console.log($scope.invoices);
//					for(var i = 0; i < $scope.invoices.length; i++) {
//						if($scope.invoices[i].is_default == "Y") {
//							$scope.morenchecked = i;
//						}
//					}
				} else {
					$scope.showAlert("", "提示", response.msg, "确定", "");
				}
			}).error(function(data) {
				console.log("shibai");
			})
		}
		getInvoice();
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
					'			<md-list-item ng-click="getInvoice(invoice)">{{invoice.invoice_head}}</md-list-item>' +
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
		//创建并提交订单
		$scope.messageConfirm = function() {
			//组合参数
			$scope.complateDate = {
				//'esBills':angular.toJson($scope.EA_lists?$scope.EA_lists:''),
				'flightInfo': angular.toJson($scope.fightMessage),
				'email': '',
				'priceInfo': angular.toJson($scope.fightListDetail),
				'contactName': $scope.PassengersCnName,
				'passenegers': angular.toJson($scope.passengers),
				'mobile': $scope.PassengersMobile,
				'tlementType': $scope.tlementType
			};
			console.log($scope.complateDate);
			//提交订单
			function complateOrder() {
				var messageUrljp = ShangLvUrl + 'data/flight/create.do';
				$http({
						method: 'POST',
						url: messageUrljp,
						data: $scope.complateDate
					})
					.success(function(response) {
						if(response.resultFlag == "1") {
							//跳转参数
							airfarePublic.orderNo = response.data.contact.orderNo;
							console.log(airfarePublic.orderNo);
							console.log(response);
							$scope.showAlert("", "提示", response.resultMsg, "确定", goOrder);
							return;
						} else {
							$scope.showConfirm("", "提示", response.resultMsg, "重试", "确定", complateOrder, "");
							return;
						}
					}).error(function() {
						console.log("shibai");
						$scope.showConfirm("", "提示", response.resultMsg, "重试", "确定", complateOrder, "");
					});
			};
			complateOrder();

			function goOrder() {
				$scope.go('/airfare/detail', '去支付');
			};
		};
	});
});