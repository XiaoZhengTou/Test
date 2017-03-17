define(['angular'], function(angular) {
	var app = angular.module('mdfeeapplylist', [])
	.controller('zhibanlistctrl', ['$scope', '$http', '$filter', '$mdDialog','$mdMedia', function($scope, $http, $filter, $mdDialog,$mdMedia) {
			$scope.query = {
				order: 'name',
				limit: 10,
				page: 1,
				user_name: null,
				user_id: null,
				start_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
				end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
				company_id:null,
				sche_year:null
			};
			$scope.loadData = function() {
				var param = {
					"end_date": $filter('date')($scope.query.end_date, 'yyyy-MM-dd'),
					'sche_year':null,
					"strat_date": $filter('date')($scope.query.start_date, 'yyyy-MM-dd'),
					"user_name": null,
					"user_id": null,
					"page_number": $scope.query.page,
					"page_size": $scope.query.limit,
				};
				$http({
					method: 'POST',
					url:APP_CONFIG.huisuanzhang + '/manage/personal/duty/page',
					headers: {
						'x-auth-token': sessionStorage.Token
					},
					data: param
				}).success(function(data, status, headers, config) {
					console.log(data);
					if(data.code == "0000") {
						$scope.zhibanlist = data;
						angular.forEach($scope.zhibanlist.data.info, function(item) {
							item.apply_date = new Date(item.apply_date);
						});
						$scope.query.limit = data.data.pageSize;
						$scope.query.page = data.data.pageNumber;
					} else {
						$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
							.textContent('异常:' + data.msg + "(" + data.code + ")"));
					}

				}).error(function(data, status, headers, config) {
					console.log(data);
				});
			}
			$scope.loadData();

			$scope.selected = [];

		//日历设置
		$scope.showAdvanced = function(ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'templates/zhiban/rili.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			})
				.then(function(answer) {
					$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
					$scope.status = 'You cancelled the dialog.';
				});
		};
		function DialogController($scope, $mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
			};
		};


		$scope.onDelete = function(ev) {
			var confirm = $mdDialog.confirm().title('删除确认').textContent('确定删除此条数据？').ariaLabel('删除').targetEvent(ev).ok('删除').cancel('取消');
				$mdDialog.show(confirm).then(function() {
					console.log(confirm)
					console.log($scope.selected);
					var ids = [];
					for(var i in $scope.selected) {
						console.log($scope.selected[i].fee_apply_id);
						ids.push($scope.selected[i].fee_apply_id);
					}
					if(ids.length > 0) {
						$http({
							method: 'POST',
							url:APP_CONFIG.huisuanzhang + '/manage/personal/duty/page',
							data: {
								"user_name": null,
								"user_id": null,
								"fee_apply_ids": ids
							}
						}).success(function(data, status, headers, config) {
							console.log(data);
							if(data.code == "0000") {
								$scope.loadData();
							} else {
								$mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
									.textContent('异常:' + data.msg + "(" + data.code + ")"));
							}
						}).error(function(data, status, headers, config) {
							console.log(data);
						});
					} else {
						$mdDialog.show($mdDialog.alert().title('提示').ok('确定')
							.textContent('请至少选择一条数据'));
					}
				}, function() {
					$scope.status = 'You decided to keep your debt.';
				});
			};
			//编辑
			$scope.edit = function(ev,item) {
				console.log(item);
				var pageindex = $scope.pageindex;
				var pagesize = $scope.pagesize;
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
				$mdDialog.show({
					controller: DialogController2,
					templateUrl: 'templates/zhiban/quannian.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					fullscreen: useFullScreen
				})
					.then(function(item) {
						if(item !='' && item != undefined){
							$mdToast.show(
								$mdToast.simple()
									.textContent(item)
									.position('top right')
									.hideDelay(1500)
							);
						}
					});
				$scope.$watch(function() {
					return $mdMedia('xs') || $mdMedia('sm');
				}, function(wantsFullScreen) {
					$scope.customFullscreen = (wantsFullScreen === true);
				});
				function DialogController2($scope, $mdDialog) {
					$scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.numberChips=[];
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
					$scope.query = {
						order: 'name',
						limit: 10,
						page: 1,
						reason_desc: null,
						apply_name: null,
						begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
						end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
						order_status: null,
						fee_apply_code: null,
						zhidu_reim_code:null
					};
					$scope.answer = function(answer) {
						var getconfig = {
							method: 'PUT',
							url: APP_CONFIG.CDP_URL+'/docker/rest/u',
							headers: {
								'x-auth-token': $cookies.get("JSESSION")
							},
							data:{
								"note": $scope.resource.note,
								"status": $scope.resource.status,
								"name": $scope.resource.name,
								"url": $scope.resource.url,
								"id":$scope.resource.id
							}
						};
						$http(getconfig)
							.success(function(data, status, headers, config) {
								$scope.content=headers('x-auth-token');
								if($scope.content!=''&&$scope.content!=null){
									$cookies.put('JSESSION', $scope.content);
								}
								if(data.code=='0000'){
									//alert('修改成功！');
									$mdDialog.hide('修改成功！');
									getapp1(pageindex,pagesize);
								}else if(data.code=='0401'){
									if(data.msg == '未登录.'){
										$cookies.remove("managerId");
										$cookies.remove("tenantId");
										$cookies.remove("JSESSION");
										$cookies.remove("userId");
										window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
									}

								}else if(data.code=='6666'){

								}else{
									alert(data.msg)
								}

							})
							.error(function(data, status, headers, config) {
								//alert(status)
							});
					};

					$scope.delete = function(){
						var getconfig = {
							method: 'DELETE',
							url: APP_CONFIG.CDP_URL+'/docker/rest/d/'+$scope.resource.id,
							headers: {
								'x-auth-token': $cookies.get("JSESSION")
							}
						};
						$http(getconfig)
							.success(function(data, status, headers, config) {
								$scope.content=headers('x-auth-token');
								if($scope.content!=''&&$scope.content!=null){
									$cookies.put('JSESSION', $scope.content);
								}
								if(data.code=='0000'){
									//alert('删除成功！');
									$mdDialog.hide('删除成功！');
									getapp1(pageindex,pagesize);
								}else if(data.code=='0401'){
									if(data.msg == '未登录.'){
										$cookies.remove("managerId");
										$cookies.remove("tenantId");
										$cookies.remove("JSESSION");
										$cookies.remove("userId");
										window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
									}

								}else if(data.code=='6666'){

								}else{
									alert(data.msg)
								}

							})
							.error(function(data, status, headers, config) {
								//alert(status)
							});
					};

					$scope.resource = {
						"note": item.note,
						"status": item.status,
						"name": item.name,
						"url": item.url,
						"id":item.id
					};
				}
			}



			function success(desserts) {
				console.log('success');
				$scope.desserts = desserts;
			}

			$scope.getDesserts = function() {
				console.log($scope.query);
				$scope.loadData();
				//$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
			};

		}]);
	angular._LoadModule('mdfeeapplylist');
	return app;
});