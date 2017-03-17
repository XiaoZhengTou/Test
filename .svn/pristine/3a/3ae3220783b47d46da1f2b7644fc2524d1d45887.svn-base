define(['angular'], function(angular) {
	
	var bangding = angular.module('bangding', []);
	bangding.controller('bangdingCtrl', function($scope,$rootScope) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/bangding', '首页');
		$scope.bottom = 'show';
		$scope.jiebang = function(){
			 if($scope.bottom == 'hide'){
				$scope.bottom = 'show';
			}
		};
		$scope.shouqi = function(){
			if($scope.bottom == 'show') {
				$scope.bottom ='hide';
			}
		};
	
	});
});