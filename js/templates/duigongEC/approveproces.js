/**
 * Created by chao on 2016-05-18.
 */
define(['angular', 'js/templates/feeapply/filter', 'js/shared/process','js/shared/processoperation'], function(angular, filters) {
	publicFunction.addStyle('feeapply.css');
	var app = angular.module('mdapproveproces', ['mdfeeapplyfilter', 'mdproceslist','mdprocessoperation']);

	app.controller('approveprocesCtrl', ['$scope', '$routeParams', 'baseconfig', '$http', '$mdDialog', function($scope, $routeParams, baseconfig, $http, $mdDialog) {
		console.log($routeParams.id);
		$scope.forminstanceid = null;
		$scope.formtemplateid = null;
		$scope.modelid = $routeParams.modelid;
		//流程节点
		$scope.processlsit = [];
		//获取申请表单信息
		if($routeParams.id) {
			$scope.currency = baseconfig.currencys;
			$http({
				method: 'POST',
				url: feelapplyUrl + 'ea/feeApply/getFeeApplyById',
				data: {
					"tenant_id": null,
					"user_id": null,
					"fee_apply_id": $routeParams.id
				}
			}).success(function(data, status, headers, config) {
				console.log(data);
				if(data.code == "0000") {
					data.data.emseaapplyh.apply_date = new Date(data.data.emseaapplyh.apply_date);
					angular.forEach(data.data.emseaapplyh.emseaapplytravelds, function(date) {
						date.start_date = new Date(date.start_date);
						date.end_date = new Date(date.end_date);
					});
					$scope.applyinfo = data;
					$scope.forminstanceid = data.data.emseaapplyh.formInstanceId;
					$scope.formtemplateid = data.data.emseaapplyh.form_template_id;
					console.log($scope.applyinfo);
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').textContent(data.msg).ok('关闭'));
				}

			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}
//		/*审批*/
//		$scope.onApprove = function() {
//				console.log('pressProcess');
//				$http({
//					method: 'POST',
//					url: feelapplyUrl + 'wf/process/approve',
//					data: {
//						"formInstanceId": $scope.applyinfo.data.emseaapplyh.formInstanceId,
//						"template_form_id": $scope.applyinfo.data.emseaapplyh.form_template_id,
//						"model_id": $scope.modelid,
//						'auditNote': '同意',
//						'language': 'zh_CN',
//					},
//					headers: {
//						'x-auth-token': sessionStorage.Token
//					},
//
//				}).success(function(data, status, headers, config) {
//					console.log(data);
//					var msg = ""
//					if(data.code == "0000") {
//						msg = "操作成功";
//					} else {
//						msg = '异常:' + data.msg + "(" + data.code + ")";
//					}
//					$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
//				}).error(function(data, status, headers, config) {
//					console.log('opiioio');
//				});
//			}
//			/*转办*/
//		$scope.onCommiss = function() {
//			console.log('驳回refuse');
//			$http({
//				method: 'POST',
//				url: feelapplyUrl + 'wf/process/commiss',
//				data: {
//					'auditNote': '驳回',
//					'formInstanceId': $scope.applyinfo.data.emseaapplyh.formInstanceId,
//					'model_id': $scope.modelid,
//					'toOtherHandlerIds': '27203734035496960',
//					'template_form_id': $scope.applyinfo.data.emseaapplyh.form_template_id,
//				},
//				headers: {
//					'x-auth-token': sessionStorage.Token
//				},
//
//			}).success(function(data, status, headers, config) {
//				console.log(data);
//				var msg = ""
//				if(data.code == "0000") {
//					msg = "操作成功";
//				} else {
//					msg = '异常:' + data.msg + "(" + data.code + ")";
//				}
//				$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
//			}).error(function(data, status, headers, config) {
//				console.log('opiioio');
//			});
//		}
//
//		/*沟通*/
//		$scope.onCommunicate = function() {
//			console.log('沟通refuse');
//			$http({
//				method: 'POST',
//				url: feelapplyUrl + 'wf/process/communicate',
//				data: {
//					'auditNote': '沟通',
//					'formInstanceId': $scope.applyinfo.data.emseaapplyh.formInstanceId,
//					'model_id': $scope.modelid,
//					'isHiddenNote': false,
//					'template_form_id': $scope.applyinfo.data.emseaapplyh.form_template_id,
//					'isMutiCommunicate': true,
//					'toOtherHandlerIds': '27203734035496960',
//				},
//				headers: {
//					'x-auth-token': sessionStorage.Token
//				},
//
//			}).success(function(data, status, headers, config) {
//				console.log(data);
//				var msg = ""
//				if(data.code == "0000") {
//					msg = "操作成功";
//				} else {
//					msg = '异常:' + data.msg + "(" + data.code + ")";
//				}
//				$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
//			}).error(function(data, status, headers, config) {
//				console.log('opiioio');
//			});
//		}
	}]);
	//angular._LoadModule('mdapproveproces');
	//return app;
});