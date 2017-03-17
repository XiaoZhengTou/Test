define(['angular'], function(angular) {
	/*添加日常申请*/
	var app = angular.module('mdprocessSubmit', []);
	app.controller('processSubmitCtrl', ['$scope', '$mdMedia', '$mdDialog', '$location', '$routeParams', '$filter', '$http', function($scope, $mdMedia, $mdDialog, $location, $routeParams, $filter, $http) {
		//费用申请编号
		$scope.forminstanceid = $routeParams.formInstanceId;
		//费用申请表单编号
		$scope.formtemplateid = $routeParams.formid;
		$scope.modelid = $routeParams.modelid;
		//流程节点
		$scope.processlsit = [];
		console.log($scope.forminstanceid + "|" + $scope.formtemplateid + "|" + $scope.modelid);

		//提交流程
		$scope.onSubmitProcess = function() {
			if($scope.forminstanceid && $scope.formtemplateid && $scope.modelid) {
				/*判断流程节点中都存在审批人*/
				for(var u in $scope.processlsit) {
					if($scope.processlsit[u].prosenlist == 0) {
						$mdDialog.show($mdDialog.alert().title('提交结果')
							.textContent('亲，请为【' + $scope.processlsit[u].fdNodeName + '】节点选择审批人').ok('关闭'));
						return;
					}
				}
				console.log($scope.processlsit);
				var form = {
						"formInstanceId": $scope.forminstanceid,
						"template_form_id": $scope.formtemplateid,
						"model_id": $scope.modelid,
						"mustModifyHandler": {},
					}
					/*从数组对象中取相关的审批人转为可用的数据结构*/
				for(var i = 0; i < $scope.processlsit.length; i++) {
					var node_name = $scope.processlsit[i].fdNodeId;
					form.mustModifyHandler[node_name] = '';
					//判断"起草"节点，设置为默认登录的用户
//					if($scope.processlsit[i].fdProessType.indexOf('起草') > -1) {
//						form.mustModifyHandler[node_name] = publicmodel.user.userId;
//					} else {
						var struserid = [];
						for(var j in $scope.processlsit[i].prosenlist) {
							struserid.push($scope.processlsit[i].prosenlist[j].user_id);
						}
						form.mustModifyHandler[node_name] = struserid.join(',');
					//}
				}
				console.log(form);

				/*提交流程数据*/
				$http({
					method: 'POST',
					url: APP_CONFIG.SMART_URL + '/wf/process/submit',
					data: form,
					headers: {
						'x-auth-token': sessionStorage.Token
					}
				}).success(function(data, status, headers, config) {
					console.log(data);
					if(data.code == "0000") {
						console.log('提交流程成功');
						$location.url('/process/submitFinish');
					} else {
						$mdDialog.show($mdDialog.alert().parent(angular.element(document.body))
							.clickOutsideToClose(true)
							.title('提交结果').textContent('异常:' + data.msg + "(" + data.code + ")")
							.ariaLabel('提交结果').ok('关闭')
						);
					}
					console.log(data);
				}).error(function(data, status, headers, config) {
					console.log('opiioio');

				});
			} else {
				$mdDialog.show($mdDialog.alert().parent(angular.element(document.body))
					.clickOutsideToClose(true)
					.title('提交结果').textContent('提交流程失败：forminstanceid：' + $scope.forminstanceid + "|formtemplateid：" + $scope.formtemplateid + "|modelid：" + $scope.modelid)
					.ariaLabel('提交结果').ok('关闭')
				);
			}
		}
	}]);
});