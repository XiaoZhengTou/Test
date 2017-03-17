define(['angular', "js/templates/baseSubjects/baseSubjectsList.js", "js/templates/baseSubjects/applies.js"], function(angular) {
	var base= angular.module('base', ['baseSubjectsList','applies']);
	base.controller('baseCtrl', function($scope, $mdSidenav) {

		$scope.cerificateList = [{
			name: '基础科目与COA对应关系'
		}, {
			name: '适用入账单位'
		}];
		$scope.state = {
			one: true,
			two: false,
		}

		/*列表对应数据-start*/
		$scope.border = [];
		$scope.border[0] = 'select';
		$scope.isCurrent = function(index) {
				$scope.border = [];
				$scope.border[index] = 'select';
				switch (index) {
					case 0:
						$scope.state.one = true
						$scope.state.two=false					
						break
					case 1:
						$scope.state.one = false
						$scope.state.two= true
						break					
				}

			}
			/*列表对应数据-end*/

	})

	angular._LoadModule('base');
	return base;
});