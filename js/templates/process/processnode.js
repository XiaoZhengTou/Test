define(['angular'], function(angular, org) {
	var app = angular.module('mdprocesnode', []);
	app.directive('ngProcessnode', ['$http', '$mdDialog', function($http, $mdDialog) {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			priority:9,
			templateUrl: 'templates/process/processnode.html',
			'scope': {
				'processlsit': '=processlsit',
				'forminstanceid': '=',
				'formtemplateid': '=',
				'modelid': '='
			},
			link: function(scope, element, attrs) {
				var forminstanceid = null;
				var modelid = null;
				var formtemplateid = null;
				scope.result=null;
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
				scope.opertionlist = function() {
					scope.result={msg:'加载中...',code:9999};
					if(forminstanceid && modelid && formtemplateid) {
						$http({
							method: 'POST',
							url: APP_CONFIG.SMART_URL + '/wf/process/flowt',
							headers: {
								'x-auth-token': sessionStorage.Token
							},
							data: {
								"formInstanceId": forminstanceid,
								"template_form_id": formtemplateid,
								"model_id": modelid,
								"approveType":"drafter_submit"
							}
						}).success(function(response) {
							console.log(response);
							if(response.code == "0000") {
								scope.processlsit = response.data;
								for(var i in response.data) {
									response.data[i].prosenlist = [];
									if(response.data[i].fdNodeHandlers) {
										var fdNodeHandlers = response.data[i].fdNodeHandlers.split(',');
										var fdNodeHandlerNames = response.data[i].fdNodeHandlerNames.split(',');
										for(var j in fdNodeHandlers) {
											response.data[i].prosenlist.push({
												'full_path': null,
												'org_id': null,
												'org_name': null,
												'position_id': null,
												'position_name': null,
												'tenant_id': null,
												'user_full_name': fdNodeHandlerNames[j],
												'user_id': fdNodeHandlers[j],
												'user_mobile': null,
												'user_pinyin': null
											});
										}
									} else if(response.data[i].fdProessType.indexOf('起草') > -1) {
										response.data[i].prosenlist = [{
											'full_path': null,
											'org_id': null,
											'org_name': null,
											'position_id': null,
											'position_name': null,
											'tenant_id': null,
											'user_full_name': publicmodel.user.userName,
											'user_id': publicmodel.user.userId,
											'user_mobile': null,
											'user_pinyin': null
										}];
									}
								}
							} else {
								scope.result=response;
								$mdDialog.show($mdDialog.alert().title('提示信息')
									.textContent('异常：' + response.msg + '(' + response.code + ')')
									.ariaLabel('提示信息').ok('确定')
								);
							}
						}).error(function(data, status, headers, config) {
							console.log('opiioio');

						});
					}
				}
			}
		}
	}]);
	return app;
});