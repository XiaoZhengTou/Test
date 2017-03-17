define(['angular', , 'moment', 'momentCN', 'ngMoment'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');

	var inspection = angular.module('inspection', ['angularMoment']);

	inspection.controller('inspectionCtrl', function($scope, baseconfig, $log, $mdDialog, $mdMedia, $http, $cookies, $filter, $mdToast, $location, $timeout, $mdEditDialog) {
		$scope.selected = [];
		$scope.queryTable = {
			appdata: [{
				'code': '115',
				'firstType': '凭证不规范',
				'secondType': '补助发票超过120天',
				'suggestion': '重新补充规范辅助发票',
				'comments': '补助发票的保鲜期是120天，请补票'
			}, {
				'code': '115',
				'firstType': '凭证不规范',
				'secondType': '补助发票超过120天',
				'suggestion': '重新补充规范辅助发票',
				'comments': '补助发票的保鲜期是120天，请补票'
			}, {
				'code': '115',
				'firstType': '凭证不规范',
				'secondType': '补助发票超过120天',
				'suggestion': '重新补充规范辅助发票',
				'comments': '补助发票的保鲜期是120天，请补票'
			}],
			limit: 5,
			page_number: 1,
			total: 25

		};

		$scope.query = {
			inspention: 'GT',
			filter: {
				inspentionList: [{
					'id': 'GT',
					'name': '沟通'
				}, {
					'id': 'TG',
					'name': '通过'
				}, {
					'id': 'BH',
					'name': '驳回'
				}],
				backMethodsList: [{
					'id': 'ZJ',
					'name': '直接返回'
				}, {
					'id': 'CS',
					'name': '重审返回'
				}]
			},
			addressList: '',
			increaseSug: '',
			communicationOpinion: '',
			sumDate: new Date(),
			backMethods: 'ZJ',
			addressListIfShow: false,
			dateIfShow: false,
			backMethodsIsShow: false
		}

		/*审批状态-start*/
		inspentionState($scope.query.inspention);

		function inspentionState(isShow) {
			switch (isShow) {
				case 'GT':
					$scope.query.addressListIfShow = true;
					$scope.query.dateIfShow = false;
					$scope.query.backMethodsIsShow = false;
					break;
				case 'TG':
					$scope.query.dateIfShow = true;
					$scope.query.addressListIfShow = false;
					$scope.query.backMethodsIsShow = false;
					$scope.sumDate = new Date();
					break;
				case 'BH':
					$scope.query.backMethodsIsShow = true;
					$scope.query.dateIfShow = false;
					$scope.query.addressListIfShow = false;
					break;
			}
		}
		$scope.inspentionChange = function() {
				inspentionState($scope.query.inspention);
			}
			/*审批状态-end*/

		/*提交审批-start*/
		$scope.commit = function() {
			$http({
				method: 'POST',
				url: APP_CONFIG.huisuanzhang+'task/SsTmTaskPool/approveTask',
				headers: {
					'x-auth-token': sessionStorage.Token
				},
				data: {
					'bucklePoints':12,
					'optionTypeIds':"[1,2,3]",
					'taskId':123123123
				},
			}).success(function(data, status, headers, config) {
				console.log(data);
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		};
		/*提交审批-end*/

		/*取消审批-start*/
		$scope.cancel = function() {
			alert("取消");
		}
		/*取消审批-end*/

		$scope.add = function(ev) {

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			$mdDialog.show({
					controller: DialogController22,
					templateUrl: 'view/inspection/select.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen
				})
				.then(function(item) {
					if (item != '' && item != undefined) {
						$mdToast.show(
							$mdToast.simple()
							.textContent(item)
							.position('top right')
							.hideDelay(1500)
						);
					}
				});

			/* $scope.$watch(function() {
			     return $mdMedia('xs') || $mdMedia('sm');
			 }, function(wantsFullScreen) {
			     $scope.customFullscreen = (wantsFullScreen === true);
			 });*/
			function DialogController22($scope, baseconfig) {

				$scope.query = {
					oneType: 'QB',
					filter: {
						inspentionList: [{
							'id': 'QB',
							'name': '全部'
						}, {
							'id': 'ZZLDJ',
							'name': '总账类单据'
						}, {
							'id': 'WB',
							'name': '舞弊'
						}, {
							'id': 'WFFYGL',
							'name': '违反费用管理方法'
						}, {
							'id': 'QT',
							'name': '其它'
						}, {
							'id': 'QPZBGF',
							'name': '凭证不规范'
						}, {
							'id': 'GLWT',
							'name': '管理问题'
						}, {
							'id': 'BZBJS',
							'name': '费用报账不及时'
						}, {
							'id': 'FPBHG',
							'name': '发票不合规'
						}, {
							'id': 'CBZ',
							'name': '超标准或制度报账'
						}, {
							'id': 'BGF',
							'name': '报销单填列不规范'
						}]
					},
					twoType: ''
				};

				$scope.find = function() {
					alert("查询");
				};

				$scope.selected = [];
				$scope.queryTable = {
					appdata: [{
						'code': '115',
						'firstType': '凭证不规范',
						'secondType': '补助发票超过120天',
						'suggestion': '重新补充规范辅助发票',
						'comments': '补助发票的保鲜期是120天，请补票',
						'suggestionWay': '驳回起草人'
					}, {
						'code': '115',
						'firstType': '凭证不规范',
						'secondType': '补助发票超过120天',
						'suggestion': '重新补充规范辅助发票',
						'comments': '补助发票的保鲜期是120天，请补票',
						'suggestionWay': '驳回起草人'
					}, {
						'code': '115',
						'firstType': '凭证不规范',
						'secondType': '补助发票超过120天',
						'suggestion': '重新补充规范辅助发票',
						'comments': '补助发票的保鲜期是120天，请补票',
						'suggestionWay': '驳回起草人'
					}],
					limit: 5,
					page_number: 1,
					total: 25

				};

			}

		}

	});
	angular._LoadModule('inspection');
	return inspection;
});