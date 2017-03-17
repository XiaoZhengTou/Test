define(['angular', 'js/shared/organization.js'], function(angular, org) {
	var app = angular.module('mdprocessoperation', ['mdorganization']);
	app.directive('ngProcessoperation', ['$http', '$mdDialog', '$parse', '$mdBottomSheet', function($http, $mdDialog, $parse, $mdBottomSheet) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			templateUrl: 'templates/shared/Permission.html',
			'scope': {
				'processlsit': '=',
				'forminstanceid': '=',
				'formtemplateid': '=',
				'modelid': '=',
			},
			controller: function($scope) {

			},
			link: function(scope, element, attrs) {
				//获取可操作列表
				var forminstanceid = null;
				var modelid = null;
				var formtemplateid = null;
				scope.$watch('forminstanceid', function(newValue, oldValue, scope) {
					if(newValue) {
						forminstanceid = newValue;
						scope.opertionlist();
					}
				});
				scope.$watch('modelid', function(newValue, oldValue, scope) {
					if(newValue) {
						modelid = newValue;
						scope.opertionlist();
					}
				});
				scope.$watch('formtemplateid', function(newValue, oldValue, scope) {
					if(newValue) {
						formtemplateid = newValue;
						scope.opertionlist();
					}
				});
				scope.oplist = [];
				scope.opertionlist = function() {
					if(forminstanceid && modelid && formtemplateid) {
						/*获取可操作列表*/
						$http({
							method: 'POST',
							url: APP_CONFIG.SMART_URL + 'wf/process/oplist',
							data: {
								'formInstanceId': forminstanceid,
								'model_id': modelid,
								'template_form_id': formtemplateid,
							},
							headers: {
								'x-auth-token': sessionStorage.Token
							},

						}).success(function(data, status, headers, config) {
							console.log(data);
							/*权限树*/
							angular.forEach(data.data, function(data1, index, array) {
								if(data1.activityType == attrs.activitytype) {
									angular.forEach(data1.operations, function(data2, index, array) {
										scope.oplist.push(data2.operationType);
									});
								}
							});
							console.log(scope.oplist);

						}).error(function(data, status, headers, config) {

						});
						
						/*获取操作参数*/
						$http({
							method: 'POST',
							url: APP_CONFIG.SMART_URL + '/wf/process/opparam',
							data: {
								'formInstanceId': forminstanceid,
								'model_id': modelid,
								'template_form_id': formtemplateid,
								'approveType':'handler_cancelCommunicate',
							},
							headers: {
								'x-auth-token': sessionStorage.Token
							},
						}).success(function(data, status, headers, config) {
							console.log('获取操作参数');
							console.log(data);
						}).error(function(data, status, headers, config) {

						});
					}

				}
				scope.onHideBottomSheet = function() {
						$mdBottomSheet.hide();
					}
					/*审批批准*/
				scope.onOpenApprove = function(ev) {
						$mdBottomSheet.show({
							templateUrl: 'templates/process/dialog/approve.html',
							controller: function(scope) {
								/*审批意见*/
								scope.approveauditNote = null;
								scope.onApprove = function(ev) {
									$mdDialog.show($mdDialog.alert().title('提交结果').textContent('审批成功-测试用').ok('关闭'));
									if(forminstanceid && formtemplateid && modelid && false) {
										$http({
											method: 'POST',
											url: APP_CONFIG.SMART_URL + 'wf/process/approve',
											data: {
												"formInstanceId": forminstanceid,
												"template_form_id": formtemplateid,
												"model_id": modelid,
												'auditNote': scope.approveauditNote,
												'language': 'zh_CN',
											},
											headers: {
												'x-auth-token': sessionStorage.Token
											},
										}).success(function(data, status, headers, config) {
											console.log(data);
											var msg = ""
											if(data.code == "0000") {
												msg = "操作成功";
												$mdBottomSheet.hide();
											} else {
												msg = '' + data.msg + "(" + data.code + ")";
											}
											$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
										}).error(function(data, status, headers, config) {

										});
									}
								}
							}
						}).then(function(clickedItem) {
							$scope.alert = clickedItem['name'] + ' clicked!';
						});
					}
					/*审批转办*/
				scope.onOpenCommiss = function(ev) {
					$mdBottomSheet.show({
						templateUrl: 'templates/process/dialog/commiss.html',
						controller: function(scope) {
							scope.approveauditNote = null;
							scope.users = [];
							scope.onCommiss = function(ev) {
								var strUsers = [];
								//取user_id转存为数组
								angular.forEach(scope.users, function(data) {
									strUsers.push(data.user_id);
								});
								console.log(strUsers.toString());
								$mdDialog.show($mdDialog.alert().title('提交结果').textContent('审批转办-测试用').ok('关闭'));
								if(false) {
									$http({
										method: 'POST',
										url: APP_CONFIG.SMART_URL + 'wf/process/commiss',
										data: {
											'auditNote': scope.approveauditNote,
											'formInstanceId': forminstanceid,
											'model_id': modelid,
											'toOtherHandlerIds': strUsers.toString(),
											'template_form_id': formtemplateid,
										},
										headers: {
											'x-auth-token': sessionStorage.Token
										},
									}).success(function(data, status, headers, config) {
										console.log(data);
										var msg = ""
										if(data.code == "0000") {
											msg = "操作成功";
										} else {
											msg = '' + data.msg + "(" + data.code + ")";
										}
										$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
									}).error(function(data, status, headers, config) {
										console.log('opiioio');
									});
								}
							}
						}
					}).then(function(clickedItem) {
						$scope.alert = clickedItem['name'] + ' clicked!';
					});

				}

				/*审批沟通*/
				scope.onOpenCommunicate = function(ev) {
					$mdBottomSheet.show({
						templateUrl: 'templates/process/dialog/communicate.html',
						controller: function(scope) {
							scope.approveauditNote = null;
							scope.users = [];
							scope.isHiddenNote = false;
							scope.isMutiCommunicate = false;
							scope.onCommunicate = function() {
								console.log('沟通refuse');
								var strUsers = [];
								//取user_id转存为数组
								angular.forEach(scope.users, function(data) {
									strUsers.push(data.user_id);
								});
								//$mdDialog.show($mdDialog.alert().title('提交结果').textContent('审批转办-测试用').ok('关闭'));
								//if(false) {
								$http({
									method: 'POST',
									url: APP_CONFIG.SMART_URL + 'wf/process/communicate',
									data: {
										'auditNote': '沟通',
										'formInstanceId': forminstanceid,
										'model_id': modelid,
										'isHiddenNote': scope.isHiddenNote,
										'template_form_id': formtemplateid,
										'isMutiCommunicate': scope.isMutiCommunicate,
										'toOtherHandlerIds': strUsers.toString(),
									},
									headers: {
										'x-auth-token': sessionStorage.Token
									},

								}).success(function(data, status, headers, config) {
									console.log(data);
									var msg = ""
									if(data.code == "0000") {
										msg = "操作成功";
									} else {
										msg = '' + data.msg + "(" + data.code + ")";
									}
									$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
								}).error(function(data, status, headers, config) {

								});
								//}

							}
						}
					}).then(function(clickedItem) {
						$scope.alert = clickedItem['name'] + ' clicked!';
					});

				}

				/*取消沟通*/
				scope.onCelcommunicate = function() {
					console.log('取消沟通refuse');
					$http({
						method: 'POST',
						url: APP_CONFIG.SMART_URL + 'wf/process/celcommunicate',
						data: {
							'auditNote': '取消沟通',
							'formInstanceId': forminstanceid,
							'model_id': modelid,
							'template_form_id': formtemplateid,
							'cancelHandlerIds': 'u27203734035496960',
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						},

					}).success(function(data, status, headers, config) {
						console.log(data);
						var msg = ""
						if(data.code == "0000") {
							msg = "操作成功";
						} else {
							msg = '' + data.msg + "(" + data.code + ")";
						}
						$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
					}).error(function(data, status, headers, config) {

					});
				}

				/*回复沟通*/
				scope.onRecommunicate = function() {
					console.log('回复沟通refuse');
					$http({
						method: 'POST',
						url: APP_CONFIG.SMART_URL + 'wf/process/recommunicate',
						data: {
							'auditNote': '取消沟通',
							'formInstanceId': forminstanceid,
							'model_id': modelid,
							'template_form_id': formtemplateid,
						},
						headers: {
							'x-auth-token': sessionStorage.Token
						},
					}).success(function(data, status, headers, config) {
						console.log(data);
						var msg = ""
						if(data.code == "0000") {
							msg = "操作成功";
						} else {
							msg = '' + data.msg + "(" + data.code + ")";
						}
						$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
					}).error(function(data, status, headers, config) {

					});
				}

				/*催办*/
				scope.onShowPressProcess = function() {
						$mdBottomSheet.show({
							templateUrl: 'templates/process/dialog/press.html',
							controller: function(scope) {
								scope.approveauditNote = null;
								scope.onPressProcess = function() {
									console.log('pressProcess');
									$http({
										method: 'POST',
										url: APP_CONFIG.SMART_URL + 'wf/process/press',
										data: {
											"auditNote": approveauditNote,
											"formInstanceId": forminstanceid,
											"template_form_id": formtemplateid,
											"model_id": modelid,
										},
										headers: {
											'x-auth-token': sessionStorage.Token
										},

									}).success(function(data, status, headers, config) {
										console.log(data);
										var msg = ""
										if(data.code == "0000") {
											msg = "操作成功";
										} else {
											msg = '' + data.msg + "(" + data.code + ")";
										}
										$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
									}).error(function(data, status, headers, config) {
										console.log('opiioio');
									});
								}
							}
						}).then(function(clickedItem) {});
					}
					/*撤回流程*/
				scope.onShowDrafterProcess = function() {
						$mdBottomSheet.show({
							templateUrl: 'templates/process/dialog/drafterprocess.html',
							controller: function(scope) {
								scope.approveauditNote = null;
								scope.onDrafterProcess = function() {
									console.log('onShowDrafterProcess');
									$http({
										method: 'POST',
										url: APP_CONFIG.SMART_URL + 'wf/process/drafter',
										data: {
											"auditNote": approveauditNote,
											"formInstanceId": forminstanceid,
											"template_form_id": formtemplateid,
											"model_id": modelid,
										},
										headers: {
											'x-auth-token': sessionStorage.Token
										},

									}).success(function(data, status, headers, config) {
										var msg = ""
										if(data.code == "0000") {
											msg = "操作成功";
										} else {
											msg = '' + data.msg + "(" + data.code + ")";
										}
										$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
									}).error(function(data, status, headers, config) {
										console.log('opiioio');
									});
								}
							}
						}).then(function(clickedItem) {});
					}
					/*作废流程*/
				scope.onShowDrafterProcess = function() {
					$mdBottomSheet.show({
						templateUrl: 'templates/process/dialog/abandon.html',
						controller: function(scope) {
							scope.approveauditNote = null;
							scope.onAbandonProcess = function() {
								console.log('onAbandonProcess');
								$http({
									method: 'POST',
									url: APP_CONFIG.SMART_URL + 'ea/feeApply/disableFeeApply',
									data: {
										"tenant_id": "12",
										"user_id": "12",
										"fee_apply_id": '40267306269409280',
									},
									headers: {
										'x-auth-token': sessionStorage.Token
									},

								}).success(function(data, status, headers, config) {
									var msg = ""
									if(data.code == "0000") {
										msg = "操作成功";
									} else {
										msg = '' + data.msg + "(" + data.code + ")";
									}
									$mdDialog.show($mdDialog.alert().title('提交结果').textContent(msg).ok('关闭'));
								}).error(function(data, status, headers, config) {
									console.log('opiioio');
								});
							}
						}
					}).then(function(clickedItem) {});
				}
			}
		}
	}]);
	return app;
});