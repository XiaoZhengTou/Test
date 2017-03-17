define(['angular', 'js/view/personalCenter/myOrder/myOrder.js', 'js/view/personalCenter/myOrder/orderRefunds.js', 'js/view/personalCenter/myOrder/tuipiaoDetail.js', 'js/view/personalCenter/myOrder/gaiqianDetail.js', 'js/view/personalCenter/myOrder/tuikuan.js', 'js/view/personalCenter/myOrder/gaiqianConfirm.js', 'js/view/personalCenter/myOrder/tuipiao.js', 'js/view/personalCenter/myOrder/gaiqianList.js', 'js/view/personalCenter/myInfo/personalInfo.js', 'js/view/personalCenter/myInfo/nickname.js', 'js/view/personalCenter/myInfo/receiver.js', 'js/view/personalCenter/myInfo/addReceiver.js', 'js/view/personalCenter/myInvoice/invoice.js', 'js/view/personalCenter/myInvoice/addInvoice.js', 'js/view/personalCenter/myPassengers/passengers.js', 'js/view/personalCenter/myPassengers/addPerson.js', 'js/view/personalCenter/danju.js', 'js/view/personalCenter/backlog.js', 'js/view/personalCenter/bangding.js', 'js/view/personalCenter/defaultDept.js', 'js/view/personalCenter/myOrder/jdOrderDetail.js', 'js/view/personalCenter/myOrder/trOrderDetail.js', 'js/view/personalCenter/myOrder/trainTuipiao.js'], function(angular) {
	//	backlog public.css
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('personalCenter.css');

	var personalCenter = angular.module('personalCenter', ['myOrder', 'orderRefunds', 'gaiqianDetail', 'tuipiaoDetail', 'tuikuan', 'gaiqianConfirm', 'tuipiao', 'gaiqianList', 'personalInfo', 'nickname', 'receiver', 'addReceiver', 'invoice', 'addInvoice', 'passengers', 'addPerson', 'danju', 'backlog', 'bangding', 'jdOrderDetail', 'defaultDept','trOrderDetail','trainTuipiao']);
	personalCenter.run(function($http) {
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
	});
	personalCenter.config(function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/personalCenter/orderRefunds', {
			templateUrl: 'templates/personalCenter/myOrder/orderRefunds.html'
		}).
		when('/personalCenter/tuipiaoDetail', {
			templateUrl: 'templates/personalCenter/myOrder/tuipiaoDetail.html'
		}).
		when('/personalCenter/tuikuan', {
			templateUrl: 'templates/personalCenter/myOrder/tuikuan.html'
		}).
		when('/personalCenter/gaiqianDetail', {
			templateUrl: 'templates/personalCenter/myOrder/gaiqianDetail.html'
		}).
		when('/personalCenter/gaiqianConfirm', {
			templateUrl: 'templates/personalCenter/myOrder/gaiqianConfirm.html'
		}).
		when('/personalCenter/tuipiao', {
			templateUrl: 'templates/personalCenter/myOrder/tuipiao.html'
		}).
		when('/personalCenter/gaiqianList', {
			templateUrl: 'templates/personalCenter/myOrder/gaiqianList.html'
		}).
		when('/personalCenter/nickname', {
			templateUrl: 'templates/personalCenter/myInfo/nickname.html'
		}).
		when('/personalCenter/receiver', {
			templateUrl: 'templates/personalCenter/myInfo/receiver.html'
		}).
		when('/personalCenter/addReceiver', {
			templateUrl: 'templates/personalCenter/myInfo/addReceiver.html'
		}).
		when('/personalCenter/addPerson', {
			templateUrl: 'templates/personalCenter/myPassengers/addPerson.html'
		}).
		when('/personalCenter/danju', {
			templateUrl: 'templates/personalCenter/danju.html'
		}).
		when('/personalCenter/backlog', {
			templateUrl: 'templates/personalCenter/backlog.html'
		}).
		when('/personalCenter/bangding', {
			templateUrl: 'templates/personalCenter/bangding.html'
		}).
		when('/personalCenter/addInvoice', {
			templateUrl: 'templates/personalCenter/myInvoice/addInvoice.html'
		}).
		when('/personalCenter/defaultDept', {
			templateUrl: 'templates/personalCenter/defaultDept.html'
		}).
		when('/personalCenter/jdOrderDetail', {
			templateUrl: 'templates/personalCenter/myOrder/jdOrderDetail.html'
		}).
		when('/personalCenter/trOrderDetail', {
			templateUrl: 'templates/personalCenter/myOrder/trOrderDetail.html'
		}).
		when('/personalCenter/trainTuipiao', {
			templateUrl: 'templates/personalCenter/myOrder/trainTuipiao.html'
		}).
		otherwise({
			redirectTo: '/personalCenter/myOrder'
		});
	});
	personalCenter.controller('personalCtrl', function($scope, $http, $location, airfarePublic, publicmodel, $mdDialog) {
		//机票退票改签原因
		$scope.reasons = [
			'行程改变',
			'下单时选错日期/航班',
			'下单时填错乘机人/联系人信息',
			'在其他渠道发现更优惠的机票',
			'航班延误或取消，航班时刻变更',
			'其他'
		];
		//火车票退票改签原因
		$scope.trainReasons = [
			'行程改变',
			'下单时选错日期/车次',
			'下单时填错乘车人/联系人信息',
			'在其他渠道发现更优惠的票',
			'火车延误或取消',
			'其他'
		];
		// 接口联调开始
		//			if (publicmodel.Share.selectMode == true) {
		//				$scope.go(publicmodel.Share.toUrl);
		//			}
		// 接口联调结束

		//弹出提示框
		$scope.showConfirm = function(ev, title, content, ok, cancel, okFunction, cacelFunction) {
			var confirm = $mdDialog.confirm()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
				.cancel(cancel);
			$mdDialog.show(confirm).then(function() {
				if (okFunction) {
					okFunction();
				}
			}, function() {
				if (cacelFunction) {
					cacelFunction();
				}
			});
		};
		$scope.showAlert = function(ev, title, content, ok, okFunction) {
			var alert = $mdDialog.alert()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
			$mdDialog.show(alert).then(function() {
				if (okFunction) {
					okFunction();
				}
			});
		};
		//			        $scope.tijiaoAlert = function(event) {
		//				      $mdDialog.show({
		//				          scope: $scope,      
		//				          preserveScope: true, 
		//				          template: '<div class="airfareTijiaoAlert">' +
		//				                    '	正在提交中...' +
		//				                    '</div>',
		//		     			});
		//					};
		//弹出提示框结束
	});
	personalCenter.filter('parseInt', function() {
		return function(hours) {
			return parseInt(hours)
		}
	});

	//预订单
	personalCenter.filter('getOrderStatus', function() {
		return function(orderStatus) {
			switch (orderStatus) {
				case 1:
					return '待支付';
				case 2:
					return '出票中';
				case 3:
					return '出票成功';
				case 4:
					return '订单已取消';
				case 5:
					return '出票失败';
				default:
					return '未知';
			}
		}
	});
	//退订单
	personalCenter.filter('tuiOrderStatus', function() {
		return function(orderStatus) {
			switch (orderStatus) {
				case 1:
					return '待退票';
				case 2:
					return '退票受理中';
				case 3:
					return '退票成功';
				case 4:
					return '订单已取消';
				case 5:
					return '退票失败';
				default:
					return '未知';
			}
		}
	});
	//改签单
	personalCenter.filter('gaiOrderStatus', function() {
		return function(orderStatus) {
			switch (orderStatus) {
				case 1:
					return '待改签';
				case 2:
					return '改签受理中';
				case 3:
					return '改签成功';
				case 4:
					return '订单已取消';
				case 5:
					return '改签失败';
				default:
					return '未知';
			}
		}
	});
	personalCenter.filter('getJdOrderStatus', function() {
		return function(orderStatus) {
			switch (orderStatus) {
				case 1:
					return '待确认';
				case 2:
					return '已作废';
				case 3:
					return '预订中';
				case 4:
					return '预订成功';
				case 5:
					return '已成交';
				case 6:
					return '订单已取消';
				case 7:
					return '预订失败';
				default:
					return '未知';
			}
		}
	});
	//	personalCenter.filter('statuscolor', function() {
	//		return function(status) {
	//			switch (status) {
	//				case '机票':
	//					return '#ff39aa';
	//				case '酒店':
	//					return 'royalblue';
	//				case '火车票':
	//					return '#4caf50';
	//				default:
	//					return '#fff';
	//			}
	//		}
	//
	//	});
	personalCenter.filter('getProcessstatus', function() {
		return function(code) {
			//废弃：00 草稿：10 驳回：11 撤回：12 审批中：20 流程出错：21 流程发布：30；
			switch (code) {
				case '00':
					return '废弃';
					break;
				case '10':
					return '草稿';
					break;
				case '11':
					return '驳回';
					break;
				case '12':
					return '撤回';
					break;
				case '20':
					return '审批中';
					break;
				case '21':
					return '流程出错';
					break;
				case '30':
					return '流程发布';
					break;
				default:
					return '未知';
					break;
			}
			//			return $sce.trustAsHtml(html);
		}
	});
	personalCenter.filter('getCertType', function() {
		return function(certType) {
			switch (certType) {
				case 1:
					return '身份证';
				case 2:
					return '台湾通行证(台胞证)';
				case 3:
					return '港澳通行证';
				case 4:
					return '回乡证';
				case 5:
					return '护照';
				default:
					return '身份证';
			}
		}
	});

	personalCenter.filter('getDanJuOrderstatus', function() {
		return function(status) {
			switch (status) {
				case 'DRAFT':
					return '草稿';
				case 'SUBMITED':
					return '待审批';
				case 'AUDITED':
					return '已审批';
				case 'DISABLED':
					return '已作废';
				default:
					return '未知状态';
			}
		}

	});
	//	personalCenter.filter('statuscolor', function() {
	//		return function(status) {
	//			switch(status) {
	//				case 'DRAFT':
	//					return 'lightgray';
	//				case 'SUBMITED':
	//					return '#4caf50';
	//				case 'AUDITED':
	//					return 'dodgerblue';
	//				case 'DISABLED':
	//					return '#f44336';
	//				default:
	//					return 'palegreen';
	//			}
	//		}
	//
	//	});
	personalCenter.filter('getVendor', function() {
		return function(vendorNum) {
			switch (vendorNum) {
				case 100:
					return '美亚';
				case 200:
					return '携程';
				case 300:
					return '一起飞';
				default:
					return '未知';
			}
		}
	});
	personalCenter.filter('getTicketTrainStatus', function() {
		return function(ticketStatus) {
			switch(ticketStatus) {
				case 1:
					return '待出票';
				case 2:
					return '出票中';
				case 3:
					return '已出票';
				case 4:
					return '出票失败';
				case 5:
					return '退票中';
				case 6:
					return '退票失败';
				case 7:
					return '已退票';
				default:
					return '未知';
			}
		}
	});
	personalCenter.filter('getTicketInstanceStatus', function() {
		return function(ticketStatus) {
			switch (ticketStatus) {
				case 1:
					return '待出票';
				case 2:
					return '已出票';
				case 3:
					return '待退票';
				case 4:
					return '已退票';
				case 5:
					return '待改签';
				case 6:
					return '已改签';
				default:
					return '未知';
			}
		}
	});
	personalCenter.factory('fileReader', ["$q", "$log", function($q, $log) {
		var onLoad = function(reader, deferred, scope) {
			return function() {
				scope.$apply(function() {
					deferred.resolve(reader.result);
				});
			};
		};
		var onError = function(reader, deferred, scope) {
			return function() {
				scope.$apply(function() {
					deferred.reject(reader.result);
				});
			};
		};
		var getReader = function(deferred, scope) {
			var reader = new FileReader();
			reader.onload = onLoad(reader, deferred, scope);
			reader.onerror = onError(reader, deferred, scope);
			return reader;
		};
		var readAsDataURL = function(file, scope) {
			var deferred = $q.defer();
			var reader = getReader(deferred, scope);
			reader.readAsDataURL(file);
			return deferred.promise;
		};
		return {
			readAsDataUrl: readAsDataURL
		};
	}]);
	//文件上传
	personalCenter.directive('fileModel', ['$parse', function($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs, ngModel) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
				element.bind('change', function(event) {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
					//附件预览
					scope.file = (event.srcElement || event.target).files[0];
					scope.getFile();
				});
			}
		};
	}]);
	personalCenter.directive('airfareorder', function() {
		return {
			restrict: 'EA',
			templateUrl: 'view/personalCenter/airfareOrder.html',
		}
	}).directive('jiudianorder', function() {
		return {
			restrict: 'EA',
			templateUrl: 'view/personalCenter/jiudianOrder.html'
		}
	}).directive('trainorder', function() {
		return {
			restrict: 'EA',
			templateUrl: 'view/personalCenter/trainOrder.html'
		}
	});

	angular._LoadModule('personalCenter');
	console.log('personalCenter loaded');
	return personalCenter;

});