define(['angular'], function(angular) {

	var phoneYzm = angular.module('phoneYzm', []);
	phoneYzm.controller('phoneYzmCtrl', function($scope, airfarePublic, publicmodel, $http, $interval) {
		//获取个人资料
		$scope.userId = publicmodel.userId;
		console.log($scope.userId);
		var $personalInfoUrl = LoginUrl + 'docker/userinfo/getUserById/' + $scope.userId;
		console.log($personalInfoUrl);
		$http.get($personalInfoUrl).success(function(response) {
			if(response && response.code == '0000') {
				$scope.personalInfo = response.data;
				$scope.mobile = response.data.user_mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
				console.log($scope.mobile);
			} else {
				$scope.showAlert("", "提示", response.msg, "确定", "");
			}
		}).error(function() {
			console.log("shibai");
		});
		//发送短信验证码
		$scope.paracont = "获取验证码";
		$scope.paraevent = false;
		$scope.sendphonecode = function() {
			var second = 60,
			timePromise = undefined;
			timePromise = $interval(function() {
				if(second <= 0) {
					$interval.cancel(timePromise);
					timePromise = undefined;
					second = 60;
					$scope.paracont = "重发验证码";
					$scope.paraevent = false;
				} else {
					$scope.paracont = second + "秒后可重发";
					$scope.paraevent = true;
					second--;
				}
			}, 1000, 100);
		}

		//上一步
		$scope.phoneYzmBack = function() {
			$scope.go('/telAirfare/addAirfare');
		}

	});
});