define(['angular', 'js/server/json/trainstationdata' ], function(angular) {
	var app = angular.module('mdTrainStation', ['mdTrainStationData']);
	app.directive('drchoosestationsletter', ['$mdDialog','trainStations', '$parse', function($mdDialog,trainStations, $parse) {
		return {
			restrict: 'EA',
			//templateUrl:'view/choosecitys.html',
			scope: {
				stationlist: '='
			},
			replace: true,
			link: function($scope, element, attrs) {
				//console.log(element);
//				console.log(element);

				function openDialog(event) {
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
						$scope.citys = trainStations.stations;
						console.log($scope.citys);
						$scope.search = null;
						$scope.onSearch = function(search) {

							if(search == '') {
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
							if(answer) {
								//获取值
								$scope.stationlist = answer;
								console.log($scope.stationlist);
							}
						}, function() {
							$scope.status = 'You cancelled the dialog.';
						});
				}
				//element[0].bind('click', openDialog, false);
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click', openDialog);
			}
		}
	}]);
	return app;
});