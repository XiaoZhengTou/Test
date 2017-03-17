define(['angular','libs/swiper.min.js','libs/ngSwiper.js','js/shared/mdg2chart.js'], function(angular) {
	publicFunction.addStyle('swiper.min.css');
	/*个人资料*/
	var app = angular.module('mdpersonalhome', ['ngAnimate','ngSwiper','mdchart']);
	app.controller('personalhomectrl', ['$scope', '$http', 'publicmodel', function($scope, $http, publicmodel) {
		$scope.user = publicmodel.user;
		$scope.msg = {
			text: "公告：慧捷报系统强势上线！",
			createdate: new Date(),
		};

		console.log($scope.user);

		$scope.swiper = {};

		$scope.next = function() {
			$scope.swiper.slideNext();
		};
		
	}]);
	angular._LoadModule('mdpersonalhome');
	console.log('mdpersonalhome');
	return app;
});