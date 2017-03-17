define(['angular'], function(angular) {
	var app = angular.module('muchoosepassengers',[]);
	publicFunction.addStyle('choosepassengers.css');
	app.directive('drchoosepassengers',function($mdDialog) {
		return {
			restrict: 'EA',
			replace: true,
			link: function($scope, element, attrs) {
				//console.log(element);
				console.log(element);
				function openDialog(event) {
					var jsonstr = attrs.drchoosepassengers;
					jsonstr = jsonstr.replace(/'/g, '\"');
					var modeldata = angular.fromJson(jsonstr);
					var models = modeldata.model.split('.');
					function DialogController($scope, $mdDialog,$http,publicmodel) {
						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						// 确认乘客选择
						$scope.setPassengers = function(){
							$mdDialog.hide($scope.selected);
							publicmodel.Passengers = $scope.selected;
						}
						// 请求数据开始
						$scope.selected = publicmodel.Passengers;
						var url = ShangLvUrl + '/data/flight/getCommonPassengerList.do';
						$scope.loader = true;
						$http({
								method: 'GET',
								noLoader:true,
								url: url,
								headers: {
									'x-auth-token': sessionStorage.Token
								}
						}).success(function(response){
							$scope.loader = false;
							if (response.resultFlag == '1') {
								$scope.data = response.data;
								// 乘客选择状态切换
								$scope.toggle = function (item, list) {
							        var indexid = publicFunction.arrayIndex(list,'commPassengerId',item.commPassengerId);
							        if (indexid > -1) {
							          	list.splice(indexid, 1);
							        }
							        else {
							          	list.push(item);
							        }
							        publicmodel.Passengers = $scope.selected;
						      	};

						      	// 判断是否已经选择该乘客
						      	$scope.exists = function (item, list) {
						      		var indexid = publicFunction.arrayIndex(list,'commPassengerId',item.commPassengerId);
						        	return indexid > -1;
						      	};
						 
							}else{
								console.log(response.resultMsg);
							}
						}).error(function(response){
							$scope.loader = false;
							console.log(response.resultMsg);
						});
						// 请求数据结束
						// $scope.citys = airCitys.citys;
					}
					$mdDialog.show({
							controller: DialogController,
							templateUrl: 'view/choosepassengers.html',
							parent: angular.element(document.body),
							targetEvent: event,
							clickOutsideToClose: true
						})
						.then(function(answer) {
							if (models.length == 1) {
								$scope[models[0]] = answer;
							} else if (models.length == 2) {
								$scope[models[0]][models[1]] = answer;
							} else if (models.length == 3) {
								$scope[models[0]][models[1]][models[2]] = answer;
							}else{
								console.log("层数设置的太深……")
							}
						}, function() {
							$scope.status = 'You cancelled the dialog.';
						});
				}
				//element[0].bind('click', openDialog, false);
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click',openDialog);
			}
		}
	});
	return app;
});