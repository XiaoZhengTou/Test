define(['angular', 'js/server/json/airCitys','js/server/json/hotelCitys',], function(angular) {
	var app = angular.module('muchoosecitys', ['mdAirCitys','mdHotelCitys']);
	app.directive('drchoosecitys', ['$mdDialog', 'airCitys','hotelCitys', function($mdDialog, airCitys,hotelCitys) {
		return {
			restrict: 'EA',
			//templateUrl:'view/choosecitys.html',
			replace: true,
			link: function($scope, element, attrs) {
				//console.log(element);
				console.log(element);

				function openDialog(event) {
					var jsonstr = attrs.drchoosecitys;
					jsonstr = jsonstr.replace(/'/g, '\"');
					var modeldata = angular.fromJson(jsonstr);
					var models = modeldata.model.split('.');

					function DialogController($scope, $mdDialog) {
						$scope.hide = function() {
							$mdDialog.hide();
						};
						$scope.cancel = function() {
							$mdDialog.cancel();
						};
						$scope.answer = function(answer) {
							//根据传过来的ng-model进行赋值
							$mdDialog.hide(answer);
						};
						if(modeldata.data=='hotel'){
							$scope.citys = hotelCitys.citys;
						}else{
							$scope.citys = airCitys.citys;
						}
						$scope.search = null;
						$scope.onSearch = function(search) {

							if (search == '') {
								$scope.search = null;
							}
							console.log(search);
						};
					}
					$mdDialog.show({
							controller: DialogController,
							templateUrl: 'templates/shared/choosecitys.html',
							parent: angular.element(document.body),
							targetEvent: event,
							clickOutsideToClose: true
						})
						.then(function(answer) {
							var model = $scope[models[0]];
							console.log(model);
							if (models.length > 1) {

								for (var i = 1; i < models.length; i++) {
									model = model[models[i]];
								}
								for (var j = 0; j < model.length; j++) {
									if (model[j].id == answer.id) {
										return;
									}
								}
								console.log(modeldata.alldata);
								if (angular.isArray(model)) {
									model.push(modeldata.alldata ? answer : answer.text);
								} else {
									model = (modeldata.alldata ? answer : answer.text);
								}

							} else if (models.length == 1) {
								if (angular.isArray($scope[models[0]])) {
									$scope[models[0]].push(modeldata.alldata ? answer : answer.text);
								} else {
									$scope[models[0]] = (modeldata.alldata ? answer : answer.text);
								}
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
	}]);
	return app;
});