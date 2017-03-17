define(['angular'], function(angular) {
	var app = angular.module('mdpayeeacccountbank', []);
	app.directive('drbanks', ['$mdDialog', function($mdDialog) {
		return {
			restrict: 'EA',
			//templateUrl:'view/choosecitys.html',
			replace: true,
			link: function($scope, element, attrs) {

				function openDialog() {
					var modeldata = $scope.$eval(attrs.drbanks);
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
						//$scope.citys = airCitys.citys;
						//$scope.search=null;
						$scope.onSearch=function(search){
							
							if(search==''){
								$scope.search=null;
							}
							console.log(search);
						};
					}
					$mdDialog.show({
							controller: DialogController,
							templateUrl: 'templates/personalCenter/account/banks.html',
							parent: angular.element(document.body),
							targetEvent: event,
							clickOutsideToClose: true
						})
						.then(function(answer) {
						}, function() {
							$scope.status = 'You cancelled the dialog.';
						});
				};
				angular.element(element[0]).unbind('click');
				angular.element(element[0]).bind('click',openDialog);
			}
		}
	}]);
	angular._LoadModule('mdpayeeacccountbank');
	return app;
});