/**
 * Created by chao on 2016/6/21.
 * 供应商类型
 */
define(['angular'], function(angular) {
	var app = angular.module('mdvendor', []);
	//组织架构
	app.directive('drVendor', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			template: '<div ng-show="true"><md-input-container style="width: 100%;">' +
				'<label>{{titlename}}</label>' +
				'<md-select ng-required="ngrequired" placeholder="供应商" ng-model="vendormodel" >' +
				'<md-option ng-selected="item.vendor_name==vendorname" ng-value="item" ng-repeat="item in vendoritem.data.info">{{item.vendor_name}}</md-option>' +
				'</md-select></md-input-container></div>',
			'scope': {
				/*绑定的数据*/
				'vendormodel': '=',
				'titlename': '=',
				'vendorname': '=',
				'vendoraddress': '=',
				'ngrequired': '='
			},
			controller: function($scope) {
				$scope.loaditem = function() {
					console.log($scope.vendormodel);
					$http({
						method: 'GET',
						url: APP_CONFIG.SMART_URL + '/cm/userCenter/getDefaultConfig',
						headers: {
							'x-auth-token': sessionStorage.Token
						},
					}).success(function(data, status, headers, config) {
						console.log(data);
						if(data.code = "000" && data.data.company.company_id) {
							$http({
								method: 'POST',
								url: APP_CONFIG.JIEBAO_URL + '/docker/vendor/select',
								headers: {
									'x-auth-token': sessionStorage.Token
								},
								data: {
									'company_id': data.data.company.company_id,
									'page_number': 1,
									'page_size': 1000,
									'vendor_code': null,
									'vendor_name': null,
								},
							}).success(function(data, status, headers, config) {
								console.log(data);
								$scope.vendoritem = data;
							}).error(function(data, status, headers, config) {
								console.log(data);
							});
						}

					});

				};
				$scope.$watch('vendormodel', function(data) {
					if(data) {
						console.log(data);
						$scope.vendorname = data.vendor_name;
						$scope.vendoraddress = data.vendor_site_name;
					}

				});
				$scope.loaditem();
			},
			link: function(scope, element, attrs) {
				console.log(212);
			}
		}
	}]);
	app.directive('drVendorext', ['$mdMedia', '$mdDialog', '$http', '$filter', function($mdMedia, $mdDialog, $http, $filter) {
		return {
			restrict: 'A',
			//replace: true,
			scope: {
				/*绑定的数据*/
				'vendorlist': '=',
			},
			link: function(scope, element, attrs) {
				scope.loaditem = function() {
					$http({
						method: 'GET',
						url: APP_CONFIG.SMART_URL + '/cm/userCenter/getDefaultConfig',
						headers: {
							'x-auth-token': sessionStorage.Token
						},
					}).success(function(data, status, headers, config) {
						console.log("用户默认配置");
						console.log(data);
						if(data.code = "0000" && data.data.company.company_id) {
							$http({
								method: 'POST',
								url: APP_CONFIG.JIEBAO_URL + '/docker/vendor/select',
								headers: {
									'x-auth-token': sessionStorage.Token
								},
								data: {
									'company_id': data.data.company.company_id,
									'page_number': 1,
									'page_size': 1000,
									'vendor_code': null,
									'vendor_name': null,
								},
							}).success(function(vendordata, status, headers, config) {
								console.log(vendordata);
								if(vendordata.code == "0000") {
									scope.vendorlist = vendordata;
								} else {
									$mdDialog.show($mdDialog.alert().title('提示').textContent(vendordata.msg + "("+
										vendordata.code + ")").ariaLabel('提交结果').ok('关闭'));

								}

							}).error(function(data, status, headers, config) {
								console.log(data);
							});
						} else {
							$mdDialog.show($mdDialog.alert().title('提示').textContent(data.msg + "("+
								data.code + ")").ariaLabel('提交结果').ok('关闭'));

						}

					});

				};
				scope.loaditem();
			}
		}
	}]);
	return app;
});