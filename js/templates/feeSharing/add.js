define(['angular', 'js/shared/receving.js',,'js/shared/ruzhangdanwei.js','js/shared/dictitem.js','js/shared/currency.js','js/shared/budget.js'], function(angular) {

	var add = angular.module('add', ['angularMoment', 'md.receving','md.ruzhangdanwei','mddictitem','mdcurrency','mdbudget']);

	add.controller('fsAddCtrl', function($scope, $rootScope, $mdDialog, $mdMedia, $http, $cookies, $filter, jhkPublic, moment,$mdToast,$routeParams){
		// 初始化开始
		$scope.origindata = {
			'creation_date': new Date(),
			'orderType': [{
				'id': 'INTERNAL_COLLECTION',
				'name': '内部划收'
			}, {
				'id': 'ACCRUED',
				'name': '月度预提'
			}, {
				'id': 'APPORTION',
				'name': '费用分摊'
			}],
			'imp_erp_type': [{
					'id': 'GL',
					'name': '总账'
				}, {
					'id': 'AP',
					'name': '应付'
				}

			],
			'accountings': {
				'types': [{
					'id': 'DR',
					'name': '借'
				}, {
					'id': 'CR',
					'name': '贷'
				}],
				'create_time': $filter('date')(new Date(), "yyyy-MM-dd")
			},


		};
		
		
		//保存数据
		$scope.currency = {};
		$scope.vendor = {};
		$scope.ruzhangdanwei = {};
		$scope.receving = {};
		
		
		$scope.saveData = {
			'emscaapportionls':[],
			'apportion_amount':0,
			'form_template_id':null,
			'is_import_erp':true,
			'creation_date':$filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss")		
		};
		
		//流程审核人员列表 
		$scope.approvers = [
        	{'id':'1','name':'我是审批人','job':'经理','time':'2016-8-12','agreed':'同意'},
        	{'id':'1','name':'我是审批人','job':'经理','time':'2016-8-12','agreed':'同意'}
        ];
		
		


		//入账单位初始值
		$scope.receving = {};
		
		//预算树初始值
		$scope.budget = {};

		//获取表单模板ID
		var getTemplateId = function(){
			$http({
				method:'post',
				url:feelapplyUrl + 'cm/formTemplate/getFormTemplates',
				data:{
					'module_type':'CA',
					'order_type':'APPORTION'
				}
			}).success(function(response) {
				$scope.saveData.form_template_id = response.data.info[0].form_template_id;

			}).error(function(response) {
				console.log('请求失败!') ;
			});
		};
		
		getTemplateId();
		//获取表单模板ID结束

		//新增或者修改账务明细
		$scope.addOrEditAccount = function(ev, index) {
			var accountings = $scope.origindata.accountings;
			if (index != undefined && index != null) {
				var emscaapportionl = $scope.saveData.emscaapportionls[index]; //账务明细
				var nochange_amount = emscaapportionl.budget_amount;
				console.log(emscaapportionl);
			}else{
				var emscaapportionl = {};
			}
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'templates/feeSharing/add-accounting-dialog.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: useFullScreen
				})
				.then(function(answer) {
					if (index != undefined && index != null) {
						//answer.create_time = $filter('date')(new Date(), "yyyy-MM-dd");
						//修改一条账务明细
						$scope.saveData.apportion_amount = parseFloat($scope.saveData.apportion_amount) - parseFloat(nochange_amount) + parseFloat(answer.budget_amount);
						$scope.saveData.emscaapportionls.splice(index, 1, answer);
						//alert($scope.saveData.apportion_amount)
					} else {
						//添加一条账务明细
						answer.create_time = $filter('date')(new Date(), "yyyy-MM-dd");
						$scope.saveData.emscaapportionls.push(answer);
						$scope.saveData.apportion_amount += parseFloat(answer.budget_amount);
						
					}

				}, function() {
					//alert("关闭窗口");
				});
			$scope.$watch(function() {
				return $mdMedia('xs') || $mdMedia('sm');
			}, function(wantsFullScreen) {
				$scope.customFullscreen = (wantsFullScreen === true);
			});

			function DialogController($scope, $mdDialog) {
				$scope.emscaapportionl = emscaapportionl;
				$scope.accountings = accountings;
				$scope.budget = {};
				$scope.budget.org = {};
				$scope.budget.feetype = {};
				$scope.budget.node = {};
				console.log(".............");
				$scope.hide = function() {
					$mdDialog.hide();
				};
				$scope.cancel = function() {
					$mdDialog.cancel();
				};
				
				$scope.answer = function() {
					
					$scope.emscaapportionl.busi_org_id = $scope.budget.org.busi_org_id;
					$scope.emscaapportionl.fee_type_id = $scope.budget.feetype.fee_type_id;
					$scope.emscaapportionl.budget_node_id = $scope.budget.node.budget_node_id;
					$scope.emscaapportionl.busi_org_name = $scope.budget.org.busi_org_name;
					$scope.emscaapportionl.fee_type_name = $scope.budget.feetype.fee_type_name;//预算科目
					$scope.emscaapportionl.budget_node_desc = $scope.budget.node.budget_node_name;//预算单元
					//表单验证
					if($scope.emscaapportionl.busi_org_id==undefined || $scope.emscaapportionl.busi_org_id==null){
						$mdToast.show(
					      $mdToast.simple()
					        .textContent('请选择预算部门!')
					        .position('top right')
					        .hideDelay(3000)
					    );
						return false;
					}
					if($scope.emscaapportionl.fee_type_id==undefined || $scope.emscaapportionl.fee_type_id==null){
						$mdToast.show(
					      $mdToast.simple()
					        .textContent('请选择预算科目!')
					        .position('top right')
					        .hideDelay(3000)
					    );
						return false;
					}
					if($scope.emscaapportionl.budget_node_id==undefined || $scope.emscaapportionl.budget_node_id==null){
						$mdToast.show(
					      $mdToast.simple()
					        .textContent('请选择预算单元!')
					        .position('top right')
					        .hideDelay(3000)
					    );
						return false;
					}
					if($scope.emscaapportionl.debit_credit_type==undefined || $scope.emscaapportionl.debit_credit_type==null){
						$mdToast.show(
					      $mdToast.simple()
					        .textContent('请选择借货类型!')
					        .position('top right')
					        .hideDelay(3000)
					    );
						return false;
					}
					if($scope.emscaapportionl.budget_amount==undefined || $scope.emscaapportionl.budget_amount==null){
						$mdToast.show(
					      $mdToast.simple()
					        .textContent('预算金额不能为空!')
					        .position('top right')
					        .hideDelay(3000)
					    );
						return false;
					}
					//表单验证结束
					$mdDialog.hide($scope.emscaapportionl);
				};

			}
		};

		//删除账务明细
		$scope.delAccount = function(ev, index) {
			$scope.saveData.apportion_amount -= parseFloat($scope.saveData.emscaapportionls[index].budget_amount);

			$scope.saveData.emscaapportionls.splice(index, 1);

		}

		//保存一条分摊费用信息
		$scope.save = function() {
		
			//加入入账单位id
			$scope.saveData.company_id = $scope.ruzhangdanwei.company_id;
			
			//加入供应商名
			$scope.saveData.vendor_name   = $scope.receving.receiver;
			
			//加入供应商类型
			$scope.saveData.vendor_type = $scope.vendor.itemValue;
			
			//加入币种
			$scope.saveData.currency_code = $scope.currency.currency_code;
			$scope.saveData.currency_name = $scope.currency.currency_name;
			
			//验证功能
			//希望写成derictive形式的验证,样式和提示统一
			if($scope.userForm.orderType.$error.required){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('类型不能为空!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			if($scope.saveData.is_import_erp && $scope.userForm.companyName.$error.required){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('入账单位不能为空!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			if($scope.saveData.is_import_erp && $scope.userForm.erpType.$error.required){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('ERP类型不能为空!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			
			if($scope.saveData.is_import_erp && $scope.userForm.erpType.$error.required){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('ERP类型不能为空!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			
			if($scope.saveData.is_import_erp && $scope.userForm.vendorName.$error.required){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('供应商不能为空!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			
			if($scope.saveData.is_import_erp && ($scope.saveData.vendor_type==undefined||$scope.saveData.vendor_type==null)){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('供应商类型不能为空!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			
			if($scope.saveData.emscaapportionls.length<1){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('账务明细最少有一条!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			if($scope.saveData.currency_code==undefined||$scope.saveData.currency_code==null){
				$mdToast.show(
			      $mdToast.simple()
			        .textContent('请选择币种!')
			        .position('top right')
			        .hideDelay(3000)
			    );
				return false;
			}
			
			//验证结束
			
			$http({
				method: 'POST',
				url: feelapplyUrl + '/ca/EmsCaApportionH/save',
				data: {
						'emscaapportionh':$scope.saveData
				},
			}).success(function(data, status, headers, config) {
				if (data.code == "0000") {
					var textContent = $scope.saveData.apportion_id == undefined ? "保存成功!" : "修改成功!";
					$mdToast.show(
				      $mdToast.simple()
				        .textContent(textContent)
				        .position('top right')
				        .hideDelay(3000)
				    );
					
				} else {
					$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭').textContent('' + data.msg + '(' + data.code + ')'))
				}
				console.log($scope.emseaapplyh);
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
		}


		//修改一条分摊费用信息
		if ($routeParams.obj!=undefined &&  $routeParams.obj!=null && $routeParams.obj !="add") {
				var apportion_id= $routeParams.obj;
				var edit = function() {
					$http({
							method: 'get',
							url: feelapplyUrl + 'ca/EmsCaApportionH/get/'+apportion_id,
							
						})
						.success(function(response) {
							if (response.code == "0000"){
								$scope.saveData = response.data.emscaapportionh;
								$scope.ruzhangdanwei.company_name = $scope.saveData.company_name;
								$scope.receving.receiver = $scope.saveData.vendor_name;
								$scope.saveData.is_import_erp = !!$scope.saveData.imp_erp_type;
							} else {
								response.data.code;
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.body))
									.clickOutsideToClose(true)
									.title('提示信息')
									.textContent('访问服务器异常：' + response.code + response.msg)
									.ariaLabel('提示信息')
									.ok('确定')
								);
							}
						}).error(function() {
							console.log("shibai");
						});
				}

			edit();
        }
		
	});

	//add_next
	add.controller('fsAddNextCtrl', function($scope, $rootScope, $http) {
		//审批人模拟数据
		$scope.approvers = [{
			'id': '1',
			'node': 'N1',
			'role': '预算会计',
			'approver': '张三',
			'ways': '审批',
			'node_statu': '未审'
		}, {
			'id': '2',
			'node': 'N2',
			'role': '预算会计',
			'approver': '张三',
			'ways': '审批',
			'node_statu': '未审'
		}];

	});
})